// server/route/news.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// Route to fetch news from NewsAPI
// GET /api/news/
// In server/route/news.js
// In server/route/news.js
router.get('/', async (req, res) => {
    // Only get the topic, remove the page logic
    const topic = req.query.topic || 'cricket'; 

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
            q: topic,
            language: 'en',
            sortBy: 'publishedAt',
            pageSize: 12, // It will now only get the first 12 articles
            apiKey: process.env.NEWS_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ message: 'Error fetching news data' });
    }
});

module.exports = router;