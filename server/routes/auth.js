// server/routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authController.googleAuthCallback
);

// Get user profile
router.get('/profile', protect, authController.getUserProfile);

module.exports = router;