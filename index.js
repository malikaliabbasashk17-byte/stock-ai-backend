const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware: Is se aapka blog is backend se data mangwa sakega
app.use(cors());
app.use(express.json());

// 1. Test Route: Yeh check karne ke liye ke server chal raha hai
app.get('/', (req, res) => {
    res.send('Stock AI Backend sahi kaam kar raha hai!');
});

// 2. Main API Route: Jo aapke blog par market data bhejay ga
app.get('/api/market-data', async (req, res) => {
    try {
        const apiKey = process.env.STOCK_API_KEY;
        
        // Yahan 'https://api.example.com/stocks' ki jagah apni real stock API ka URL aye ga
        const response = await axios.get(`https://api.example.com/stocks?apikey=${apiKey}`);
        
        // Yeh line aapke blog (frontend) ko data send karegi
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: 'API se data fetch karne mein masla hua hai.' });
    }
});

// Server Start karne ke liye
app.listen(PORT, () => {
    console.log(`Server port ${PORT} par chal raha hai`);
});
