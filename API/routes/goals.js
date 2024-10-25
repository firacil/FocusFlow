const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyToken = require('./verifyToken');
const Goal = require('../models/goals');


// POST /api/goals/create
router.post('/create', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);  // Verify JWT token
        const userId = decoded.userId;       // Extract user ID from token

        const { goalType, targetHours } = req.body;
        if (!goalType || !targetHours) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        // Create new goal
        const newGoal = new Goal({
            goalType,
            targetHours,
            userId
        });
        await newGoal.save();

        // Add goal to user's goals list
        const user = await User.findById(userId);
        user.goals.push(newGoal._id);
        await user.save();

        res.status(201).json({ goalId: newGoal._id, status: 'created', userId });
    } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Fetch goals for the user
        const user = await User.findById(userId).populate('goals');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.goals);
    } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/:goalId', async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    const token = authHeader.split(' ')[1];
    const { goalId } = req.params;

    try {
        const decoded = verifyToken(token);
        const userId = decoded.userId;

        // Find and delete the goal
        const goal = await Goal.findOneAndDelete({ _id: goalId, userId });
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        // Remove goal reference from user's goals
        const user = await User.findById(userId);
        user.goals.pull(goalId);
        await user.save();

        res.status(200).json({ status: 'deleted' });
    } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;