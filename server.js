require('dotenv').config(); // Load environment variables from .env
const express = require("express");
const fetch = require("node-fetch");
global.fetch = fetch; // Assign global fetch for node-fetch
const cors = require('cors');
const server_config = require("./configs/server.config");

const app = express();
app.use(cors()); // Enable CORS

// Access the Unsplash API key from the environment variables
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Route to handle photo searches from Unsplash
app.get("/api/photos", async (req, res) => {
    const query = req.query.query || 'nature'; // Default query if none provided
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch data from Unsplash API");
        }
        
        const data = await response.json();
        res.json(data); // Return the fetched data to the client
    } catch (err) {
        res.status(500).json({ error: err.message }); // Error handling
    }
});

// Start the server on the specified port
app.listen(server_config.PORT, () => {
    console.log(`Server started at port number ${server_config.PORT}`);
});