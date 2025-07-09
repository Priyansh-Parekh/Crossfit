const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//leagues Page
route.get('/', async (req, res) => {
    res.render("leagues");
})







module.exports = route;