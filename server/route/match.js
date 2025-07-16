const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // store files in /uploads temporarily

//fetching models
const matches = require("../models/match");
const players = require("../models/player");
const merchandise = require("../models/merchandise");
const leagues = require("../models/league");
const clubs = require("../models/club");
const viewers = require("../models/viewer");
// const { match } = require('assert');

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
                { path: 'playerStats.playerId' },
                { path: 'playerStats.clubId' },
            ]
        }
    ]);
    await club.populate('players');
    await club.populate('captain');
    await club.populate({ path: 'vice_captain', strictPopulate: false });
    await club.populate('wicket_keeper');
    await club.populate('bowlers');
    await club.populate('batsman');
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
        { path: 'bowler' },
        { path: 'man_of_match' },
        {
            path: 'playerStats.playerId',
        }
    ]);
};








route.get('/match_setup/:_id',login,async (req,res)=>{

    try {
        let user = req.user;
        let match_id = req.params._id;
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch)
        res.render('match_setup',{user,thismatch})

    } catch (error) {
        console.log(error);
        res.send("Not Found the page")
    }

})

route.post('/submit_setup/:_id',login,async(req,res)=>{
    try {
        let user = req.user;
        let match_id = req.params._id;
        let thismatch = await matches.findById(match_id);
             await match_populate(thismatch)
        let {captain,vice_captain,wicket_keeper,other_players,extra_players,toss_winner,toss_choice} = req.body;
        if(thismatch.club1.name === user.name){
            thismatch.club1_leaders = {
                captain,vice_captain,wicket_keeper
            }
        }else{
            thismatch.club2_leaders = {
                captain,vice_captain,wicket_keeper
            }
        }
        other_players.forEach(player_id => {
            thismatch.playerStats.push({
                playerId : player_id
            });
        });
          extra_players.forEach(player_id => {
            thismatch.playerStats.push({
                playerId : player_id
            });
        });
        thismatch.toss_winner = toss_winner;
        thismatch.toss_choice = toss_choice;
        thismatch.playerStats.push({
            playerId : captain
        })
         thismatch.playerStats.push({
            playerId : vice_captain
        })
         thismatch.playerStats.push({
            playerId : wicket_keeper
        })
        if(toss_choice==='Bat'){
            thismatch.current_batting = toss_winner
        }else{
            if(toss_winner === thismatch.club1._id){
                thismatch.current_batting = thismatch.club2._id;
            }else{
                  thismatch.current_batting = thismatch.club1._id;
            }
        }
        await thismatch.save();

        res.redirect('/dashboard/clubs')
        
    } catch (error) {
        
    }
})



module.exports = route;