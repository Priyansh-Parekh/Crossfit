const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart.js'); // Note the capital 'C' to match the filename
const Merchandise = require('../models/merchandise.js');
const jwt = require('jsonwebtoken');

// --- Models for Authentication ---
const Viewer = require("../models/viewer");
const Club = require("../models/club");
const League = require("../models/league");

// --- Auth Middleware (ensure user is logged in) ---
const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Please log in to continue.' });
        }
        const decoded = jwt.verify(token, "secret-word"); // Replace "secret-word"
        let user = await Viewer.findById(decoded.id) ||
                   await Club.findById(decoded.id) ||
                   await League.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token. Please log in again.' });
    }
};

// --- Route to Add Item to Cart ---
router.post('/add/:productId', isAuthenticated, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ userId });
        const product = await Merchandise.findById(productId);

        if (!product || product.stock_quantity < 1) {
            return res.status(404).json({ message: 'Product not available.' });
        }

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
        console.error(err);
        res.status(500).json({ message: 'Server error while adding to cart.' });
    }
});

// --- Route to View Cart Page ---
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate({
            path: 'items.productId',
            model: 'Merchandise_DATA'
        });

        if (!cart) {
            return res.render('cart', { cart: null, total: 0, user: req.user });
        }

        const total = cart.items.reduce((sum, item) => {
            if (item.productId) { // Check if product exists
                return sum + (item.quantity * item.productId.price);
            }
            return sum;
        }, 0);

        res.render('cart', { cart, total: total.toFixed(2), user: req.user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;