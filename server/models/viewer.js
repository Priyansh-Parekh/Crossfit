const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://priyanshparekh24:Pass%4025@ace-up-data.wkfpvme.mongodb.net/ACE_UP')
    .then(() => console.log('✅ Connected to MongoDB Atlas!'))
    .catch(err => console.error('❌ Connection error:', err));




// 1. VIEWERS SCHEMA 👤
const Viewer = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6
    },
    profile_picture: {
        type: String,
        default: null
    },
    user_type: {
        type: String,
        default: 'viewer'
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'inactive']
    },
    location: String,
    favorite_teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club_DATA'
    }]
}, {
    timestamps: true
});



// Add indexes for better performance
// Viewer.index({ email: 1 });    Redundant index as email is already unique
// Club.index({ email: 1 });
// League.index({ email: 1 });
// Player.index({ registered_club: 1 });
// Merchandise.index({ clubId: 1 });
// Match.index({ club1: 1, club2: 1 });


module.exports= mongoose.model('Viewer_DATA',Viewer,'Viewer_DATA');