const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
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
    profileImage: { type: String },
    personalInfo: {
        height: { type: Number },
        weight: { type: Number },
        age: { type: Number },
        gender: { type: String },
        bmi: { type: Number }, // Changed to Number to represent BMI correctly
        calorieIntake: { type: Number },
        activityLevel: { type: String },
    },
    fitnessGoals: {
        primaryGoals: [{ type: String }],
        targetWeight: { type: Number },
        targetTimeframe: { type: String },
    },
    signupDate: { type: Date, default: Date.now },
    // Optional: Using a schema for calories, but keeping it simple if you want
    dateCaloriesMap: {
        type: Map, // Using a Map for better clarity if you want a key-value structure
        of: Number, // The value for each date key will be the calories burned (Number)
        default: {},
    },
    bmiHistory: [
        {
            date: { type: Date, default: Date.now },
            bmi: { type: Number, required: true },
        },
    ],
});

// User model
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};

// User Sign-Up Endpoint
app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ error: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        const doc = await user.save();
        res.status(201).json({ user: doc });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// User Login Endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: 'Incorrect password' });

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User Information (PATCH)
app.patch('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, personalInfo, fitnessGoals, dateCaloriesMap } =
        req.body;

    const updateFields = {};
    let bmiHistoryUpdate = null; // Variable to store the new BMI entry

    if (username) updateFields.username = username;
    if (email) updateFields.email = email;

    if (personalInfo) {
        const { height, weight, age, gender, calorieIntake, activityLevel } =
            personalInfo;

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
            calorieIntake,
            activityLevel,
        };

        // If both height and weight are provided, we can add to bmiHistory
        if (calculatedBMI) {
            bmiHistoryUpdate = { bmi: calculatedBMI, date: new Date() };
        }
    }

    if (fitnessGoals) updateFields.fitnessGoals = fitnessGoals;

    if (dateCaloriesMap) {
        updateFields.dateCaloriesMap = dateCaloriesMap; // Update dateCaloriesMap
    }

    try {
        // First update the user information
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // If there is a new BMI to record, push it into the bmiHistory array
        if (bmiHistoryUpdate) {
            updatedUser.bmiHistory.push(bmiHistoryUpdate);
            await updatedUser.save(); // Save the updated user document
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// New Endpoint for Uploading Profile Image
app.patch('/api/user/:id/uploadImage', async (req, res) => {
    const userId = req.params.id;
    const { profileImage } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { profileImage } },
            { new: true, runValidators: true }
        );
        if (!updatedUser)
            return res.status(404).json({ error: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ error: 'Failed to update profile image' });
    }
});

// Use the error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
