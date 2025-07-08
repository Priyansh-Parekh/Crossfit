const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Get Register Page
route.get('/register', (req, res) => {
  res.render('auth/register', { error: null });
});

// Post Register Page
route.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.render('auth/register', { error: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.render('auth/register', { error: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, 
      email, 
      password: hashPassword 
    });
    
    await newUser.save();
    res.redirect('/auth/login');
  } catch (err) {
    console.error('Registration error:', err);
    res.render('auth/register', { error: 'Registration failed. Please try again.' });
  }
});

// GET login page
route.get('/login', (req, res) => {
  res.render('auth/login', { error: null });
});

// POST login page
route.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.render('auth/login', { error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('auth/login', { error: 'Invalid email or password' });
    }

    // TODO: Implement session or JWT here
    res.redirect('/'); // Redirect to home after successful login
    
  } catch (err) {
    console.error('Login error:', err);
    res.render('auth/login', { error: 'Login failed. Please try again.' });
  }
});

module.exports = route;