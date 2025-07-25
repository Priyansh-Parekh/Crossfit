const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// --- Models ---
const Cart = require('../models/Cart.js'); // Ensure this path is correct
const Merchandise = require('../models/merchandise.js'); // Ensure this path is correct
const Viewer = require("../models/viewer.js"); // We only need the Viewer model for shopping

// --- Auth Middleware (Ensures a VIEWER is logged in) ---
// This middleware is now consistent with your other login logic and is more secure.
const isAuthenticatedViewer = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            // This error will be shown in an alert to the user.
            return res.status(401).json({ message: 'Please log in as a viewer to shop.' });
        }
        
        // Use the same secret word as your login system
        const decoded = jwt.verify(token, "secret-word"); 

        // Find the user ONLY in the Viewer collection, as only viewers can have carts.
        // This uses `decoded.email` to be consistent with your main login middleware.
        const user = await Viewer.findOne({ email: decoded.email });

        if (!user) {
            // This prevents club admins or leagues from trying to add items to a cart.
            return res.status(403).json({ message: 'Only viewers can add items to the cart.' });
        }
        
        req.user = user; // Attach the viewer's data to the request
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid session. Please log in again.' });
    }
};

// --- Route to Add Item to Cart ---
// This now uses the new, specific middleware to ensure the user is a viewer.
router.post('/add/:productId', isAuthenticatedViewer, async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    try {
        const product = await Merchandise.findById(productId);

        if (!product || product.stock_quantity < 1) {
            return res.status(404).json({ message: 'Product not available.' });
        }

        // Find the viewer's cart or create a new one
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists, check if the product is already in it
            const itemIndex = cart.items.findIndex(p => p.productId.equals(productId));
            if (itemIndex > -1) {
                // Product exists, just increment quantity
                cart.items[itemIndex].quantity += 1;
            } else {
                // Product not in cart, add it
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();
        } else {
            // If no cart exists for the user, create a new one
            await Cart.create({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        }
        res.status(200).json({ message: 'Product added to cart!' });
    } catch (err) {
        console.error("Error adding to cart:", err); // This logs the specific error on your server
        res.status(500).json({ message: 'Server error while adding to cart.' });
    }
});

// --- Route to View Cart Page ---
// Also protect this route with the same middleware.
router.get('/', isAuthenticatedViewer, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate({
            path: 'items.productId',
            model: 'Merchandise_DATA' // Make sure this matches your merchandise model name
        });

        if (!cart) {
            return res.render('cart', { cart: null, total: 0, user: req.user });
        }

        const total = cart.items.reduce((sum, item) => {
            if (item.productId) { // Check if product exists before adding to total
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