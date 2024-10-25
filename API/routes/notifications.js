const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('./verifyToken');

// POST /api/notifications/subscribe
router.post('/subscribe', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        const { subscription } = req.body; // WebPushSubscriptionData
        if (!subscription) {
            return res.status(400).json({ message: 'Invalid subscription data' });
        }

        // Find the user and update their notification settings
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.notifications.subscribed = true;
        user.notifications.subscriptionData = subscription;  // Save the subscription data
        await user.save();

        res.status(200).json({ status: 'subscribed' });
    } catch (error) {
        console.error('Error subscribing to notifications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// POST /api/notifications/unsubscribe
router.post('/unsubscribe', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Find the user and update their notification settings
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.notifications.subscribed = false;
        user.notifications.subscriptionData = null;  // Clear subscription data
        await user.save();

        res.status(200).json({ status: 'unsubscribed' });
    } catch (error) {
        console.error('Error unsubscribing from notifications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// GET /api/notifications/status
router.get('/status', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Find the user and check their notification subscription status
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ subscribed: user.notifications.subscribed });
    } catch (error) {
        console.error('Error checking notification status:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;