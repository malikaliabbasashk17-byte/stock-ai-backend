const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
    res.send('Stock AI Backend Vercel par sahi kaam kar raha hai!');
});

// Main API Route
app.get('/api/market-data', async (req, res) => {
    try {
        const apiKey = process.env.STOCK_API_KEY;
        const response = await axios.get(`https://api.example.com/stocks?apikey=${apiKey}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: 'API se data fetch karne mein masla hua hai.' });
    }
});

// Server Start (Local testing ke liye)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server port ${PORT} par chal raha hai`);
    });
}

// Vercel ke liye export lazmi hai
module.exports = app;
