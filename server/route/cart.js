const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// --- Models ---
const Cart = require('../models/Cart.js');
const Merchandise = require('../models/merchandise.js');
const Viewer = require("../models/viewer.js");
const Club = require("../models/club.js");
const Order = require("../models/Order.js");

// --- Auth Middleware ---
const isAuthenticatedViewer = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login');
        }
        
        const decoded = jwt.verify(token, "secret-word"); 
        const user = await Viewer.findOne({ email: decoded.email });

        if (!user) {
            if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                return res.status(403).json({ message: 'Only viewers can perform this action.' });
            }
            return res.redirect('/');
        }
        
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

// --- Route to View Cart Page ---
router.get('/', isAuthenticatedViewer, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id })
            .populate('items.productId'); // This populates all product details

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
    } catch (err) { // <-- ADDED THE MISSING '{' HERE
        console.error("Error viewing cart:", err);
        res.redirect('/error');
    }
});

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

// --- Route to DECREASE Item Quantity ---
router.post('/decrease/:productId', isAuthenticatedViewer, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        const item = cart.items.find(p => p.productId.equals(productId));

        if (!item) return res.status(404).json({ message: "Item not found in cart." });

        if (item.quantity > 1) {
            await Cart.updateOne(
                { userId, "items.productId": productId },
                { $inc: { "items.$.quantity": -1 } }
            );
        } else {
            await Cart.updateOne(
                { userId },
                { $pull: { items: { productId: productId } } }
            );
        }
        res.status(200).json({ message: "Cart updated." });
    } catch (err) {
        console.error("Error decreasing quantity:", err);
        res.status(500).json({ message: "Server error." });
    }
});

// --- Route to REMOVE Item Entirely ---
router.post('/remove/:productId', isAuthenticatedViewer, async (req, res) => {
    const { productId } = req.params;
    await Cart.updateOne(
        { userId: req.user._id },
        { $pull: { items: { productId: productId } } }
    );
    res.status(200).json({ message: "Item removed." });
});


// --- Checkout Route ---
router.post('/checkout', isAuthenticatedViewer, async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'price stock_quantity clubId'
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty." });
        }

        const totalCost = cart.items.reduce((sum, item) => item.productId ? sum + (item.quantity * item.productId.price) : sum, 0);

        if (req.user.balance < totalCost) {
            return res.status(400).json({ message: "Insufficient funds." });
        }

        const orderItems = [];
        for (const item of cart.items) {
            const product = item.productId;
            if (!product) continue;

            await Merchandise.updateOne(
                { _id: product._id },
                { $inc: { stock_quantity: -item.quantity } }
            );

            await Club.updateOne(
                { _id: product.clubId },
                { 
                    $inc: { 
                        totalRevenue: item.quantity * product.price,
                        merchandiseSold: item.quantity
                    } 
                }
            );
            
            orderItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price,
                clubId: product.clubId
            });
        }

        await Order.create({
            viewerId: userId,
            items: orderItems,
            totalAmount: totalCost
        });

        await Viewer.updateOne(
            { _id: userId },
            { $inc: { balance: -totalCost } }
        );

        await Cart.deleteOne({ userId }); 

        res.status(200).json({ message: "Purchase successful! Your items are on their way." });

    } catch (error) {
        console.error("Checkout Error:", error);
        res.status(500).json({ message: "An error occurred during checkout." });
    }
});

module.exports = router;
