const mongoose = require('mongoose');

// 6. MATCHES SCHEMA 📈
const Match = new mongoose.Schema({
    club1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    club2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    league: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'League_DATA'
    },
    venue: {
        type: String,
        trim: true
    },
    match_type: {
        type: String,
        enum: ['T20', 'ODI', 'Test']
    },
    status: {
        type: String,
        default: 'upcoming',
        enum: ['upcoming', 'live', 'completed', 'cancelled']
    },
    matchDate: Date,
    score: {
        clubA: {
            runs: {
                type: Number,
                default: 0
            },
            wickets: {
                type: Number,
                default: 0
            },
            overs: {
                type: Number,
                default: 0
            }
        },
        clubB: {
            runs: {
                type: Number,
                default: 0
            },
            wickets: {
                type: Number,
                default: 0
            },
            overs: {
                type: Number,
                default: 0
            }
        }
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    result:{
        type: String,
        enum : ['Won','Lose']
    },
    man_of_match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    toss_winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    events: [{
        time: String,
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player_DATA'
        },
        description: String,
        type: String
    }],
    playerStats: [{
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player_DATA'
        },
        clubId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Club_DATA'
        },
        batting: {
            runs: { type: Number, default: 0 },
            balls: { type: Number, default: 0 },
            fours: { type: Number, default: 0 },
            sixes: { type: Number, default: 0 },
            strike_rate: { type: Number, default: 0 }
        },
        bowling: {
            overs: { type: Number, default: 0 },
            runs: { type: Number, default: 0 },
            wickets: { type: Number, default: 0 },
            economy: { type: Number, default: 0 }
        }
    }]
}, {
    timestamps: true
});


module.exports= mongoose.model('Match_DATA',Match,'Match_DATA');