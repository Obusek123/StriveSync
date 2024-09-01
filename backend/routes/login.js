// backend/routes/login.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Handle login request
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password (in a real app, you should hash passwords and compare hashed values)
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Send success response (you might want to send a JWT or session token here)
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
