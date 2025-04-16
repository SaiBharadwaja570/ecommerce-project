// server/routes/riders.js
const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');
const { protect, authorize } = require('../middleware/auth');

// Rider routes
router.get('/orders', protect, authorize('rider'), riderController.getRiderOrders);
router.put('/orders/:id/status', protect, authorize('rider'), riderController.updateOrderStatus);

module.exports = router;