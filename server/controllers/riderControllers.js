// server/controllers/riderController.js
const Order = require('../models/Order');

// Get orders assigned to rider
exports.getRiderOrders = async (req, res) => {
  try {
    const orders = await Order.find({ rider: req.user._id })
      .populate('user', 'name email')
      .populate('products.product', 'name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status by rider
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order is assigned to this rider
    if (order.rider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    // Riders can only update to certain statuses
    const allowedStatuses = ['Shipped', 'Delivered'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Rider can only update to Shipped or Delivered status' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};