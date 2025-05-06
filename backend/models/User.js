// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['influencer', 'company'], required: true },
  // 🔽 Profile-related fields (optional)
  name: { type: String },
  bio: { type: String },
  interests: { type: String },
  profilePicture: { type: String },
  additionalImages: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
