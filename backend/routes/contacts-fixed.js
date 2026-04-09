const express = require('express');
const router = express.Router();

const auth = require('./auth');

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
router.get('/', auth.authenticateAdmin, async (req, res) => {
  try {
    const Contact = require('../models/Contact');
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH mark resolved (admin)
router.patch('/:id/resolve', auth.authenticateAdmin, async (req, res) => {
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

module.exports = router;
