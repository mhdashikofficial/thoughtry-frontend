const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const svgCaptcha = require('svg-captcha');
const sendEmail = require('../utils/sendEmail');

// Helper to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   GET /api/auth/captcha
// @desc    Generate simple custom captcha
router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    size: 5,
    noise: 2,
    color: true,
  });
  
  // Encrypt the correct answer in a short-lived JWT (5 mins)
  const captchaToken = jwt.sign({ text: captcha.text }, process.env.JWT_SECRET, { expiresIn: '5m' });
  
  res.json({
    svg: captcha.data,
    captchaToken
  });
});

// @route   POST /api/auth/register
// @desc    Register a new blogger
router.post('/register', async (req, res) => {
  const { username, email, password, subdomain, captchaText, captchaToken } = req.body;
  
  try {
    // 1. Validate Captcha
    if (!captchaText || !captchaToken) {
      return res.status(400).json({ message: 'Captcha required' });
    }
    try {
      const decodedCaptcha = jwt.verify(captchaToken, process.env.JWT_SECRET);
      if (decodedCaptcha.text.toLowerCase() !== captchaText.toLowerCase()) {
        return res.status(400).json({ message: 'Invalid captcha' });
      }
    } catch (err) {
      return res.status(400).json({ message: 'Captcha expired or invalid' });
    }

    // 2. Check if user or subdomain exists
    let userExists = await User.findOne({ $or: [{ email }, { username }, { subdomain }] });
    if (userExists) {
      return res.status(400).json({ message: 'User, email, or subdomain already exists' });
    }

    // 3. Create Verification Code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code

    // 4. Create User
    const user = await User.create({
      username,
      email,
      password,
      subdomain,
      verificationCode
    });

    // 5. Send Verification Email
    const message = `Welcome to Thoughtry! Your email verification code is: ${verificationCode}`;
    await sendEmail({
      email: user.email,
      subject: 'Thoughtry - Verify Your Email',
      message
    });

    res.status(201).json({ message: 'User registered. Please check your email for the verification code.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/verify
// @desc    Verify email
router.post('/verify', async (req, res) => {
  const { email, code } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });
    
    if (user.verificationCode !== code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      subdomain: user.subdomain,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/login
// @desc    Auth user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
         return res.status(401).json({ message: 'Please verify your email first' });
      }
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        subdomain: user.subdomain,
        balance: user.balance,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
