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


//club thinngs populate
const populate_viewer = async (viewer) => {
    await viewer.populate('favorite_teams');

};




//Dashboard club Page
route.get('/clubs', login, async (req, res) => {
    let user = req.user;
    res.render("club_dashboard", { user });
});

//Dashboard Leagues Page
route.get('/league', login, async (req, res) => {
    let user = req.user;
    res.render("league_dashboard", { user });
});

//Dashboard viewers Page
route.get('/viewer', login, datas, async (req, res) => {
    let user = req.user;
    await populate_viewer(user);
    let data = req.data
    let refinedclubs = data.clubs.filter(club =>
        !user.favorite_teams.some(fav => fav._id.toString() === club._id.toString())
    );


    res.render("viewer_dashboard", { user, clubs: data.clubs, refinedclubs });
});

route.post('/add_fav_club', login, async (req, res) => {
    try {
        let user = req.user;
        let favorite_team_id = req.body.favorite_teams;  // make sure form uses name="favorite_teams"

        if (favorite_team_id) {
            const favTeamObjId = new mongoose.Types.ObjectId(favorite_team_id);
            user.favorite_teams.push(favTeamObjId);
            await user.save();

        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding favorite team");
    }
});

route.post('/remove_fav_club', login, async (req, res) => {
    try {
        let user = req.user;
        let favorite_team_id = req.body.favorite_teams;  // make sure form uses name="favorite_teams"

        if (favorite_team_id) {
            const favTeamObjId = new mongoose.Types.ObjectId(favorite_team_id);
            user.favorite_teams.pull(favTeamObjId);
            await user.save();

        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding favorite team");
    }
});

route.post('/status', login, async (req, res) => {
    try {
        let user = req.user;
        let status = req.body.status;

        if (status==='active') {
           user.status = 'inactive';
           await user.save();

        }else{
            user.status = 'active';
            await user.save();
        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding favorite team");
    }
});




module.exports = route;