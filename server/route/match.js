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
                { path: 'firstInnings' },
                { path: 'secondInnings' },
                { path: 'current_batting' },
                { path: 'playerStats.playerId' }
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
        { path: 'firstInnings' },
        { path: 'secondInnings' },
        { path: 'bowler' },
        { path: 'man_of_match' },
        { path: 'playerStats.playerId' }
    ]);
};


const overs_increase = (overs) => {
    // Extract full overs and balls
    const fullOvers = Math.floor(overs);
    const balls = Math.round((overs - fullOvers) * 10);

    // If 6 balls, increment over
    if (balls === 6) {
        return (fullOvers + 1).toFixed(1);  // e.g., 4.6 → 5.0
    }

    // Otherwise, keep as is
    return (fullOvers + balls / 10).toFixed(1);  // e.g., 4.2 → 4.2
};







route.get('/match_setup/:_id', login, async (req, res) => {

    try {
        let user = req.user;
        await populate_cricket_club_data(user);
        let match_id = req.params._id;
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch)
        res.render('match_setup', { user, thismatch })

    } catch (error) {
        console.log(error);
        res.send("Not Found the page")
    }

})

route.post('/submit_setup/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch)
        let { captain, vice_captain, wicket_keeper, other_players, extra_players, toss_winner, toss_choice } = req.body;
        if (thismatch.club1.name === user.name) {
            thismatch.setup_club1 = true;
            thismatch.club1_leaders = {
                captain, vice_captain, wicket_keeper
            }
        } else {
            thismatch.setup_club2 = true;
            thismatch.club2_leaders = {
                captain, vice_captain, wicket_keeper
            }
        }
        other_players.forEach(player_id => {
            thismatch.playerStats.push({
                playerId: player_id
            });
        });
        extra_players.forEach(player_id => {
            thismatch.playerStats.push({
                playerId: player_id
            });
        });
        thismatch.toss_winner = toss_winner;
        thismatch.toss_choice = toss_choice;
        thismatch.playerStats.push({
            playerId: captain
        })
        thismatch.playerStats.push({
            playerId: vice_captain
        })
        thismatch.playerStats.push({
            playerId: wicket_keeper
        })
        if (toss_choice === 'Bat') {
            thismatch.current_batting = toss_winner
        } else {
            if (toss_winner === thismatch.club1._id) {
                thismatch.current_batting = thismatch.club2._id;
            } else {
                thismatch.current_batting = thismatch.club1._id;
            }
        }
        if (toss_winner === thismatch.club1._id && toss_choice === 'Bat') {
            thismatch.firstInnings = thismatch.club1._id;
            thismatch.secondInnings = thismatch.club2._id;
        } else if (toss_winner === thismatch.club1._id && toss_choice === 'Bowl') {
            thismatch.firstInnings = thismatch.club2._id;
            thismatch.secondInnings = thismatch.club1._id;
        } else if (toss_winner === thismatch.club2._id && toss_choice === 'Bowl') {
            thismatch.firstInnings = thismatch.club1._id;
            thismatch.secondInnings = thismatch.club2._id;
        } else if (toss_winner === thismatch.club2._id && toss_choice === 'Bat') {
            thismatch.firstInnings = thismatch.club2._id;
            thismatch.secondInnings = thismatch.club1._id;
        }
        await thismatch.save();

        res.redirect('/dashboard/clubs')

    } catch (error) {

    }
})


route.get('/update_score/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        await populate_cricket_club_data(user);
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch)

        res.render('update_score', { user, thismatch })
    } catch (error) {

    }
})

route.post('/live-selection/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        await populate_cricket_club_data(user);
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);

        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch)
        let { stricker, nonstricker, bowler } = req.body;
        stricker = new mongoose.Types.ObjectId(stricker);
        nonstricker = new mongoose.Types.ObjectId(nonstricker);
        bowler = new mongoose.Types.ObjectId(bowler);
        thismatch.stricker = stricker;
        thismatch.nonstricker = nonstricker;
        thismatch.bowler = bowler;
        await thismatch.save();
        await match_populate(thismatch)
        res.redirect(`/match/update_score/${thismatch._id}`);
    } catch (error) {
        console.log(error);
        res.send("failed to send");
    }

})


