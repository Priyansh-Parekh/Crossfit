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
const populate_cricket_club_data = async (club) => {
    await club.populate('match_won');
    await club.populate('match_lose');
    await club.populate('match_played.matchId');
    await club.populate('players');
    await club.populate('captain');
    await club.populate({ path: 'vice_captain', strictPopulate: false });
    await club.populate('wicket_keeper');
    await club.populate('merchandise');
};


// Clubs list page
route.get('/', login, datas, async (req, res) => {
    let user = req.user;
    let data = req.data;
    res.render("club_enlistpage", { user, clubs: data.clubs });
})

// Clubs list specific page
route.get('/list/:_id', login, datas, async (req, res) => {
    let user = req.user;
    let data = req.data;
    let id = req.params._id;
    id = new mongoose.Types.ObjectId(id);
    let club_data = await clubs.findOne({ _id: id })
    await populate_cricket_club_data(club_data)
    res.render("club_list_specific", { user, club: club_data });
})

route.get('/update_leader',login,async(req,res)=>{
    try {
        let user = req.user;
        await populate_cricket_club_data(user)
        res.render('leader_selection',{user})
    } catch (error) {
        
    }
})

route.post('/update_leader',login,async(req,res)=>{
    try {
        let user = req.user;
        await populate_cricket_club_data(user)
        user.captain = req.body.captain;
        user.vice_captain = req.body.vice_captain;
        user.wicket_keeper = req.body.wicket_keeper;
        await user.save();
        res.redirect('/dashboard/clubs')
    } catch (error) {
        
    }
})





module.exports = route;