const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Home / Test Route (Yeh ab 100% chalega bina crash kiye)
app.get('/', (req, res) => {
    res.json({ 
        status: "success", 
        message: "Stock AI Backend Vercel par live chal raha hai!" 
    });
});

// 2. Market Data Route
app.get('/api/market-data', async (req, res) => {
    try {
        const apiKey = process.env.STOCK_API_KEY || "no_key";
        
        // Agar abhi dummy URL hai to crash na ho, isliye static response check
        if (!process.env.STOCK_API_KEY || process.env.STOCK_API_KEY === "no_key") {
            return res.json({ 
                message: "Backend connect ho gaya hai! Jab aap real API URL aur Key dalenge to data show ho jayega.",
                testData: { index: "KSE-100", points: "78,000", change: "+1.2%" }
            });
        }

        // Jab aap apni real API ka URL lagayenge, to neeche wali lines chalengi:
        const response = await axios.get(`https://api.example.com/stocks?apikey=${apiKey}`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ 
            error: 'API Connection issue', 
            details: error.message 
        });
    }
});

module.exports = app;