route.post('/live_score/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        await populate_cricket_club_data(user);
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch);

        let { stricker_runs, extra_runs, bowler, wicket, out_player, new_batsman, boundry, change_innings, strike_change } = req.body;
        stricker_runs = Number(stricker_runs);

        if (bowler) {
            bowler = new mongoose.Types.ObjectId(bowler);
        }
        if (wicket === 'yes') {
            out_player = new mongoose.Types.ObjectId(out_player);
            new_batsman = new mongoose.Types.ObjectId(new_batsman);
        }

        // Update striker's total runs and balls in Player collection
        thismatch.stricker.total_runs += stricker_runs;
        thismatch.stricker.total_balls++;
        thismatch.stricker.SR = ((thismatch.stricker.total_runs / thismatch.stricker.total_balls) * 100).toFixed(2);

        // Update striker's match stats
        thismatch.playerStats.forEach(player => {
            if (player.playerId._id.toString() === thismatch.stricker._id.toString()) {
                player.batting.runs += stricker_runs;
                if (extra_runs === 'none') {
                    player.batting.balls++;
                }
                player.batting.strike_rate = ((player.batting.runs / player.batting.balls) * 100).toFixed(2);
            }
        });

        // Update striker's current innings score
        thismatch.stricker_score.runs += stricker_runs;
        if (extra_runs === 'none') {
            thismatch.stricker_score.balls++;
        }

        // Handle boundaries
        if (boundry && boundry !== 'no') {
            thismatch.playerStats.forEach(player => {
                if (player.playerId._id.toString() === thismatch.stricker._id.toString()) {
                    if (boundry === 'four') {
                        player.batting.fours++;
                    } else if (boundry === 'six') {
                        player.batting.sixes++;
                    }
                }
            });
        }

        // Update bowler stats
        thismatch.playerStats.forEach(player => {
            if (player.playerId._id.toString() === thismatch.bowler._id.toString()) {
                if (extra_runs === 'none') {
                    player.bowling.overs += 0.1;
                    player.bowling.overs = overs_increase(player.bowling.overs);
                }
                player.bowling.runs += stricker_runs;
                if (wicket === 'yes') {
                    player.bowling.wickets++;
                }
                player.bowling.economy = (player.bowling.runs / player.bowling.overs).toFixed(1);
            }
        });

        // Update bowler's total stats in Player collection
        if (extra_runs === 'none') {
            thismatch.bowler.overs_deliverd += 0.1;
            thismatch.bowler.overs_deliverd = overs_increase(thismatch.bowler.overs_deliverd)
        }
        thismatch.bowler.runs_given += stricker_runs;
        thismatch.bowler.economy =( thismatch.bowler.runs_given / thismatch.bowler.overs_deliverd).toFixed(1);
        if (wicket === 'yes') {
            thismatch.bowler.wickets++;
        }

        // Update bowler's current innings score
        if (extra_runs === 'none') {
            thismatch.bowler_score.overs += 0.1;
            thismatch.bowler_score.overs = overs_increase(thismatch.bowler_score.overs)
        }
        thismatch.bowler_score.runs += stricker_runs;
        if (wicket === 'yes') {
            thismatch.bowler_score.wickets++;
        }

        // Update team scores
        if (thismatch.current_batting._id.toString() === thismatch.club1._id.toString()) {
            thismatch.score.club1.runs += stricker_runs;
            if (extra_runs === 'none') {

                thismatch.score.club1.overs += 0.1;
                thismatch.score.club1.overs = overs_increase(thismatch.score.club1.overs)
            }
            if (wicket === 'yes') {
                thismatch.score.club1.wickets++;
            }
        } else {
            thismatch.score.club2.runs += stricker_runs;
            if (extra_runs === 'none') {
                thismatch.score.club2.overs += 0.1;
                thismatch.score.club2.overs = overs_increase(thismatch.score.club2.overs)
            }
            if (wicket === 'yes') {
                thismatch.score.club2.wickets++;
            }
        }

        // Handle extra runs
        if (thismatch.current_batting._id.toString() === thismatch.club1._id.toString()) {
            switch (extra_runs) {
                case 'wd':
                    thismatch.score.club1.runs++;
                    break;
                case 'nb':
                    thismatch.score.club1.runs++;
                    break;
                default:
                    break;
            }
        } else {
            switch (extra_runs) {
                case 'wd':
                    thismatch.score.club2.runs++;
                    break;
                case 'nb':
                    thismatch.score.club2.runs++;
                    break;
                default:
                    break;
            }
        }

        // Handle wicket - replace batsman
        if (wicket === 'yes') {
            // Mark the out player as out
            thismatch.playerStats.forEach(player => {
                if (player.playerId._id.toString() === out_player.toString()) {
                    player.batting.out = true;
                }
            });

            // Replace striker with new batsman
            thismatch.stricker = new_batsman;
            thismatch.stricker_score.runs = 0;
            thismatch.stricker_score.balls = 0;
        }

        // Handle bowler change
        if (bowler && bowler.toString() !== thismatch.bowler._id.toString()) {
            thismatch.bowler = bowler;

            thismatch.playerStats.forEach(player => {
                if (player.playerId._id.toString() === bowler.toString()) {
                    thismatch.bowler_score.overs = player.bowling.overs;
                    thismatch.bowler_score.wickets = player.bowling.wickets;
                    thismatch.bowler_score.runs = player.bowling.runs;
                }
            });
        }
        // Handle strike change
        if (strike_change === 'yes') {
            let temp_stricker = thismatch.stricker;
            let temp_stricker_score = { ...thismatch.stricker_score }; // clone

            thismatch.stricker = thismatch.nonstricker;
            thismatch.stricker_score = { ...thismatch.nonstricker_score }; // clone

            thismatch.nonstricker = temp_stricker;
            thismatch.nonstricker_score = temp_stricker_score; // already cloned


        }
        let current_wickets;
        if (thismatch.current_batting._id.toString() === thismatch.club1._id.toString()) {
            current_wickets = thismatch.score.club1.wickets;
        } else {
            current_wickets = thismatch.score.club2.wickets
        }

        // Handle innings change
        if (change_innings === 'yes' || current_wickets === 10) {
            thismatch.current_batting = thismatch.current_batting._id.toString() === thismatch.club1._id.toString() ? thismatch.club2._id : thismatch.club1._id;
            thismatch.bowler = null;
            thismatch.stricker = null;
            thismatch.nonstricker = null;
            thismatch.stricker_score = { runs: 0, balls: 0 };
            thismatch.nonstricker_score = { runs: 0, balls: 0 };
            thismatch.bowler_score = { overs: 0.0, wickets: 0, runs: 0 };
            thismatch.innings = 2;
        }

        // Save the match
        await thismatch.save();
        await match_populate(thismatch);
        res.redirect(`/match/update_score/${thismatch._id}`);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to update live score" });
    }
});



