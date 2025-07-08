const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Get Register Page
route.get('/register', (req, res) => {
  res.render('auth/register', {error: null});
});

//Post Register Page
