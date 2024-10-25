const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const verifyToken = require('./verifyToken');


// GET /api/breaks/suggestions
router.get('/suggestions', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Fetch past work sessions for the user
        const sessions = await Session.find({ user: userId, sessionType: 'work' });

        if (sessions.length === 0) {
            return res.status(404).json({ message: 'No work sessions found for the user.' });
        }

        // Analyze work pattern and suggest breaks
        const suggestions = analyzeWorkPattern(sessions);

        // Response
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching break suggestions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Function to analyze work pattern and suggest breaks
const analyzeWorkPattern = (sessions) => {
    const suggestions = [];

    // Iterate through sessions and create suggestions based on work duration
    sessions.forEach(session => {
        const workDuration = session.duration; // duration is in minutes

        // Suggest a break based on work duration
        if (workDuration >= 60) {
            suggestions.push({
                suggestedBreakDuration: 15, // Suggest a 15-minute break after 60 minutes of work
                suggestedActivity: 'Take a walk or stretch to recharge.'
            });
        } else if (workDuration >= 30) {
            suggestions.push({
                suggestedBreakDuration: 10, // Suggest a 10-minute break after 30 minutes of work
                suggestedActivity: 'Grab a drink and relax for a bit.'
            });
        }
    });

    // Return unique suggestions to avoid duplicates
    return Array.from(new Set(suggestions.map(JSON.stringify))).map(JSON.parse);
};

module.exports = router;