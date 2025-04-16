exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.updateOrderStatus = async (req, res) => {
    try {
      const { status, rider } = req.body;
      const order = await Order.findByIdAndUpdate(req.params.id, { status, rider }, { new: true });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  