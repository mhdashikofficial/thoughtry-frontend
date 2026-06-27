const express = require('express');
const router = express.Router();
const Revenue = require('../models/Revenue');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// @route   GET /api/revenue
// @desc    Get user's revenue stats
router.get('/', protect, async (req, res) => {
  try {
    const revenues = await Revenue.find({ user: req.user.id }).sort('-month');
    const user = await User.findById(req.user.id).select('balance');
    res.json({ currentBalance: user.balance, history: revenues });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
