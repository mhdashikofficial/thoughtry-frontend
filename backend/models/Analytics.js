const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  // In a full production app, we would track by country code, but for now we'll just track total views per day per author
});

// Compound index to quickly find a specific author's analytics for a specific date
AnalyticsSchema.index({ author: 1, date: 1, blog: 1 }, { unique: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
