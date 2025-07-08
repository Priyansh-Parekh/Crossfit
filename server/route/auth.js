const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

//Get Register Page
route.get('/register', (req, res) => {
  res.render('auth/register', {error: null});
});

//Post Register Page
route.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const UserExists = await User.findOne({ email});
  if(UserExists) [
    return res.render('auth/register', { error: 'User already exists'})
  ];

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashpassword});
  await.newUser.save();
  res.redirect('/auth/login');
});

//GET login page

route.get('/login', (req, res) => {
  res.render('auth/login', {error: null});
})

//POST login page
route.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({ email });
  if(!user) {
    return res.render('auth/login', { error: 'Invalid email or password'});
    }
  }
