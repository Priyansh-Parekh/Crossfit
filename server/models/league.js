const mongoose = require('mongoose');

// 3. LEAGUES SCHEMA 🏆
const League = new mongoose.Schema({
    name: {
        type: String,
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
    user_type: {
        type: String,
        default: 'league'
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    organizer_name: {
        type: String,
        trim: true
    },
    start_date: Date,
    end_date: Date,
    sport: {
        type: String,
        default: 'cricket'
    },
    participating_clubs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    }],
    schedule: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match_DATA',
        match_type: {
            type: String,
            enum: ['normal', 'semi final', 'final']
        }
    }],
    pointsTable: [{
        clubId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club_DATA'
        },
        points: {
            type: Number,
            default: 0
        },
        wins: {
            type: Number,
            default: 0
        },
        draws: {
            type: Number,
            default: 0
        },
        losses: {
            type: Number,
            default: 0
        }
    }]
}, {
    timestamps: true
});


module.exports= mongoose.model('League_DATA',League,'League_DATA');