const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//fetching data
const matches = require("../models/match");
const players = require("../models/player");
const merchandise = require("../models/merchandise");
const clubs = require("../models/club");
const viewers = require("../models/viewer");

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

        
        // If not found in any collection
        req.user = "none";
    } catch (err) {
        console.error("Authentication error:", err);
        req.user = "none";
    }
    next();
};

//viewers logout
route.post('/viewer', login, async (req, res) => {
    try {
        res.clearCookie("token");
        let user = "none"
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
})

//clubs logout
route.post('/clubs', login, async (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
})



module.exports = route;