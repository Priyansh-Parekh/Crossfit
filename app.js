// 1. Load environment variables FIRST. This is the crucial fix.
require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// --- DATABASE CONNECTION ---
const connectDB = async () => {
  try {
    const connString = process.env.URI;
    if (!connString) {
        console.error('❌ URI not found in .env file. Please add it.');
        process.exit(1);
    }
    await mongoose.connect(connString);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
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
// Now that .env is loaded, all routes can safely access process.env
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
app.use('/payment', require('./server/route/payment'));


// --- SERVER LISTENER ---
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
