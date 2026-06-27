const mongoose = require('mongoose');

const RevenueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: String, // format YYYY-MM
    required: true,
  },
  grossRevenue: {
    type: Number,
    default: 0,
  },
  writerEarnings: {
    type: Number, // 70% of gross
    default: 0,
  },
  platformFee: {
    type: Number, // 30% of gross
    default: 0,
  },
  status: {
    type: String,
    enum: ['pending', 'available', 'withdrawn', 'rolled_over'],
    default: 'pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Revenue', RevenueSchema);
