const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Clubs page
route.get('/login_viewers', async (req, res) => {
    res.render("login_viewers");
})


// Clubs page
route.get('/login_clubs', async (req, res) => {
    res.render("login_clubs");
})


// Clubs page
route.get('/login_leagues', async (req, res) => {
    res.render("login_leagues");
})




module.exports = route;