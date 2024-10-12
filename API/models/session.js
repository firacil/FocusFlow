const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new mongoose.Schema({
  sessionType: {
    type: String,
    required: true,
    enum: ['work', 'break'],
  },
  duration: {
    type: Number,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'started',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',  // Reference the User model
    required: true,
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;