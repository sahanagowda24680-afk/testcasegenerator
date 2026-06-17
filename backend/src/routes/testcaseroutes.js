const express = require('express');
const router = express.Router();
const { generateTestCases } = require('../services/claudeService');

router.post('/generate-test-cases', async (req, res) => {
  try {
    const { websiteAnalysis, testType } = req.body;
    const testCases = await generateTestCases(websiteAnalysis, testType);
    res.json({ success: true, testCases });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;