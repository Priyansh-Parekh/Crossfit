const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



//all 3 models
const Viewer = require('../models/viewer');
const Club = require('../models/club');
const League = require('../models/league'); 

//to get model by user type

function getModel(user_type) {
  switch (user_type) {
    case 'viewer': return Viewer;
    case 'club': return Club;
    case 'league': return League;
    default: return null;
}
}

// Get Register Page
route.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Post Register Page
route.post('/register', async (req, res) => {
  try {
    const { name, email, password, user_type } = req.body;

    // Input validation
    if (!name || !email || !password || !user_type) {
      return res.render('register', { error: 'All fields are required' });
    }

    const Model = getModel(user_type);
    if (!Model) { return res.render('register', { error: 'Invalid user type' }); }

    // Check if user already exists
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.render('register', { error: 'Invalid email format' });
    }

    const userExists = await Viewer.findOne({ email });
    if(userExists) {
      return res.render('register', { error: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new Model({ 
      name, 
      email, 
      password: hashPassword,
      user_type
    });
    
    await newUser.save();
    res.redirect('/login');

  } catch (err) {
    console.error('Registration error:', err);
    res.render('register', { error: 'Registration failed. Please try again.' });
  }
});

// GET login page
route.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login to Sporttelect',
     error: null });
});

// POST login page
route.post('/login', async (req, res) => {
  try {
    const { email, password, user_type } = req.body;

    // Input validation
    if (!email || !password || !user_type) {
      return res.render('login', { error: 'All fields are required' });
    }

    const Model = getModel(user_type);
    if(!Model) return res.render('login', {error: 'Invalid user type'});

    const user = await Viewer.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('login', { error: 'Invalid email or password' });
    }

    // TODO: Implement session or JWT here
    res.redirect('/'); // Redirect to home after successful login
    
  } catch (err) {
    console.error('Login error:', err);
    res.render('login', { error: 'Login failed. Please try again.' });
  }
});

module.exports = route;