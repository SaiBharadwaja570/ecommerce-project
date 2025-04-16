exports.createOrder = async (req, res) => {
    try {
      const { products, shippingAddress, totalAmount } = req.body;
      const user = req.user.id; // Assuming you have user info in the request after authentication
  
      const order = new Order({
        user,
        products: products.map(item => ({
          product: item.productId, // Assuming frontend sends productId
          name: item.name,
          price: item.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        })),
        shippingAddress,
        totalAmount,
      });
  
      const newOrder = await order.save();
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };