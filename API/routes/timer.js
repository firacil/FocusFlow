const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const User = require('../models/user');

// POST /api/timer/start
router.post('/start', async (req, res) => {
  const { sessionType, duration, userId } = req.body;

  // Validate request body
  if (!sessionType || !duration || !userId) {
    return res.status(400).json({ message: 'sessionType, duration, and userId are required' });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new session associated with the user
    const session = new Session({
      sessionType,
      duration,
      user: user._id,  // Associate session with the user
    });

    // Save session to the database
    const savedSession = await session.save();

    // Respond with session details
    res.status(201).json({
      sessionId: savedSession._id,
      startTime: savedSession.startTime.toISOString(),
      status: savedSession.status,
      userId: savedSession.user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


// POST /api/timer/stop
router.post('/stop', async (req, res) => {
    const { sessionId } = req.body;
  
    // Validate request body
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
    }
  
    try {
      // Find the session by ID
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      // Check if the session is already stopped
      if (session.status === 'stopped') {
        return res.status(400).json({ message: 'Session is already stopped' });
      }
  
      // Update session status and end time
      session.status = 'stopped';
      session.endTime = new Date(); // Set the end time to now
  
      // Save the updated session
      const updatedSession = await session.save();
  
      // Respond with session details
      res.status(200).json({
        sessionId: updatedSession._id,
        status: updatedSession.status,
        endTime: updatedSession.endTime.toISOString(),
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
  // POST /api/timer/pause
router.post('/pause', async (req, res) => {
    const { sessionId } = req.body;
  
    // Validate request body
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
    }
  
    try {
      // Find the session by ID
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      // Check if the session is already paused
      if (session.status === 'paused') {
        return res.status(400).json({ message: 'Session is already paused' });
      }
  
      // Update session status to paused
      session.status = 'paused';
  
      // Save the updated session
      const updatedSession = await session.save();
  
      // Respond with session details
      res.status(200).json({
        sessionId: updatedSession._id,
        status: updatedSession.status,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });

  // POST /api/timer/resume
router.post('/resume', async (req, res) => {
    const { sessionId } = req.body;
  
    // Validate request body
    if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
    }
  
    try {
      // Find the session by ID
      const session = await Session.findById(sessionId);
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      // Check if the session is not paused
      if (session.status !== 'paused') {
        return res.status(400).json({ message: 'Session is not paused' });
      }
  
      // Update session status to resumed
      session.status = 'resumed';
  
      // Save the updated session
      const updatedSession = await session.save();
  
      // Respond with session details
      res.status(200).json({
        sessionId: updatedSession._id,
        status: updatedSession.status,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  });
  
module.exports = router;