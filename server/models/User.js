// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { 
    type: String,
    unique: true,
    sparse: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'rider'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);