const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const rolesMiddleware = require('../middleware/roles'); // Assuming you have roles middleware

router.get('/orders', authMiddleware, rolesMiddleware(['admin']), adminController.getAllOrders);
router.patch('/orders/:id', authMiddleware, rolesMiddleware(['admin']), adminController.updateOrderStatus);

module.exports = router;