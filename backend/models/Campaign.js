const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: String,
    description: String,
    budget: Number,
    startDate: Date,
    endDate: Date,
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }, { timestamps: true }); // ⬅️ This adds createdAt & updatedAt
  

module.exports = mongoose.model('Campaign', campaignSchema);