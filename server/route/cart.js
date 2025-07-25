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
        res.status(500).json({ message: 'Server error while adding to cart.' });
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
        res.status(500).send('Server Error');
    }
});

module.exports = router;
