const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    // Link the cart to a specific user (assuming your user model is 'Viewer_DATA')
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Viewer_DATA',
        required: true,
        unique: true // Each user has only one cart
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Merchandise_DATA', // Reference to your merchandise model
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', CartSchema);