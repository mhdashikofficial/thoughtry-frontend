const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

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

// @route   POST /api/blog
// @desc    Create a blog post
router.post('/', protect, async (req, res) => {
  const { title, content } = req.body;
  try {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const blog = await Blog.create({
      title,
      slug,
      content,
      author: req.user.id
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog
// @desc    Get all blogs for logged in user (Dashboard)
router.get('/', protect, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort('-createdAt');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/user/:subdomain
// @desc    Get all blogs for a specific subdomain (Public)
router.get('/user/:subdomain', async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findOne({ subdomain: req.params.subdomain });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const blogs = await Blog.find({ author: user._id }).sort('-createdAt');
    res.json({ user: { username: user.username, subdomain: user.subdomain }, blogs });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/blog/:slug
// @desc    Get single blog post (Public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'username subdomain');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    // Increment view count
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete a blog post
router.delete('/:id', protect, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    await blog.deleteOne();
    res.json({ message: 'Blog removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/blog/upload
// @desc    Upload an image
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Use the infoqio.sbs domain to serve the static file
  const imageUrl = `http://infoqio.sbs:5000/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;
