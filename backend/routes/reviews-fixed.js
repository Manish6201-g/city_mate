const express = require('express');
const router = express.Router();

const auth = require('./auth');

// POST public review
router.post('/', async (req, res) => {
  try {
    const Review = require('../models/Review');
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all reviews (admin)
router.get('/', auth.authenticateAdmin, async (req, res) => {
  try {
    const Review = require('../models/Review');
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE review (admin)
router.delete('/:id', auth.authenticateAdmin, async (req, res) => {
  try {
    const Review = require('../models/Review');
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
