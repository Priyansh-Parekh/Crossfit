const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');

//fetching models
const matches = require("../models/match");
const players = require("../models/player");
const merchandise = require("../models/merchandise");
const clubs = require("../models/club");
const viewers = require("../models/viewer");


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
        const allMerchandise = await merchandise.find({ 
            status: 'available',
            clubId: { $exists: true, $ne: null } // Only get merchandise with valid clubId
        })
            .populate('clubId', 'name') // Populate clubId with club name
            .sort({ createdAt: -1 });
        
        res.render('merchandise', {
            merchandise: allMerchandise,
            user: req.user
        });
    } catch (error) {
        console.error('Merchandise route error:', error);
        res.redirect('/error');
    }
});

module.exports = route;