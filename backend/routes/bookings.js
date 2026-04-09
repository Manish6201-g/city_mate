const express = require('express');
const jwt = require('jsonwebtoken');
// Memory-only storage (MongoDB disabled)
let bookings = [];
const router = express.Router();

// Middleware to verify admin JWT
const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// GET all bookings
router.get('/', authenticateAdmin, (req, res) => {
  try {
    const { status } = req.query;
    let filtered = bookings;
    if (status) filtered = filtered.filter(b => b.status === status);
    filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH update status
router.patch('/:id', authenticateAdmin, (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const index = bookings.findIndex(b => b._id.toString() === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Booking not found' });
    bookings[index].status = status;
    res.json(bookings[index]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new booking (from frontend)
router.post('/', (req, res) => {
  try {
    const booking = {
      _id: 'B' + Date.now(),
      ...req.body,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    bookings.unshift(booking);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

