const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Import test case service
const { generateTestCases } = require('./services/claudeService');

// API Routes
app.post('/api/generate-test-cases', async (req, res) => {
  try {
    const { websiteAnalysis, testType } = req.body;
    console.log('📝 Generating test cases for:', testType);
    
    const testCases = await generateTestCases(websiteAnalysis, testType);
    
    res.json({
      success: true,
      testCases: testCases,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate test cases',
      timestamp: new Date()
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    timestamp: new Date()
  });
});

// Error handler (must be last)
app.use((err, req, res, next) => {
  console.error('🔴 Error:', err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🤖 API Endpoint: http://localhost:${PORT}/api/generate-test-cases`);
});

module.exports = app;