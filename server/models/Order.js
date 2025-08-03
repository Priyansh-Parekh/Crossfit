const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    viewerId: {
        type: Schema.Types.ObjectId,
        ref: 'Viewer_DATA',
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Merchandise_DATA',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: { // Price at the time of purchase
            type: Number,
            required: true
        },
        clubId: { // The club that sold this item
            type: Schema.Types.ObjectId,
            ref: 'Club_DATA',
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Order', OrderSchema);
