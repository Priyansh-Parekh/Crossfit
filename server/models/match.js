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
    challange_status: {
        type: String,
        default: 'pending',
        enum: ['accepted', 'pending', 'rejected']
    },
    venue: {
        type: String,
        trim: true
    },
    match_type: {
        type: String,
        enum: ['T20', 'ODI','Specific_overs']
    },
    status: {
        type: String,
        default: 'upcoming',
        enum: ['upcoming', 'live', 'completed', 'cancelled']
    },
    matchDate: Date,
    score: {
        club1: {
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
                default: 0.0
            }
        },
        club2: {
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
                default: 0.0
            }
        }
    },
    stricker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    stricker_score: {
        runs: {
            type: Number,
            default: 0
        },
        balls: {
            type: Number,
            default: 0
        }
    },
    nonstricker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    nonstricker_score: {
        runs: {
            type: Number,
            default: 0
        },
        balls: {
            type: Number,
            default: 0
        }
    },
    bowler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    bowler_score: {
        wickets: {
            type: Number,
            default: 0
        },
        overs: {
            type: Number,
            default: 0.0
        },
        runs:{
            type:Number,
            default:0
        }
    },
    prize: {
        type: Number
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    man_of_match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player_DATA'
    },
    toss_winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    toss_choice: {
        type: String,
        enum: ['Bat', 'Bowl']
    },
    firstInnings:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    secondInnings:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    innings: {
        type: Number,
        enum: [1, 2],
        default: 1
    },
    submit_result: {
        type: Boolean,
        default: false
    },
    current_batting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    },
    setup_club1: {
        type: Boolean,
        default: false
    },
    setup_club2: {
        type: Boolean,
        default: false
    },
    club1_leaders: {
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
    },
    club2_leaders: {
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
    },
    playerStats: [{
        playerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player_DATA'
        },
        batting: {
            runs: { type: Number, default: 0 },
            balls: { type: Number, default: 0 },
            fours: { type: Number, default: 0 },
            sixes: { type: Number, default: 0 },
            strike_rate: { type: Number, default: 0.0 },
            out: { type: Boolean, default: false }
        },
        bowling: {
            overs: { type: Number, default: 0.0 },
            runs: { type: Number, default: 0 },
            balls: { type: Number, default: 0 },
            wickets: { type: Number, default: 0 },
            economy: { type: Number, default: 0.0 }
        }
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Match_DATA', Match, 'Match_DATA');