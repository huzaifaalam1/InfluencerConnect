const express = require('express');
const Campaign = require('../models/Campaign');
const Application = require('../models/Application'); 

const router = express.Router();

// ✅ Create new campaign (Company Only)
router.post('/', async (req, res) => {
  if (!req.session.userId || req.session.role !== 'company') {
    return res.status(403).send('Unauthorized');
  }

  const { title, description, budget, startDate, endDate } = req.body;

  if (!title || !description || !budget || !startDate || !endDate) {
    return res.status(400).send('All fields are required');
  }

  if (budget <= 0) {
    return res.status(400).send('Budget must be greater than 0');
  }

  if (new Date(startDate) > new Date(endDate)) {
    return res.status(400).send('Start date cannot be after end date');
  }

  try {
    const campaign = new Campaign({
      title,
      description,
      budget,
      startDate,
      endDate,
      companyId: req.session.userId
    });
    await campaign.save();
    res.status(201).send('Campaign created');
  } catch (err) {
    res.status(500).send('Error saving campaign');
  }
});

// ✅ Get all campaigns for the logged-in company
router.get('/mine', async (req, res) => {
  if (!req.session.userId || req.session.role !== 'company') {
    return res.status(403).send('Unauthorized');
  }

  try {
    const campaigns = await Campaign.find({ companyId: req.session.userId }).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).send('Error fetching campaigns');
  }
});

// ✅ Get all campaigns (for influencers)
router.get('/all', async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).send('Error fetching campaigns');
  }
});

// ✅ Public access to single campaign (for influencers)
router.get('/public/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send('Campaign not found');
    res.json(campaign);
  } catch (err) {
    res.status(500).send('Error fetching campaign');
  }
});

// ✅ Get single campaign details (Company Only)
router.get('/:id', async (req, res) => {
  if (!req.session.userId || req.session.role !== 'company') {
    return res.status(403).send('Unauthorized');
  }

  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send('Campaign not found');

    if (campaign.companyId.toString() !== req.session.userId) {
      return res.status(403).send('Not your campaign');
    }

    res.json(campaign);
  } catch (err) {
    res.status(500).send('Error fetching campaign');
  }
});

// ✅ Delete a campaign
router.delete('/:id', async (req, res) => {
  if (!req.session.userId || req.session.role !== 'company') {
    return res.status(403).send('Unauthorized');
  }

  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send('Not found');

    if (campaign.companyId.toString() !== req.session.userId) {
      return res.status(403).send('Not your campaign');
    }

    await Campaign.findByIdAndDelete(req.params.id);
    res.send('Campaign deleted');
  } catch (err) {
    res.status(500).send('Error deleting campaign');
  }
});

// ✅ Get all applicants for a campaign (Company Only)
router.get('/:id/applicants', async (req, res) => {
  if (!req.session.userId || req.session.role !== 'company') {
    return res.status(403).send('Unauthorized');
  }

  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).send('Campaign not found');

    if (campaign.companyId.toString() !== req.session.userId) {
      return res.status(403).send('Not your campaign');
    }

    const applicants = await Application.find({ campaignId: req.params.id });
    res.json(applicants);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching applicants');
  }
});

module.exports = router;
