const express = require('express');
const router = express.Router();

// POST public contact
router.post('/', async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all contacts (admin)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH mark resolved (admin)
router.patch('/:id/resolve', authenticateAdmin, async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const auth = require('./auth');
const authenticateAdmin = auth.authenticateAdmin;

module.exports = router;

