const express = require('express');
const router = express.Router();
const Sale = require('../models/sale');

router.post('/sales', async (req, res) => {
  try {
    const { itemSold, quantity, price } = req.body;

    // Calculate the total revenue for the transaction
    const totalRevenue = quantity * price;

    const newSale = new Sale({
      itemSold,
      quantity,
      price,
      totalRevenue,
    });

    await newSale.save();

    res.status(201).json(newSale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/sales', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
