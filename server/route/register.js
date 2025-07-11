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
route.get('/register_viewers',login, async (req, res) => {
    let user = req.user;
    res.render("register_viewers",{user});
})

route.post('/register_viewers', async (req, res) => {
    try {

        let { name, email, password, favourite_team } = req.body;
        favourite_team = new mongoose.Types.ObjectId(favourite_team)
        ///checking that user of this email already exist or not.
        let inclub = await clubs.findOne({ email }); 
        let inviewer = await viewers.findOne({ email });
        let inleague = await leagues.findOne({ email });

          let check = inclub || inviewer || inleague;
        if (check) {
            res.redirect("/error");
        } else {
            //providing more sequrity to its password/
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            let user = await viewers.create({ name, email, password: hash, favourite_team })

            //providing cookies to keep him logged in//
            let token = jwt.sign({ email }, "secret-word");
            res.cookie("token", token);
            res.redirect("/");
        }
    } catch (error) {
         console.error(error);
        res.status(500).send("Error creating user");
    }

})


// Clubs page
route.get('/register_clubs',login, async (req, res) => {
    let user = req.user;
    res.render("register_clubs",{user});
})

route.post('/register_clubs', async (req, res) => {
    try {

        let { name, sport, email, password, bio, founded_year, founder_name, slogan } = req.body;
        //checking that user of this email already exist or not.
        let inclub = await clubs.findOne({ email });
        let inviewer = await viewers.findOne({ email });
        let inleague = await leagues.findOne({ email });

         let check = inclub || inviewer || inleague
        if (check) {
            res.redirect("/error");
        } else {
            //providing more sequrity to its password/
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            let user = await clubs.create({ name, sport, email, password:hash, bio, founded_year, founder_name, slogan })

            //providing cookies to keep him logged in//
            let token = jwt.sign({ email }, "secret-word");
            res.cookie("token", token);
            res.redirect("/");
        }
    } catch (error) {
         console.error(error);
        res.status(500).send("Error creating user");
    }

})


// leagues page
route.get('/register_leagues',login, async (req, res) => {
    let user = req.user;
    res.render("register_leagues",{user});
})

route.post('/register_leagues', async (req, res) => {
    try {

        let { name, sport, email, password, bio, organizer_name,founded_year } = req.body;
        //checking that user of this email already exist or not.
        let inclub = await clubs.findOne({ email });
        let inviewer = await viewers.findOne({ email });
        let inleague = await leagues.findOne({ email });

        let check = inclub || inviewer || inleague
        if (check) {
            res.redirect("/error");
        } else {
            //providing more sequrity to its password/
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            let user = await leagues.create({ name, sport, email, password:hash, bio, organizer_name,founded_year })

            //providing cookies to keep him logged in//
            let token = jwt.sign({ email }, "secret-word");
            res.cookie("token", token);
            res.redirect("/");
        }
    } catch (error) {
         console.error(error);
        res.status(500).send("Error creating user");
    }

})


module.exports = route;