const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Import Nodemailer
require('dotenv').config();

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
        height: Number,
        weight: Number,
        age: Number,
        gender: String,
        bmi: String,
        bmiHistory: { type: Map, of: Number },
    },
    fitnessGoals: {
        primaryGoals: [String],
        targetWeight: Number,
        targetTimeframe: String,
    },
    signupDate: { type: Date, default: Date.now },
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }
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
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update User Information (PATCH)
app.patch('/api/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const { username, email, personalInfo, fitnessGoals } = req.body;

        const updateFields = {};

        if (username) updateFields.username = username;
        if (email) updateFields.email = email;

        if (personalInfo) {
            const { height, weight, age, gender } = personalInfo;
            const calculatedBMI =
                height && weight
                    ? (weight / (height / 100) ** 2).toFixed(2)
                    : personalInfo.bmi;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Ensure both dates are valid
            const today = new Date();
            const signupDate = new Date(user.signupDate);
            const timeDiff = today.getTime() - signupDate.getTime(); // Time difference in ms
            const dayCount = Math.floor(timeDiff / (1000 * 3600 * 24)) + 1; // Calculate the number of days

            let bmiHistory = user.personalInfo.bmiHistory || {}; // Ensure bmiHistory is an object
            bmiHistory[`day${dayCount}`] = calculatedBMI; // Update the history

            updateFields.personalInfo = {
                height,
                weight,
                age,
                gender,
                bmi: calculatedBMI,
                bmiHistory: bmiHistory,
            };
        }

        if (fitnessGoals) {
            updateFields.fitnessGoals = fitnessGoals;
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

// New Endpoint for Uploading Profile Image
app.patch('/api/user/:id/uploadImage', async (req, res) => {
    try {
        const userId = req.params.id;
        const { profileImage } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { profileImage } },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating profile image:', error);
        res.status(500).json({ error: 'Failed to update profile image' });
    }
});

// Fetch BMI History (GET)
app.get('/api/user/:id/bmi-history', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const bmiHistory = user.personalInfo.bmiHistory || {};
        const historyArray = Object.entries(bmiHistory).map(([key, value]) => ({
            date: key,
            bmi: value,
        }));

        res.status(200).json(historyArray);
    } catch (error) {
        console.error('Error fetching BMI history:', error);
        res.status(500).json({ error: 'Failed to fetch BMI history' });
    }
});

// New Endpoint for Sending Messages
app.post('/api/send-message', async (req, res) => {
    const { message, userEmail } = req.body; // Expecting message and userEmail in the request body

    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // Your email password or app password
        },
    });

    const mailOptions = {
        from: userEmail, // Sender's email
        to: process.env.TRAINER_EMAIL, // Trainer's email
        subject: 'New Consultation Message',
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
