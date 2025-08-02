const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Viewer = require('../models/viewer.js'); // Adjust path if needed

// --- Authentication Middleware ---
const login = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ error: 'Not authenticated' });
        
        const decoded = jwt.verify(token, "secret-word"); // Use your actual secret
        const user = await Viewer.findOne({ email: decoded.email });

        if (!user) return res.status(404).json({ error: 'User not found' });
        
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};




// --- Initialize Razorpay Instance ---
// IMPORTANT: It's best practice to store these keys in a .env file.
const razorpayInstance = new Razorpay({
    key_id: 'rzp_live_eUiQlEQgnR9Jaz',
    key_secret: 'PZRIrgQj4vWsxlmMVVtdSZYr' 
});

// --- Route to CREATE a payment order ---
router.post('/create_order', login, async (req, res) => {
    try {
        const { amount } = req.body;
        const amountInPaise = Number(amount) * 100;

        if (!amount || amountInPaise <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `receipt_order_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);
        res.json(order);

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).send("Error creating order");
    }
});

// --- Route to VERIFY the payment ---
router.post('/verify_payment', login, async (req, res) => {
    try {
        const { order_id, payment_id, signature, amount } = req.body;

        const generated_signature = crypto
            .createHmac('sha256', razorpayInstance.key_secret)
            .update(order_id + "|" + payment_id)
            .digest('hex');

        if (generated_signature === signature) {
            // Payment is successful. Add balance to user.
            await Viewer.updateOne(
                { _id: req.user._id },
                { $inc: { balance: Number(amount) } }
            );
            res.redirect('/dashboard/viewer?payment=success');
        } else {
            res.redirect('/dashboard/viewer?payment=failed');
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).send("Payment verification failed.");
    }
});

module.exports = router;
