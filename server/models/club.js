const mongoose = require('mongoose');

// 2. CLUBS SCHEMA 🏟
const Club = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6
    },
    logo: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        trim: true
    },
    slogan:  String,
    user_type: {
        type: String,
        default: 'club'
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    location:String,
    founded_year: {
        type: Number,
        min: 1800,
        max: new Date().getFullYear()
    },
    sport: {
        type: String,
        default: 'cricket'
    },
    match_won: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match_DATA'
    }],
    match_lose: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match_DATA'
    }],
    match_played: [{
        played: {
            type: Boolean,
            default: false
        },
        matchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Match_DATA'
        }
    }],
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    }],
    merchandise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Merchandise_DATA'
    }],
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    vice_captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    wicket_keeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    bowlers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    }],
    batsman: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA' 
    }]
}, {
    timestamps: true
});


module.exports= mongoose.model('Club_DATA',Club,'Club_DATA');