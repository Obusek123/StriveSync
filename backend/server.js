const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // To load environment variables

const app = express();

// MongoDB connection setup
mongoose
    .connect(
        process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/strivesync-user',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('DB connected'))
    .catch((err) => console.error('DB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    personalInfo: {
        height: Number,
        weight: Number,
        age: Number,
        gender: String,
        bmi: String,
    },
    // Removed extra fields and schemas
});

// User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// User Sign-Up Endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const user = new User({ username, email, password });
        const doc = await user.save();
        res.status(201).json({ user: doc });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// User Login Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored password
        if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User Information
app.patch('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, personalInfo } = req.body;

        const updateFields = {};

        // Update username and email if provided
        if (username) updateFields.username = username;
        if (email) updateFields.email = email;

        // Update personalInfo fields if provided
        if (personalInfo) {
            const { height, weight, age, gender } = personalInfo;
            const calculatedBMI =
                height && weight
                    ? (weight / (height / 100) ** 2).toFixed(2)
                    : personalInfo.bmi;

            updateFields.personalInfo = {
                height,
                weight,
                age,
                gender,
                bmi: calculatedBMI,
            };
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
