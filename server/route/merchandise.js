const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

// --- Models ---
const Merchandise = require("../models/merchandise");
const Viewer = require("../models/viewer");
const Club = require("../models/club");

// --- Login Middleware ---
const loginMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || token === "none") {
            req.user = "none";
            return next();
        }
        const decoded = jwt.verify(token, "secret-word");
        let user = await Viewer.findOne({ email: decoded.email }) ||
                   await Club.findOne({ email: decoded.email });
        req.user = user || "none";
    } catch (err) {
        req.user = "none";
    }
    next();
};

// --- Route to Display All Merchandise ---
route.get('/', loginMiddleware, async (req, res) => {
    try {
        // ADDED .populate('clubId') TO FETCH THE CLUB'S NAME
        const allMerchandise = await Merchandise.find({ status: 'available' })
            .populate('clubId') // This line fetches the club details
            .sort({ createdAt: -1 });

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
