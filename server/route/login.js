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


// viewers page
route.get('/login_viewers', async (req, res) => {
    res.render("login_viewers");
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
route.get('/login_clubs', async (req, res) => {
    res.render("login_clubs");
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
route.get('/login_leagues', async (req, res) => {
    res.render("login_leagues");
})

route.post('/login_leagues', async (req, res) => {
    try {
        const check = await leagues.findOne({ email : req.body.email });
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





module.exports = route;