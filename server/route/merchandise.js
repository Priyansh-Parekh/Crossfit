const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//fetching data
const merchandise = require("../models/merchandise");



route.get('/merchandise', async (req, res) => {
  try {
    const allMerchandise = await merchandise.find(); // fetch all merchandise
    res.render('merchandise', { merchandise: allMerchandise }); // ✅ pass to EJS
  } catch (error) {
    console.error("Error fetching merchandise:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = route;






module.exports = route;