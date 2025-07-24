const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

// --- Models ---
const Merchandise = require("../models/merchandise");
const Viewer = require("../models/viewer");
const Club = require("../models/club");
const League = require("../models/league");

// --- Your Login Middleware ---
// This middleware checks for a logged-in user from any of your user types
const loginMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || token === "none") {
            req.user = null;
            return next();
        }
        const decoded = jwt.verify(token, "secret-word"); // Replace "secret-word" with your actual secret
        let user = await Viewer.findOne({ email: decoded.email }) ||
                   await Club.findOne({ email: decoded.email }) ||
                   await League.findOne({ email: decoded.email });
        req.user = user;
    } catch (err) {
        req.user = null;
    }
    next();
};

// --- Route to Display All Merchandise ---
route.get('/', loginMiddleware, async (req, res) => {
    try {
        const allMerchandise = await Merchandise.find({ status: 'available' }).sort({ createdAt: -1 });
        res.render('merchandise', {
            merchandise: allMerchandise,
            user: req.user
        });
    } catch (error) {
        console.error("Error fetching merchandise:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = route;