const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/inventoryItem');

router.post('/items', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const newItem = new InventoryItem({
      name,
      quantity,
      price,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/items/:id', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    const { id } = req.params;
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      id,
      { name, quantity, price },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await InventoryItem.findByIdAndDelete(id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
