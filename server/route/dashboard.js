const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// --- Multer Configuration ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "productImage") {
            cb(null, 'public/uploads/merchandise/');
        } else {
            cb(null, 'public/uploads/profiles/');
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- Models ---
const matches = require("../models/match");
const players = require("../models/player");
const merchandise = require("../models/merchandise");
const clubs = require("../models/club");
const viewers = require("../models/viewer");

// --- Login Middleware ---
const login = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token || token === "none") {
            req.user = "none";
            return next();
        }
        const decoded = jwt.verify(token, "secret-word");
        let user = await viewers.findOne({ email: decoded.email }) ||
                   await clubs.findOne({ email: decoded.email });
        req.user = user || "none";
    } catch (err) {
        req.user = "none";
    }
    next();
};

// --- Helper Functions for Populating Data ---
const populate_cricket_club_data = async (club) => {
    await club.populate(['players', 'captain', 'vice_captain', 'wicket_keeper']);
    await club.populate({
        path: 'match_played.matchId',
        populate: [
            { path: 'club1' }, { path: 'club2' }, { path: 'winner' }, 
            { path: 'toss_winner' }, { path: 'man_of_match' }
        ]
    });
};

// --- HIGHLY OPTIMIZED Viewer Dashboard Route ---
route.get('/viewer', login, async (req, res) => {
    try {
        if (req.user === "none") return res.redirect('/login');
        
        const user = req.user;
        // 1. Get an array of the user's favorite team IDs
        const favoriteTeamIds = user.favorite_teams;

        // 2. Ask the database for ONLY the clubs whose IDs are NOT in the favorite list
        const refinedclubs = await clubs.find({ _id: { $nin: favoriteTeamIds } });

        // 3. We still need to populate the user's favorite teams to display them
        await user.populate('favorite_teams');

        res.render("viewer_dashboard", { 
            user: user, 
            refinedclubs: refinedclubs 
        });
    } catch (error) {
        console.error("Error loading viewer dashboard:", error);
        res.redirect('/error');
    }
});

// --- OPTIMIZED Club Dashboard Route ---
route.get('/clubs', login, async (req, res) => {
    try {
        if (req.user === "none" || req.user.user_type !== 'club') return res.redirect('/login');
        
        const user = req.user;
        await populate_cricket_club_data(user);

        const allClubs = await clubs.find({ _id: { $ne: user._id } });

        const challange_recived = user.match_played.filter(m => m.matchId && m.matchId.club2 && m.matchId.club2._id.equals(user._id) && m.matchId.challange_status === 'pending');
        const challange_given = user.match_played.filter(m => m.matchId && m.matchId.club1 && m.matchId.club1._id.equals(user._id) && m.matchId.challange_status === 'pending');
        const live_matches = user.match_played.filter(m => m.matchId && m.matchId.status === 'live');
        const upcoming_matches = user.match_played.filter(m => m.matchId && m.matchId.status === 'upcoming' && m.matchId.challange_status === 'accepted');

        res.render("club_dashboard", {
            user,
            clubs: allClubs,
            challange_recived,
            challange_given,
            live_matches,
            upcoming_matches
        });
    } catch (err) {
        console.error("Error loading club dashboard:", err);
        res.redirect('/error');
    }
});


// --- ALL POST ROUTES ---

// Merchandise Upload
route.post('/merchandise/upload', login, upload.single('productImage'), async (req, res) => {
    try {
        if (!req.user || req.user.user_type !== 'club') {
            return res.status(403).send("Access Denied.");
        }
        if (!req.file) {
            return res.status(400).send("No image file was uploaded.");
        }
        const newMerchandise = new merchandise({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock_quantity: req.body.stock_quantity,
            clubId: req.user._id,
            imageUrl: `/uploads/merchandise/${req.file.filename}`
        });
        await newMerchandise.save();
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.error("MONGOOSE SAVE ERROR:", error);
        res.status(500).send(`<h1>Upload Failed</h1><p>${error.message}</p>`);
    }
});

