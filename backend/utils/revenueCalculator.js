const axios = require('axios');
const User = require('../models/User');
const View = require('../models/View');
const Revenue = require('../models/Revenue');
const cron = require('node-cron');

// Approximate points for traffic tiers to calculate proportional distribution
const getTierPoints = (country) => {
  const tier1 = ['US', 'GB', 'CA']; // $4-$6+ => 5 points
  const tier2 = ['FR', 'DE', 'AU', 'IT', 'ES', 'NL']; // $2-$4 => 3 points
  const tier3 = ['IN', 'ID', 'PH', 'MY', 'VN', 'TH']; // $0.20-$2 => 1 point
  // Others: Africa/Tier-3 => 0.2 points

  if (tier1.includes(country)) return 5;
  if (tier2.includes(country)) return 3;
  if (tier3.includes(country)) return 1;
  return 0.2;
};

// This function queries the PopAds API and gets the total revenue balance
const getPopAdsBalance = async () => {
  try {
    // Note: The actual PopAds API endpoint might vary.
    // Replace with correct URL depending on PopAds documentation.
    const response = await axios.get(`https://www.popads.net/api/billing/summary`, {
      params: { key: process.env.POP_ADS_API_KEY }
    });
    
    // Assuming response contains a balance property. 
    // We'd parse this based on exact API spec.
    // For now we simulate reading total balance from the API:
    if(response.data && response.data.balance !== undefined) {
      return parseFloat(response.data.balance);
    }
    return 0; // Fallback
  } catch (err) {
    console.error('Error fetching PopAds balance:', err.message);
    return 0; // Prevent crash, return 0 for now
  }
};

const distributeRevenue = async () => {
  try {
    console.log('Starting monthly revenue distribution...');
    
    // 1. Get total PopAds actual revenue balance for the month
    const totalActualRevenue = await getPopAdsBalance();
    if (totalActualRevenue <= 0) {
      console.log('No revenue to distribute.');
      return;
    }

    // 2. Fetch all views for the current calculation period (e.g., last month)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const views = await View.find({ createdAt: { $gte: lastMonth } });
    
    if (views.length === 0) {
      console.log('No views recorded. Revenue not distributed.');
      return;
    }

    // 3. Calculate points per user
    const userPoints = {};
    let totalSystemPoints = 0;

    views.forEach(view => {
      const points = getTierPoints(view.country);
      const userId = view.author.toString();
      
      if (!userPoints[userId]) userPoints[userId] = 0;
      userPoints[userId] += points;
      totalSystemPoints += points;
    });

    // 4. Distribute actual revenue based on proportion of points
    const currentMonthStr = new Date().toISOString().slice(0, 7); // YYYY-MM
    
    for (const userId in userPoints) {
      const proportion = userPoints[userId] / totalSystemPoints;
      const userGrossRevenue = totalActualRevenue * proportion;
      
      const writerEarnings = userGrossRevenue * 0.70; // 70% to writer
      const platformFee = userGrossRevenue * 0.30;    // 30% to platform

      // Create Revenue Ledger entry
      await Revenue.create({
        user: userId,
        month: currentMonthStr,
        grossRevenue: userGrossRevenue,
        writerEarnings,
        platformFee,
        status: writerEarnings >= 10 ? 'available' : 'rolled_over'
      });

      // Update user's available balance
      const userDoc = await User.findById(userId);
      userDoc.balance += writerEarnings;
      await userDoc.save();
    }

    console.log('Revenue distribution complete.');

  } catch (error) {
    console.error('Revenue calculation failed:', error);
  }
};

// Schedule to run at 00:00 on the 1st of every month
cron.schedule('0 0 1 * *', () => {
  distributeRevenue();
});

module.exports = { distributeRevenue, getPopAdsBalance };
