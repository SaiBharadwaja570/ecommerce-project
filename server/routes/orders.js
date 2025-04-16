// server/routes/orders.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// User routes
router.post('/', protect, orderController.createOrder);
router.get('/myorders', protect, orderController.getMyOrders);
router.get('/:id', protect, orderController.getOrderById);

// Admin routes
router.get('/', protect, authorize('admin'), orderController.getOrders);
router.put('/:id/status', protect, authorize('admin'), orderController.updateOrderStatus);

module.exports = router;