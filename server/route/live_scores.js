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
const clubs = require("../models/club");
const viewers = require("../models/viewer");


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

//club thinngs populate
const populate_cricket_club_data = async (club) => {
    await club.populate('match_won');
    await club.populate('match_lose');
    await club.populate('match_played.matchId');
    await club.populate([
        {
            path: 'match_played.matchId',
            populate: [
                { path: 'club1' },
                { path: 'club2' },
                { path: 'stricker' },
                { path: 'nonstricker' },
                { path: 'bowler' },
                { path: 'winner' },
                { path: 'man_of_match' },
                { path: 'toss_winner' },
                { path: 'current_batting' },
                { path: 'playerStats.playerId' }
            ]
        }
    ]);
    await club.populate('players');
    await club.populate('captain');
    await club.populate({ path: 'vice_captain', strictPopulate: false });
    await club.populate('wicket_keeper');
};


const match_populate = async (match) => {
    return await matches.populate(match, [
        { path: 'club1' },
        { path: 'club2' },
        { path: 'winner' },
        { path: 'toss_winner' },
        { path: 'current_batting' },
        { path: 'stricker' },
        { path: 'nonstricker' },
        { path: 'firstInnings' },
        { path: 'secondInnings' },
        { path: 'bowler' },
        { path: 'man_of_match' },
        {
            path: 'playerStats.playerId',
            populate: { path: 'registered_club' }  // <-- Add this populate
        }
    ]);
};




//live score  Page
route.get('/', login, datas, async (req, res) => {
  
    try {
        let user = req.user;
        AllMatch = req.data.matches;
        // Populate all matches in parallel
        await Promise.all(AllMatch.map(match => match_populate(match)));
        res.render("live_scores", { user, matches });
    } catch (error) {
        res.redirect('/error');
    }
})


route.get('/scorecard/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        // await populate_cricket_club_data(user);
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch);
        res.render('specific_scorecard', { user,thismatch })
    } catch (error) {
        console.log(error)
        res.redirect('/error');
    }
})






module.exports = route;