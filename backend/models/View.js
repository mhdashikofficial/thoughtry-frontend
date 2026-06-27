const mongoose = require('mongoose');

const ViewSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  country: {
    type: String, // ISO country code
  },
}, { timestamps: true });

// Prevent multiple views from same IP per blog per 24 hours could be implemented,
// but for simplicity we'll just record every view or do simple throttling at the route level.

module.exports = mongoose.model('View', ViewSchema);
