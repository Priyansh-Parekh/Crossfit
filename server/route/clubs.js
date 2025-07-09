const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Clubs page
route.get('/', async (req, res) => {
    res.render("clubs");
})







module.exports = route;