// const mongoose = require('mongoose');

// // 4. PLAYERS SCHEMA 👤
// const Player = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true
//     },
//     profile_picture: {
//         type: String,
//         default: null
//     },
//     registered_club: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Club_DATA'
//     },
//     type: {
//         type: String,
//         required: true,
//         enum: ['batsman', 'bowler', 'wicket_keeper', 'all_rounder']
//     },
//     age: Number,
//     batting_style: {
//         type: String,
//         enum: ['right_handed', 'left_handed']
//     },
//     total_runs: {
//         type: Number,
//         default: 0
//     },
//     total_balls: {
//         type: Number,
//         default: 0
//     },
//     SR: {
//         type: Number,
//         default: 0.0
//     },
//     bowling_style: {
//         type: String,
//         enum: ['fast', 'medium', 'spin', 'off_spin', 'leg_spin']
//     },
//     wickets: {
//         type: Number,
//         default: 0
//     },
//     overs_deliverd: {
//         type: Number,
//         default: 0
//     },
//     runs_given: {
//         type: Number,
//         default: 0
//     },
//     economy: {
//         type: Number,
//         default: 0.0
//     },
//     jersey_number: Number,
//     status: {
//         type: String,
//         default: 'active',
//         enum: ['active', 'injured', 'retired']
//     }
// }, {
//     timestamps: true
// });


// module.exports= mongoose.model('Player_DATA',Player,'Player_DATA');