// Club Actions
route.post('/clubs/change_info', login, async (req, res) => {
    try {
        let user = req.user;
        let { name, founded_year, bio, slogan, password } = req.body;
        let check = await bcrypt.compare(password, user.password);
        if (check) {
            if (name) user.name = name;
            if (founded_year) user.founded_year = founded_year;
            if (bio) user.bio = bio;
            if (slogan) user.slogan = slogan;
            await user.save();
        }
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/clubs/change_logo', login, upload.single('club_logo'), async (req, res) => {
    try {
        let user = req.user;
        if (req.file) {
            const imagePath = req.file.path;
            const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
            const mimeType = req.file.mimetype;
            user.logo = `data:${mimeType};base64,${base64Image}`;
            await user.save();
            fs.unlinkSync(imagePath);
        }
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/clubs/create_challange', login, async (req, res) => {
    try {
        let user = req.user;
        let { club2, prize, venue, matchDate, match_type } = req.body;
        let match = await matches.create({
            club1: user._id,
            club2: new mongoose.Types.ObjectId(club2),
            prize: Number(prize),
            venue,
            matchDate,
            match_type
        });
        user.match_played.push({ matchId: match._id });
        let opponent = await clubs.findById(club2);
        opponent.match_played.push({ matchId: match._id });
        await Promise.all([user.save(), opponent.save()]);
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/clubs/challange_accept', login, async (req, res) => {
    try {
        await matches.updateOne({ _id: req.body.match_id }, { challange_status: 'accepted' });
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/clubs/challange_reject', login, async (req, res) => {
    try {
        await matches.updateOne({ _id: req.body.match_id }, { challange_status: 'rejected' });
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/clubs/add_player', login, upload.single('profile_picture'), async (req, res) => {
    try {
        let user = req.user;
        let dataURI = null;
        if (req.file) {
            const imagePath = req.file.path;
            const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
            const mimeType = req.file.mimetype;
            dataURI = `data:${mimeType};base64,${base64Image}`;
            fs.unlinkSync(imagePath);
        }
        let { name, age, batting_style, total_runs, type, total_balls, bowling_style, wickets, overs_deliverd, runs_given, jersey_number } = req.body;
        let player = await players.create({
            name, age, batting_style, total_runs, type, total_balls, bowling_style, wickets, overs_deliverd, runs_given, jersey_number,
            registered_club: user._id,
            profile_picture: dataURI
        });
        user.players.push(player._id);
        await user.save();
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/clubs/fire_player', login, async (req, res) => {
    try {
        let user = req.user;
        let player_id = req.body.player_id;
        await players.findByIdAndDelete(player_id);
        user.players.pull(player_id);
        await user.save();
        res.redirect('/dashboard/clubs');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

// Viewer Actions
route.post('/viewer/add_profile_picture', login, upload.single('profile_picture'), async (req, res) => {
    try {
        if (req.user && req.file) {
            const imagePath = req.file.path;
            const base64Image = fs.readFileSync(imagePath, { encoding: 'base64' });
            const mimeType = req.file.mimetype;
            req.user.profile_picture = `data:${mimeType};base64,${base64Image}`;
            await req.user.save();
            fs.unlinkSync(imagePath);
        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/viewer/add_balance', login, async (req, res) => {
    try {
        const amountToAdd = Number(req.body.amount);
        if (isNaN(amountToAdd) || amountToAdd <= 0) {
            return res.status(400).send("Invalid amount.");
        }
        await viewers.updateOne({ _id: req.user._id }, { $inc: { balance: amountToAdd } });
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log("Error adding balance:", error);
        res.redirect('/error');
    }
});

route.post('/viewer/add_fav_club', login, async (req, res) => {
    try {
        if (req.body.favorite_teams) {
            req.user.favorite_teams.push(req.body.favorite_teams);
            await req.user.save();
        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/viewer/remove_fav_club', login, async (req, res) => {
    try {
        if (req.body.favorite_teams) {
            req.user.favorite_teams.pull(req.body.favorite_teams);
            await req.user.save();
        }
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/viewer/status', login, async (req, res) => {
    try {
        req.user.status = req.body.status === 'active' ? 'inactive' : 'active';
        await req.user.save();
        res.redirect('/dashboard/viewer');
    } catch (error) {
        console.log(error);
        res.redirect('/error');
    }
});

route.post('/viewer/update_address', login, async (req, res) => {
    try {
        if (req.user === "none" || req.user.user_type !== 'viewer') {
            return res.redirect('/login');
        }

        const { street, city, state, postalCode } = req.body;

        // Find the viewer and update their address using the $set operator
        await viewers.updateOne(
            { _id: req.user._id },
            { 
                $set: {
                    "address.street": street,
                    "address.city": city,
                    "address.state": state,
                    "address.postalCode": postalCode,
                    "address.country": "India" // Defaulting to India
                }
            }
        );
        
        // Redirect back to the dashboard to show the updated address
        res.redirect('/dashboard/viewer');

    } catch (error) {
        console.error("Error updating address:", error);
        res.redirect('/error');
    }
});

module.exports = route;
