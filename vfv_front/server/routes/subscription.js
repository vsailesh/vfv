const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get subscription status
router.get('/status', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({
      subscription: user.subscription,
      endDate: user.subscriptionEndDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update subscription
router.post('/update', auth, async (req, res) => {
  try {
    const { subscriptionType, duration } = req.body;
    
    const user = await User.findById(req.user.userId);
    user.subscription = subscriptionType;
    user.subscriptionEndDate = new Date(
      Date.now() + duration * 24 * 60 * 60 * 1000
    );
    
    await user.save();
    
    res.json({
      subscription: user.subscription,
      endDate: user.subscriptionEndDate
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 