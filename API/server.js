const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const timerRoutes = require('./routes/timer');
const proRoutes = require('./routes/productivity');
const history = require('./routes/sessions');
const suggest = require('./routes/suggestions');
const focusRoutes = require('./routes/focus');
const goalRoutes = require('./routes/goals');

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/focusflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/timer', timerRoutes);
app.use('/api/productivity', proRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/session', history);
app.use('/api/breaks', suggest);
app.use('/api/focus', focusRoutes);

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));