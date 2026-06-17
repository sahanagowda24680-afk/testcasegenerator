const scraperService = require('../services/scraperService');
const claudeService = require('../services/claudeService');

exports.generateTestCases = async (req, res) => {
  console.log('🔵 generateTestCases called with:', req.body);
  try {
    const { url, testType } = req.body;

    // Validation
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Step 1: Analyze the website
    console.log('📋 Step 1: Analyzing website...');
    const websiteAnalysis = await scraperService.analyzeWebsite(url);
    console.log('✅ Website analyzed:', websiteAnalysis);

    // Step 2: Generate test cases with Claude
    console.log('🤖 Step 2: Generating test cases with Claude...');
    const testCases = await claudeService.generateTestCases(websiteAnalysis, testType);
    console.log('✅ Test cases generated:', testCases);

    // Return results
    res.json({
      success: true,
      url,
      website_analysis: websiteAnalysis,
      test_cases: testCases,
      generated_at: new Date()
    });

  } catch (error) {
    console.error('🔴 Controller Error:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to generate test cases',
      timestamp: new Date()
    });
  }
};