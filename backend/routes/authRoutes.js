// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();  // <-- THIS LINE WAS MISSING

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User created');
  } catch (err) {
    res.status(400).send('User already exists or invalid data');
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).send('User not found');
  const match = await bcrypt.compare(password, user.password);
  if (!match || user.role !== role) {
    return res.status(401).send('Invalid credentials or incorrect role');
  }

  req.session.userId = user._id;
  req.session.role = user.role;

  res.send({ message: 'Login successful', role: user.role });
});

router.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('Not logged in');
  }

  const user = await User.findById(req.session.userId);

  if (!user) return res.status(404).send('User not found');

  res.json({
    email: user.email,
    role: user.role,
    name: user.name || '',
    bio: user.bio || '',
    interests: user.interests || '',
    profilePicture: user.profilePicture || '',
    additionalImages: user.additionalImages || []
  });
});


// PUT /api/profile - Update user profile
router.put('/profile', async (req, res) => {
  if (!req.session.userId) return res.status(401).send('Unauthorized');

  const updates = {
    name: req.body.name,
    bio: req.body.bio,
    interests: req.body.interests,
    profilePicture: req.body.profilePicture,
    additionalImages: req.body.additionalImages
  };

  try {
    const user = await User.findByIdAndUpdate(req.session.userId, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(500).send('Error updating profile');
  }
});

// POST /api/logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});

module.exports = router;
