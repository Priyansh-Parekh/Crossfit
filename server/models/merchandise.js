// const mongoose = require('mongoose');

// // 5. MERCHANDISE SCHEMA 🛒
// const Merchandise = new mongoose.Schema({
//     name: {
//         type: String,
//         trim: true
//     },
//     price: {
//         type: Number,
//         min: 0
//     },
//     imageUrl: String,
//     description: {
//         type: String,
//         trim: true
//     },
//     sport: {
//         type: String,
//         enum: ['Cricket','Football','Volleyball']
//     },
//     clubId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Club_DATA'
//     },
//     category:String,
//     stock_quantity: {
//         type: Number,
//         min: 0
//     },
//     status: {
//         type: String,
//         default: 'available',
//         enum: ['available', 'out_of_stock']
//     }
// }, {
//     timestamps: true
// });


// module.exports= mongoose.model('Merchandise_DATA',Merchandise,'Merchandise_DATA');