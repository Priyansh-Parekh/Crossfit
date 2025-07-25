const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path'); // Added for path manipulation
const multer = require('multer');

// --- Multer Configuration for Image Uploads ---
// This tells multer where to save the uploaded files and what to name them.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define different destinations based on the route
        if (file.fieldname === "productImage") {
            cb(null, 'public/uploads/merchandise/');
        } else if (file.fieldname === "club_logo" || file.fieldname === "profile_picture") {
            cb(null, 'public/uploads/profiles/'); // Example for other uploads
        } else {
            cb(null, 'public/uploads/');
        }
    },
    filename: function (req, file, cb) {
        // Create a unique filename: fieldname-timestamp.extension
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


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
        { path: 'playerStats.playerId' }
    ]);
};


// Dashboard club Page
route.get('/clubs', login, datas, async (req, res) => {
    try {
        let user = req.user;
        let clubs = req.data.clubs
        let challange_recived;
        let challange_given;
        let live_matches;
        let upcoming_matches;
        if (user.user_type === 'club') {
            await populate_cricket_club_data(user); // Populates matchId data

            if (user.match_played.length > 0 && user.match_played) {
                live_matches = user.match_played.filter(match =>
                    match.matchId &&
                    !match.matchId.played &&
                    match.matchId.status === 'live' &&
                    match.matchId.challange_status === 'accepted'
                );
                upcoming_matches = user.match_played.filter(match =>
                    match.matchId &&
                    !match.matchId.played &&
                    match.matchId.status === 'upcoming' &&
                    match.matchId.challange_status === 'accepted'
                );

                for (const match of live_matches) {
                    await match_populate(match);
                }

                for (const match of upcoming_matches) {
                    await match_populate(match);
                }
            } else {
                live_matches = false;
                upcoming_matches = false;
            }

            if (live_matches.length === 0) {
                live_matches = false;
            }


            if (upcoming_matches.length === 0) {
                upcoming_matches = false;
            }

            if (user.match_played.length > 0 && user.match_played) {
                // Check if match.club1/club2 is populated
                challange_recived = user.match_played.filter(match =>
                    match.matchId &&
                    !match.matchId.played &&
                    match.matchId.club2 &&
                    match.matchId.club2.name === user.name &&
                    match.matchId.status !== 'completed' &&
                    match.matchId.status !== 'cancelled8'
                );

                challange_given = user.match_played.filter(match =>
                    match.matchId &&
                    !match.matchId.played &&
                    match.matchId.club1 &&
                    match.matchId.club1.name === user.name &&
                    match.matchId.status !== 'completed' &&
                    match.matchId.status !== 'cancelled'
                );

            } else {
                challange_recived = false;
                challange_given = false;

            }
            return res.render("club_dashboard", {
                user,
                challange_recived,
                challange_given,
                clubs,
                live_matches,
                upcoming_matches
            });


        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading club dashboard.");
    }
});

// --- NEW ROUTE FOR MERCHANDISE UPLOAD ---
route.post('/merchandise/upload', login, upload.single('productImage'), async (req, res) => {
    try {
        if (!req.user || req.user.user_type !== 'club') {
            console.error("Upload denied: User is not a logged-in club.");
            return res.status(403).send("Access denied. You must be logged in as a club to upload merchandise.");
        }

        if (!req.file) {
            console.error("Upload error: No file was selected.");
            return res.status(400).send("No image file was selected.");
        }

        const newMerchandise = new merchandise({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock_quantity: req.body.stock_quantity,
            clubId: req.user._id, // Assign the logged-in club's ID
            imageUrl: `/uploads/merchandise/${req.file.filename}` 
        });

        // --- Improved Save Logic ---
        // This will now catch any validation errors from Mongoose.
        await newMerchandise.save();
        
        console.log("SUCCESS: Merchandise saved to DB:", newMerchandise.name);
        res.redirect('/dashboard/clubs');

    } catch (error) {
        // This will now print a more detailed error to your console
        console.error("MONGOOSE SAVE ERROR:", error);
        res.status(500).send("Failed to save to database. Check server console for details.");
    }
});



route.post('/clubs/change_info', login, async (req, res) => {
    try {
        let user = req.user;
        let { name, founded_year, bio, slogan, password } = req.body;
        let check = await bcrypt.compare(password, user.password);
        if (check) {

            if (name) {
                user.name = name;
            }
            if (founded_year) {
                user.founded_year = founded_year;
            }
            if (bio) {
                user.bio = bio;
            }
            if (slogan) {
                user.slogan = slogan;
            }
        }
        await user.save();
        res.redirect('/dashboard/clubs')
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Editing Details");
    }
})

route.post('/clubs/change_logo', login, upload.single('club_logo'), async (req, res) => {
    try {
        let user = req.user;
        const imagePath = req.file.path;
        // Read and convert to Base64
        const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
        const mimeType = req.file.mimetype; // e.g., 'image/png'
        const dataURI = `data:${mimeType};base64,${base64Image}`;
        user.logo = dataURI;
        await user.save();
        res.redirect('/dashboard/clubs')
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Editing Details");
    }
})

route.post('/clubs/create_challange', login, async (req, res) => {
    try {
        let user = req.user;
        let { club2, prize, venue, matchDate, match_type } = req.body;
        club2 = new mongoose.Types.ObjectId(club2);
        prize = Number(prize);
        let match = await matches.create({
            club1: user._id,
            club2: club2,
            prize,
            venue,
            matchDate,
            match_type
        })
        user.match_played.push({
            matchId: match._id
        });
        await user.save();
        let opponent = await clubs.findOne({ _id: club2 });
        opponent.match_played.push({
            matchId: match._id
        });
        await opponent.save();

        res.redirect('/dashboard/clubs')
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Challanging club");
    }
})

route.post('/clubs/challange_accept', login, async (req, res) => {
    try {
        let match_id = req.body.match_id;
        let match = await matches.findOne({ _id: match_id });
        match.challange_status = 'accepted';
        await match.save();
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error changing status ");
    }
})

route.post('/clubs/challange_reject', login, async (req, res) => {
    try {
        let match_id = req.body.match_id;

        console.log(match_id);
        match_id = new mongoose.Types.ObjectId(match_id);
        let match = await matches.findOne({ _id: match_id });
        match.challange_status = 'rejected';
        await match.save();
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error changing status ");
    }
})

route.post('/clubs/add_player', login, upload.single('profile_picture'), async (req, res) => {
    try {
        let user = req.user;
        const imagePath = req.file.path;
        // Read and convert to Base64   upload, bu
        const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
        const mimeType = req.file.mimetype; // e.g., 'image/png'
        const dataURI = `data:${mimeType};base64,${base64Image}`;

        let { name, age, batting_style, total_runs, type, total_balls, bowling_style, wickets, overs_deliverd, runs_given, jersey_number } = req.body;
        age = Number(age);
        total_runs = Number(total_runs);
        total_balls = Number(total_balls);
        wickets = Number(wickets);
        overs_deliverd = Number(overs_deliverd);
        runs_given = Number(runs_given);
        jersey_number = Number(jersey_number);
        let SR = total_runs / total_balls;
        let economy = runs_given / overs_deliverd;
        let player = await players.create({ name, age, batting_style, total_runs, registered_club: user._id, total_balls, SR, economy, type, bowling_style, wickets, overs_deliverd, runs_given, jersey_number, profile_picture: dataURI })
        await user.players.push(player._id)
        await user.save()
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Adding Player ");
    }
})

route.post('/clubs/fire_player', login, async (req, res) => {
    try {
        let user = req.user;
        let player_id = req.body.player_id
        player_id = new mongoose.Types.ObjectId(player_id)
        let player = await players.findByIdAndDelete(player_id);  //model->create data
        await user.players.pull({ player_id }); 
        await user.save();
        res.redirect('/dashboard/clubs');   
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Firing Player ");
    }
})




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

route.post('/viewer/add_fav_club', login, async (req, res) => {
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

route.post('/viewer/remove_fav_club', login, async (req, res) => {
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

route.post('/viewer/status', login, async (req, res) => {
    try {
        let user = req.user;
        let status = req.body.status;

        if (status === 'active') {
            user.status = 'inactive';
            await user.save();

        } else {
            user.status = 'active';
            await user.save();
        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding favorite team");
    }
});


route.post('/viewer/add_profile_picture', login, upload.single('profile_picture'), async (req, res) => {
    try {
        let user = req.user;
        if (req.file) {
            const imagePath = req.file.path;
            // Read and convert to Base64    
            const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
            const mimeType = req.file.mimetype; // e.g., 'image/png'
            const dataURI = `data:${mimeType};base64,${base64Image}`;
            user.profile_picture = dataURI;
            await user.save();
        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding favorite team");
    }
});


module.exports = route;
