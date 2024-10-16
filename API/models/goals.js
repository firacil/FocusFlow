const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
    goalType: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    targetHours: { type: Number, required: true },
    progress: { type: Number, default: 0 },  // Track user's progress
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Link to the user
});

module.exports = mongoose.model('Goal', GoalSchema);