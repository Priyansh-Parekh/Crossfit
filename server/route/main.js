const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const udata = require("../models/userdata");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//Home Page
route.get('/', async (req, res) => {
    res.render("index");
})







module.exports = route;