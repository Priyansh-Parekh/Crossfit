const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose'); // Added Mongoose require
const port = process.env.PORT || 3000;

// --- DATABASE CONNECTION ---
// This block connects your application to MongoDB.
const connectDB = async () => {
  try {
    const connString = process.env.URI || 'mongodb+srv://priyanshparekh24:Pass%4025@ace-up-data.wkfpvme.mongodb.net/Crossfit'
    
    await mongoose.connect(connString);
    
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    // Exit process with failure if connection fails
    process.exit(1);
  }
};

connectDB();


// --- MIDDLEWARE ---
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayout);
app.use(cookieParser());


// --- ROUTES ---
app.use('/', require('./server/route/main'));
app.use('/clubs', require('./server/route/clubs'));
app.use('/leagues', require('./server/route/leagues'));
app.use('/live_scores', require('./server/route/live_scores'));
app.use('/merchandise', require('./server/route/merchandise'));
app.use('/login', require('./server/route/login'));
app.use('/logout', require('./server/route/logout'));
app.use('/register', require('./server/route/register'));
app.use('/dashboard', require('./server/route/dashboard'));
app.use('/match', require('./server/route/match'));
app.use('/cart', require('./server/route/cart'));


// --- SERVER LISTENER ---
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📁 Views directory: ${path.join(__dirname, 'views')}`);
});
