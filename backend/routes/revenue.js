const express = require('express');
const router = express.Router();
const Revenue = require('../models/Revenue');
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const POPADS_API_KEY = '69f307b35665f1a2b9955ecd6e64180dc96ed38c';
const THOUGHTRY_REVENUE_SHARE = 0.70;

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

// @route   POST /api/revenue/sync
// @desc    Sync revenue from PopAds and distribute to users based on daily views
router.post('/sync', async (req, res) => {
  try {
    const { date } = req.body; // format: 'YYYY-MM-DD', if not provided, uses yesterday
    
    let targetDate = new Date();
    if (date) {
      targetDate = new Date(date);
    } else {
      // Default to yesterday
      targetDate.setDate(targetDate.getDate() - 1);
    }
    
    const dateStr = targetDate.toISOString().split('T')[0];
    
    // 1. Fetch total revenue from PopAds API
    const popAdsRes = await axios.post(`https://www.popads.net/api/report_publisher?key=${POPADS_API_KEY}`, {
      start: dateStr,
      end: dateStr,
      groups: '' 
    });
    
    if (popAdsRes.data.errors) {
      return res.status(400).json({ message: 'PopAds API Error', errors: popAdsRes.data.errors });
    }
    
    const totalDailyRevenue = popAdsRes.data.result?.revenue || 0;
    
    if (totalDailyRevenue === 0) {
      return res.json({ message: 'No revenue to distribute for this date.', date: dateStr });
    }
    
    const distributableRevenue = totalDailyRevenue * THOUGHTRY_REVENUE_SHARE;
    
    // 2. Fetch all analytics views for the target date
    const queryDate = new Date(targetDate);
    queryDate.setHours(0, 0, 0, 0);
    
    const dailyAnalytics = await Analytics.find({ date: queryDate });
    
    if (dailyAnalytics.length === 0) {
      return res.json({ message: 'Revenue found, but no tracked views to distribute it to.', date: dateStr });
    }
    
    // 3. Calculate total views across platform to determine value per view
    let totalPlatformViews = 0;
    dailyAnalytics.forEach(stat => {
      totalPlatformViews += stat.views;
    });
    
    const revenuePerView = distributableRevenue / totalPlatformViews;
    
    // 4. Distribute to users
    const updates = [];
    for (const stat of dailyAnalytics) {
      const userEarnings = stat.views * revenuePerView;
      updates.push(
        User.findByIdAndUpdate(stat.author, {
          $inc: { balance: userEarnings }
        })
      );
    }
    
    await Promise.all(updates);
    
    res.json({
      message: 'Revenue distributed successfully',
      date: dateStr,
      totalPopAdsRevenue: totalDailyRevenue,
      totalDistributed: distributableRevenue,
      totalPlatformViews,
      revenuePerView
    });
    
  } catch (error) {
    console.error('Revenue sync error:', error.message);
    res.status(500).json({ message: 'Server error during revenue sync' });
  }
});

module.exports = router;
