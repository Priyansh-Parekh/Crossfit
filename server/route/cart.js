const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// --- Models ---
const Cart = require('../models/Cart.js');
const Merchandise = require('../models/merchandise.js');
const Viewer = require("../models/viewer.js");
const Club = require("../models/club.js"); // <-- Import the Club model
const Order = require("../models/Order.js"); // <-- Import the new Order model

// --- Auth Middleware ---
const isAuthenticatedViewer = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            // If there's no token, the user is not logged in.
            // Redirect them to the login page.
            return res.redirect('/login');
        }
        
        const decoded = jwt.verify(token, "secret-word"); 
        const user = await Viewer.findOne({ email: decoded.email });

        if (!user) {
            // If the logged-in user is a club or league, they can't have a cart.
            // For API calls (like 'Add to Cart'), send a JSON error.
            if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                return res.status(403).json({ message: 'Only viewers can perform this action.' });
            }
            // For page loads (like clicking the cart icon), redirect them to the homepage.
            return res.redirect('/');
        }
        
        req.user = user;
        next();
    } catch (err) {
        // If the token is invalid for any reason, clear it and send to login.
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

// --- GET Route to View Cart Page ---
router.get('/', isAuthenticatedViewer, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate({
            path: 'items.productId',
            model: 'Merchandise_DATA'
        });

        if (!cart) {
            return res.render('cart', { cart: null, total: 0, user: req.user });
        }

        const total = cart.items.reduce((sum, item) => {
            if (item.productId) {
                return sum + (item.quantity * item.productId.price);
            }
            return sum;
        }, 0);

        res.render('cart', { cart, total: total.toFixed(2), user: req.user });
    } catch (err) {
        console.error("Error viewing cart:", err);
        res.redirect('/error');
    }
});

// --- POST Route to Add Item to Cart ---
router.post('/add/:productId', isAuthenticatedViewer, async (req, res) => {
   const { productId } = req.params;
    const userId = req.user._id;

    try {
        const product = await Merchandise.findById(productId);
        if (!product || product.stock_quantity < 1) {
            return res.status(404).json({ message: 'Product not available.' });
        }

        let cart = await Cart.findOne({ userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.productId.equals(productId));
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();
        } else {
            await Cart.create({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        }
        res.status(200).json({ message: 'Product added to cart!' });
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.redirect('/error');
    }
});

// --- UPDATED Checkout Route ---
router.post('/checkout', isAuthenticatedViewer, async (req, res) => {
    try {
        const userId = req.user._id;
        // Populate product details, including the clubId for each product
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            model: 'Merchandise_DATA',
            select: 'price stock_quantity clubId' // Select only the fields we need
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty." });
        }

        const totalCost = cart.items.reduce((sum, item) => item.productId ? sum + (item.quantity * item.productId.price) : sum, 0);

        if (req.user.balance < totalCost) {
            return res.status(400).json({ message: "Insufficient funds." });
        }

        // --- NEW: Process Transaction and Update Club Stats ---
        const orderItems = [];
        let totalItemsSold = 0;

        for (const item of cart.items) {
            const product = item.productId;
            if (!product) continue; // Skip if a product was deleted

            // 1. Update stock for the merchandise
            await Merchandise.updateOne(
                { _id: product._id },
                { $inc: { stock_quantity: -item.quantity } }
            );

            // 2. Update the club's revenue and items sold
            await Club.updateOne(
                { _id: product.clubId },
                { 
                    $inc: { 
                        totalRevenue: item.quantity * product.price,
                        merchandiseSold: item.quantity
                    } 
                }
            );
            
            // Prepare item for the order history
            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
                clubId: product.clubId
            });
            totalItemsSold += item.quantity;
        }

        // 3. Create a permanent order record
        await Order.create({
            viewerId: userId,
            items: orderItems,
            totalAmount: totalCost
        });

        // 4. Deduct the total cost from the viewer's balance
        await Viewer.updateOne(
            { _id: userId },
            { $inc: { balance: -totalCost } }
        );

        // 5. Clear the user's cart
        await Cart.deleteOne({ userId }); 

        res.status(200).json({ message: "Purchase successful! Your items are on their way." });

    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ message: "An error occurred during checkout." });
    }
});

module.exports = router;
