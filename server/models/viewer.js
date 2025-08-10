const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is an example of what your viewer schema might look like.
// The important part is adding the 'balance' field.

const ViewerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        default: 'viewer'
    },
    profile_picture: String,
    status: {
        type: String,
        default: 'active'
    },
    favorite_teams: [{
        type: Schema.Types.ObjectId,
        ref: 'Club_DATA'
    }],
    
    // --- ADD THIS FIELD ---
    balance: {
        type: Number,
        required: true,
        default: 0 // Start all new users with a balance of 0
    },

    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true, default: 'India' }
    }

}, { timestamps: true });

module.exports = mongoose.model('Viewer_DATA', ViewerSchema, 'Viewer_DATA');
