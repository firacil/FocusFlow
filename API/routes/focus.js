const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Assuming you have a User model
const verifyToken = require('./verifyToken');

// POST /api/focus/enable
router.post('/enable', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Find the user and enable focus mode
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Enable focus mode (assuming you have a field called focusMode)
        user.focusMode = true; // Set focus mode to true
        await user.save(); // Save changes to the database

        // Respond with success status
        res.status(200).json({ status: 'Focus mode enabled' });
    } catch (error) {
        console.error('Error enabling focus mode:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/focus/disable
router.post('/disable', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Find the user and disable focus mode
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Disable focus mode
        user.focusMode = false; // Set focus mode to false
        await user.save(); // Save changes to the database

        // Respond with success status
        res.status(200).json({ status: 'Focus mode disabled' });
    } catch (error) {
        console.error('Error disabling focus mode:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;