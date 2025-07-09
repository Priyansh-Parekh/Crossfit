const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//live score  Page
route.get('/', async (req, res) => {
    res.render("live_score");
})







module.exports = route;