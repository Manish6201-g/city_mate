const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews-fixed');
const contactRoutes = require('./routes/contacts-fixed');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin/bookings', bookingRoutes);
app.use('/api/auth', authRoutes.router);
app.use('/api/admin/reviews', reviewRoutes);
app.use('/api/admin/contacts', contactRoutes);

// Admin stats endpoint
const authMiddleware = require('./routes/auth').authenticateAdmin;

app.get('/api/admin/stats', authMiddleware, async (req, res) => {
  try {
    const Booking = require('./models/Booking');
    const Review = require('./models/Review');
    const Contact = require('./models/Contact');
    const [totalBookings, pendingBookings, acceptedBookings, totalReviews, totalContacts] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ status: 'accepted' }),
      Review.countDocuments(),
      Contact.countDocuments()
    ]);
    res.json({
      totalBookings,
      pendingBookings,
      acceptedBookings,
      totalReviews,
      totalContacts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Basic route
app.get('/', (req, res) => res.send('City Mate Admin API running!'));

// MongoDB disabled for demo - using in-memory
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
console.log('Running in memory-only mode (no MongoDB required)');

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

