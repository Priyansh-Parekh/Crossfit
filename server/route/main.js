const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Home Page
route.get('/', async (req, res) => {
    res.render("index");
});

//News Page
route.get('/news', async (req, res) => {
    res.render("news");
});


module.exports = route;