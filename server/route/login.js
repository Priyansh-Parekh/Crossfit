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
const leagues = require("../models/league");
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



// viewers page
route.get('/login_viewers',login, async (req, res) => {
    let user = req.user
    res.render("login_viewers",{user});
})

route.post('/login_viewers', async (req, res) => {
    try {
        const check = await viewers.findOne({ email : req.body.email });
        if(!check){
            res.send("User not found");
        }

        const isMatch = await bcrypt.compare(req.body.password, check.password);
        if(isMatch) {
            // If the password matches, create a JWT token
            const token = jwt.sign({ email: check.email }, "secret-word");
            res.cookie("token", token);
            res.redirect("/");
        } else {
            res.status(401).send("Incorrect password");
        }
    }catch(error) {
        console.error(error);
        res.status(500).send("Error logging in user");
    }

})


// Clubs page
route.get('/login_clubs',login, async (req, res) => {
    let user = req.user;
    res.render("login_clubs",{user});
})

route.post('/login_clubs', async (req, res) => {
    try {
        const check = await clubs.findOne({ email : req.body.email });
        if(!check){
            res.send("User not found");
        }

        const isMatch = await bcrypt.compare(req.body.password, check.password);
        if(isMatch) {
            // If the password matches, create a JWT token
            const token = jwt.sign({ email: check.email }, "secret-word");
            res.cookie("token", token);
            res.redirect("/");
        } else {
            res.status(401).send("Incorrect password");
        }
    }catch(error) {
        console.error(error);
        res.status(500).send("Error logging in user");
    }

})

// leagues page
route.get('/login_leagues',login, async (req, res) => {
    let user = req.user;
    res.render("login_leagues",{user});
})

route.post('/login_leagues', async (req, res) => {
    try {
        const check = await leagues.findOne({ name : req.body.name });
        if(!check){
            res.send("User not found");
        }

        const isMatch = await bcrypt.compare(req.body.password, check.password);
        if(isMatch) {
            // If the password matches, create a JWT token
            const token = jwt.sign({ name: check.name }, "secret-word");
            res.cookie("token", token);
            res.redirect("/");
        } else {
            res.status(401).send("Incorrect password");
        }
    }catch(error) {
        console.error(error);
        res.status(500).send("Error logging in user");
    }

})





module.exports = route;