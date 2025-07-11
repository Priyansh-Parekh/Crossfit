const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//fetching models
const matches = require("../models/match");
const players = require("../models/player");
const merchandise = require("../models/merchandise");
const leagues = require("../models/league");
const clubs = require("../models/club");
const viewers = require("../models/viewer");


// data middelware
const datas = async (req, res, next) => {
    try {

        // fetching data
        const [clubData, matchData, playerData, merchData, leagueData, viewerData] = await Promise.all([
            clubs.find({}),
            matches.find({}),
            players.find({}),
            merchandise.find({}),
            leagues.find({}),
            viewers.find({})
        ]);

        req.data = {
            clubs: clubData,
            matches: matchData,
            players: playerData,
            merchandise: merchData,
            leagues: leagueData,
            viewers: viewerData
        };

        next();


    } catch (error) {
        console.log(error)
    }
}



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


route.get('/', login, async (req, res) => {
    try {
        let user = req.user
        const allMerchandise = await merchandise.find(); // fetch all merchandise
        res.render('merchandise', { merchandise: allMerchandise, user }); // ✅ pass to EJS
    } catch (error) {
        console.error("Error fetching merchandise:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = route;






module.exports = route;