const express = require('express');
const router = express.Router();
const Session = require('../models/session'); // Assuming you have a Session model
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');


// GET /api/session/history
router.get('/history', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization token is required' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = verifyToken(token);
      const userId = decoded.userId;
  
      // Fetch past sessions for the user
      const sessions = await Session.find({ user: userId })
        .sort({ startTime: -1 })
        .select('sessionType duration startTime endTime');
  
      // Format the response
      const sessionHistory = sessions.map(session => {
            const startTimeEAT = new Date(session.startTime).toLocaleString("en-US", { timeZone: "Africa/Nairobi" });

        return {
        sessionId: session._id.toString(),
        sessionType: session.sessionType,
        duration: session.duration,
        startTime: startTimeEAT,
        endTime: session.endTime ? session.endTime.toISOString() : null,
      };
    });
  
      // Respond with session history
      res.status(200).json(sessionHistory);
    } catch (error) {
      console.error('Error fetching session history:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });  

module.exports = router;