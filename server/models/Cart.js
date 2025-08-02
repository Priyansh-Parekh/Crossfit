const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Viewer_DATA', // Links to your Viewer model
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Merchandise_DATA', // This MUST match your merchandise model name
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
