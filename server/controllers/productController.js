// server/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { 
      products, 
      shippingAddress, 
      totalAmount 
    } = req.body;

    if (products && products.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    // Create order with user ID from authenticated user
    const order = new Order({
      user: req.user._id,
      products: products.map(item => ({
        product: item.productId,
        name: item.name,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
      })),
      shippingAddress,
      totalAmount,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('rider', 'name email');
    
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (Admin only)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name')
      .populate('rider', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, rider } = req.body;

    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status || order.status;
      if (rider) {
        order.rider = rider;
      }
      order.updatedAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};