const express = require('express');
const User = require('./../models/user');

const { protect } = require('../middlewire/Authorization');

const router = express.Router();

router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Profile data', user:req.user });
});

router.post('/payment', protect, async (req, res) => {
  try {
    const { cart } = req.body;

    if (!Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty or invalid.' });
    }

    const products = cart.map((item) => ({
      productId: item._id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      totalAmount: parseInt(item.totalPrice), 
    }));

    const totalAmount = products.reduce((sum, product) => sum + product.totalAmount, 0);

    const newPayment = {
      products,
      totalAmount,
    };

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.payments.push(newPayment); 
    await user.save(); 

    res.status(200).json({ message: 'Payment added successfully.', payment: newPayment });
  } catch (error) {
    console.error('Error adding payment:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;