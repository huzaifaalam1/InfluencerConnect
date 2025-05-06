const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  influencerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  email: String,
  dob: Date,
  height: String,
  bodyType: String,
  experience: String,
  cvLink: String,
  createdAt: { type: Date, default: Date.now }
});

// ✅ Ensure one application per influencer per campaign
applicationSchema.index({ campaignId: 1, influencerId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
