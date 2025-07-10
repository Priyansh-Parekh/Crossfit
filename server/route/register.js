const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// viewers page
route.get('/register_viewers', async (req, res) => {
    res.render("register_viewers");
})


// Clubs page
route.get('/register_clubs', async (req, res) => {
    res.render("register_clubs");
})


// leagues page
route.get('/register_leagues', async (req, res) => {
    res.render("register_leagues");
})




module.exports = route;