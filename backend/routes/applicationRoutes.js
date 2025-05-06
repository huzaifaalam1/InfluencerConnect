const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// POST /api/applications/:campaignId
// Submit an application to a campaign
router.post('/:campaignId', async (req, res) => {
  if (!req.session.userId || req.session.role !== 'influencer') {
    return res.status(403).send('Unauthorized');
  }

  const { name, email, dob, height, bodyType, experience, cvLink } = req.body;

  try {
    // ✅ Prevent duplicate application
    const existing = await Application.findOne({
      campaignId: req.params.campaignId,
      influencerId: req.session.userId
    });

    if (existing) {
      return res.status(409).send('Already applied');
    }

    // ✅ Create new application
    const app = new Application({
      campaignId: req.params.campaignId,
      influencerId: req.session.userId,
      name,
      email,
      dob,
      height,
      bodyType,
      experience,
      cvLink
    });

    await app.save();
    res.status(201).send('Application submitted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving application');
  }
});

// GET /api/applications/campaign/:campaignId
router.get('/campaign/:campaignId', async (req, res) => {
    if (!req.session.userId || req.session.role !== 'company') {
      return res.status(403).send('Unauthorized');
    }
  
    try {
      const campaignId = req.params.campaignId;
  
      // Check if the campaign belongs to this company
      const campaign = await Campaign.findById(campaignId);
      if (!campaign || campaign.companyId.toString() !== req.session.userId) {
        return res.status(403).send('Not your campaign');
      }
  
      const applications = await Application.find({ campaignId });
      res.json(applications);
    } catch (err) {
      res.status(500).send('Error fetching applications');
    }
  });
  
module.exports = router;