route.post('/submit_result/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        await populate_cricket_club_data(user);
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch);
        let { man_of_match } = req.body.man_of_match;
        man_of_match = new mongoose.Types.ObjectId(man_of_match);
        thismatch.man_of_match = man_of_match;
        let loser ;
        if (thismatch.score.club1.runs > thismatch.score.club2.runs) {
            thismatch.winner = thismatch.club1._id;
            loser = thismatch.club2._id;
        } else if (thismatch.score.club1.runs < thismatch.score.club2.runs) {
            thismatch.winner = thismatch.club2._id;
            loser = thismatch.club1._id;
        }
        console.log(user.match_played)
        user.match_played.forEach(match => {
            if(match.matchId._id === thismatch._id){
                match.played = true;
            }
        });
        let winner = await  clubs.findById(thismatch.winner);
        winner.match_won.push(thismatch._id);
        loser = await clubs.findById(loser);
        loser.match_lose.push(thismatch._id);
        thismatch.status = 'completed';
        thismatch.submit_result = true;
        await thismatch.save();
        res.redirect(`/match/update_score/${thismatch._id}`);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Failed to update result " });
    }
})

route.post('/make_live/:_id', login, async (req, res) => {
    try {
        let user = req.user;
        await populate_cricket_club_data(user);
        let match_id = req.params._id;
        match_id = new mongoose.Types.ObjectId(match_id);
        let thismatch = await matches.findById(match_id);
        await match_populate(thismatch);
        thismatch.status = 'live';
        await thismatch.save();
        res.redirect(`/match/update_score/${thismatch._id}`);
    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Failed to update result " });
    }
})

// GET /api/match/live_score/:id
route.get('/refresh/live_score/:id', async (req, res) => {
    try {
        const thismatch = await matches.findById(req.params.id);
        await match_populate(thismatch);

        res.json({
            score: {
                club1: thismatch.score.club1,
                club2: thismatch.score.club2
            },
            club1: thismatch.club1,
            club2: thismatch.club2,
            current_batting: thismatch.current_batting,
            stricker: thismatch.stricker,
            nonstricker: thismatch.nonstricker,
            stricker_score: thismatch.stricker_score,
            nonstricker_score: thismatch.nonstricker_score,
            bowler: thismatch.bowler,
            bowler_score: thismatch.bowler_score,
            firstInnings: thismatch.firstInnings,
            secondInnings:thismatch.secondInnings,
            playerStats : thismatch.playerStats
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching live data' });
    }
});



module.exports = route;