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
// login middelware
const login = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || token === "none") {
            req.user = "none";
            return next();
        }

        const decoded = jwt.verify(token, "secret-word");

        // Try to find the user in each collection
        let user = await viewers.findOne({ email: decoded.email });
        if (user) {
            req.user = user;
            return next();
        }

        user = await clubs.findOne({ email: decoded.email });
        if (user) {
            req.user = user;
            return next();
        }

        user = await leagues.findOne({ email: decoded.email });
        if (user) {
            req.user = user;
            return next();
        }

        // If not found in any collection
        req.user = "none";
    } catch (err) {
        console.error("Authentication error:", err);
        req.user = "none";
    }
    next();
};

// --- Route to Display All Merchandise ---
route.get('/', login, async (req, res) => {
    try {
        const allMerchandise = await Merchandise.find({ status: 'available' }).sort({ createdAt: -1 });
        res.render('merchandise', {
            merchandise: allMerchandise,
            user: req.user
        });
    } catch (error) {
        res.redirect('/error');
    }
});

module.exports = route;