const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
  subdomain: {
    type: String,
    unique: true,
    sparse: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  theme: {
    primaryColor: { type: String, default: '#b938e5' },
    backgroundColor: { type: String, default: '#0a0a0a' },
    textColor: { type: String, default: '#f3f4f6' },
    textMuted: { type: String, default: '#9ca3af' },
    fontFamily: { type: String, default: 'Inter' },
    bio: { type: String, default: 'Welcome to my Thoughtry! I write about technology, life, and everything in between.' },
    navbarLinks: [{
      label: { type: String },
      url: { type: String }
    }],
    socialLinks: {
      twitter: { type: String, default: '' },
      portfolio: { type: String, default: '' }
    }
  }
}, { timestamps: true });

UserSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
