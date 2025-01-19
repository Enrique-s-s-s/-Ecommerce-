const express = require('express');
const Product = require('./../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({products});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
