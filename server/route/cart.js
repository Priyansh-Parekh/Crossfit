const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// --- Models ---
const Cart = require('../models/Cart.js');
const Merchandise = require('../models/merchandise.js');
const Viewer = require("../models/viewer.js");

// --- Advanced Auth Middleware (Handles both page loads and API calls) ---
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

// --- Route to Add Item to Cart ---
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

// --- Route to View Cart Page ---
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

// --- Add this route to the end of your server/route/cart.js file ---

router.post('/checkout', isAuthenticatedViewer, async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty." });
        }

        // Calculate total cost from the backend to ensure price accuracy
        const totalCost = cart.items.reduce((sum, item) => {
            return item.productId ? sum + (item.quantity * item.productId.price) : sum;
        }, 0);

        // Check if user has enough balance
        if (req.user.balance < totalCost) {
            return res.status(400).json({ message: "Insufficient funds." });
        }

        // --- Process the transaction ---
        // 1. Deduct stock quantity for each item
        for (const item of cart.items) {
            await Merchandise.updateOne(
                { _id: item.productId._id },
                { $inc: { stock_quantity: -item.quantity } }
            );
        }

        // 2. Deduct the total cost from the user's balance
        await Viewer.updateOne(
            { _id: userId },
            { $inc: { balance: -totalCost } }
        );

        // 3. Clear the user's cart
        await Cart.deleteOne({ userId }); 

        res.status(200).json({ message: "Purchase successful! Your items are on their way." });

    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ message: "An error occurred during checkout." });
    }
});


module.exports = router;
