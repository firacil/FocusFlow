const express = require('express');
const router = express.Router();
const Session = require('../models/session');
const User = require('../models/user');
const verifyToken = require('./verifyToken');

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

    // Check for existing session for the user
    const existingSession = await Session.findOne({ user: user._id, status: 'started' });

    if (existingSession) {
      // Respond with a message indicating the timer is already started
      return res.status(409).json({ message: 'Timer already started, click stop to stop the timer.' });
    } else {
      // Create a new session if none exists
      const session = new Session({
        sessionType,
        duration,
        user: user._id,  // Associate session with the user
        startTime: new Date(), // Set start time
        status: 'started', // Set status to started
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
    }
  } catch (error) {
    console.error('Error starting session:', error);  // Log the error for debugging
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
  
// GET /api/timer/current
router.get('/current', async (req, res) => {
  // Check for the authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  // Extract the token (assuming Bearer token format)
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token (Assuming you have a method to verify the JWT)
    const decoded = verifyToken(token); // Implement this function based on your auth method
    const userId = decoded.userId; // Extract user ID or relevant information

    // Find the currently running session for the user
    const currentSession = await Session.findOne({ user: userId, status: 'started' });
    console.log('Current Session:', currentSession);

    if (!currentSession) {
      return res.status(404).json({ message: 'No active session found' });
    }

    // Calculate remaining time (Assuming you have a method to calculate remaining time)
    const durationInMilliseconds = currentSession.duration * 60 * 1000; // Convert duration from minutes to milliseconds
    const remainingTime = calculateRemainingTime(currentSession.startTime, durationInMilliseconds);

    // Respond with session details
    res.status(200).json({
      sessionId: currentSession._id,
      sessionType: currentSession.sessionType, // Assuming sessionType is a property in your session model
      remainingTime,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Helper function to calculate remaining time
const calculateRemainingTime = (startTime, duration) => {
  const elapsedTime = Date.now() - new Date(startTime).getTime();
  const remainingTime = Math.max(0, duration - elapsedTime); // Ensure non-negative time

  console.log('Start Time:', startTime);
  console.log('Duration (ms):', duration);
  console.log('Elapsed Time (ms):', elapsedTime);
  console.log('Remaining Time (ms):', remainingTime);
  return Math.floor(remainingTime / (1000 * 60)); // Convert to seconds
};

module.exports = router;