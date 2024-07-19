const express = require('express');
const router = express.Router();
const Item = require('./models/Item');

// Create a new item
router.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read all items
router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read one item
router.get('/items/:id', getItem, (req, res) => {
  res.json(res.item);
});

// Update an item
router.put('/items/:id', getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.quantity != null) {
    res.item.quantity = req.body.quantity;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/items/:id', getItem, async (req, res) => {
  try {
    await res.item.remove();
    res.json({ message: 'Deleted Item' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get an item by ID
async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: 'Cannot find item' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.item = item;
  next();
}

module.exports = router;
