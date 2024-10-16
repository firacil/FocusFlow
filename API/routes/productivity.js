const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const jwt = require('jsonwebtoken');

// Function to verify JWT
const verifyToken = (token) => {
  const secretKey = 'firacil'; // Replace with your actual secret key
  return jwt.verify(token, secretKey);
};

// GET /api/productivity/daily
router.get('/daily', async (req, res) => {
  // Check for the authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  // Extract the token (assuming Bearer token format)
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and extract user ID
    const decoded = verifyToken(token);
    const userId = decoded.userId; // Extract user ID from the token

    // Get the current date
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Start of the day (midnight)

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // End of the day (one millisecond before midnight)

    // Fetch all sessions for the user for the current day
    const sessions = await Session.find({
      user: userId,
      startTime: { $gte: startOfDay, $lte: endOfDay },
    });

    // Calculate total work time
    let totalWorkTime = 0; // in minutes
    let totalBreakTime = 0; // in minutes

    sessions.forEach(session => {
      if (session.status === 'started') {
        totalWorkTime += session.duration; // Assuming session.duration is in minutes
      }
    });

    // Calculate breaks based on work time
    const breakDuration = 15; // Break duration in minutes
    const breakInterval = 120; // Work duration after which to take a break in minutes (2 hours)
    
    // Calculate total breaks: 1 break every 2 hours (120 minutes) of work time
    const breakCount = Math.floor(totalWorkTime / breakInterval);
    totalBreakTime = breakCount * breakDuration;

    // Total productive time achieved (work time minus breaks)
    const productiveTime = totalWorkTime - totalBreakTime;

    // Respond with daily productivity stats
    res.status(200).json({
      date: new Date().toISOString().split('T')[0], // Current date in ISO format (YYYY-MM-DD)
      totalWorkTime,
      totalBreakTime,
      productiveTime, // Total productive time achieved
    });
  } catch (error) {
    console.error('Error fetching daily productivity:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;