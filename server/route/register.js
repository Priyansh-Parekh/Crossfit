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


// data middelware
const datas = async (req, res, next) => {
    try {

        // fetching data
        const [clubData, matchData, playerData, merchData, viewerData] = await Promise.all([
            clubs.find({}),
            matches.find({}),
            players.find({}),
            merchandise.find({}),
            viewers.find({})
        ]);

        req.data = {
            clubs: clubData,
            matches: matchData,
            players: playerData,
            merchandise: merchData,
            viewers: viewerData
        };

        next();


    } catch (error) {
        console.log(error)
    }
}


// viewers page
route.get('/register_viewers', login,datas, async (req, res) => {
    let user = req.user;
    let data = req.data
    res.render("register_viewers", { user,clubs: data.clubs });
})

route.post('/register_viewers', async (req, res) => {
    try {

        let { name, email, password, favourite_team } = req.body;
        favourite_team = new mongoose.Types.ObjectId(favourite_team);
        ///checking that user of this email already exist or not.
        let inclub = await clubs.findOne({ email });
        let inviewer = await viewers.findOne({ email });

        let check = inclub || inviewer;
        if (check) {
            res.redirect("/error");
        } else {
            //providing more sequrity to its password/
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            let user = await viewers.create({ name, email, password: hash,  favorite_teams: [favourite_team] })

            res.redirect("/login/login_viewers");
        }
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }

})


// Clubs page
route.get('/register_clubs', login, async (req, res) => {
    let user = req.user;
    res.render("register_clubs", { user });
})

route.post('/register_clubs', async (req, res) => {
    try {

        let { name, sport, email, password, bio, founded_year, founder_name, slogan } = req.body;
        //checking that user of this email already exist or not.
        let inclub = await clubs.findOne({ email });
        let inviewer = await viewers.findOne({ email });

        let check = inclub || inviewer
        if (check) {
            res.redirect("/error");
        } else {
            //providing more sequrity to its password/
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            let user = await clubs.create({ name, sport, email, password: hash, bio, founded_year, founder_name, slogan })

            res.redirect("/login/login_clubs");
        }
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }

})






module.exports = route;