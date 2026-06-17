// Demo Mode - Returns filtered test cases based on test type
exports.generateTestCases = async (websiteAnalysis, testType) => {
  console.log('🤖 [DEMO MODE] Generating test cases for type:', testType);
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  const allTestCases = [
    {
      id: 'TC_001',
      title: 'Verify page load',
      type: 'Functional',
      priority: 'High',
      steps: ['Navigate to URL', 'Wait for page to load', 'Verify all elements visible'],
      expected_result: 'Page loads successfully within 3 seconds'
    },
    {
      id: 'TC_002',
      title: 'Test form validation',
      type: 'Functional',
      priority: 'High',
      steps: ['Locate form fields', 'Enter invalid data', 'Submit form'],
      expected_result: 'Error messages displayed for invalid fields'
    },
    {
      id: 'TC_003',
      title: 'Verify responsive design',
      type: 'Compatibility',
      priority: 'Medium',
      steps: ['Open in different devices', 'Check layout at different screen sizes'],
      expected_result: 'Layout adapts properly to all screen sizes'
    },
    {
      id: 'TC_004',
      title: 'Test button functionality',
      type: 'Functional',
      priority: 'High',
      steps: ['Click submit button', 'Verify form submission'],
      expected_result: 'Form submitted successfully'
    },
    {
      id: 'TC_005',
      title: 'Cross-browser testing',
      type: 'Compatibility',
      priority: 'Medium',
      steps: ['Test in Chrome', 'Test in Firefox', 'Test in Safari'],
      expected_result: 'App works consistently across all browsers'
    },
    {
      id: 'TC_006',
      title: 'Performance testing',
      type: 'Performance',
      priority: 'Medium',
      steps: ['Load page', 'Measure load time', 'Check resource usage'],
      expected_result: 'Page loads in under 3 seconds'
    },
    {
      id: 'TC_007',
      title: 'Security - Input validation',
      type: 'Security',
      priority: 'Critical',
      steps: ['Attempt SQL injection', 'Attempt XSS attack', 'Test with special characters'],
      expected_result: 'All malicious inputs are sanitized'
    },
    {
      id: 'TC_008',
      title: 'Navigation testing',
      type: 'Functional',
      priority: 'High',
      steps: ['Click all navigation links', 'Verify page transitions'],
      expected_result: 'All links work and navigate correctly'
    },
    {
      id: 'TC_009',
      title: 'Accessibility testing',
      type: 'Accessibility',
      priority: 'Medium',
      steps: ['Test keyboard navigation', 'Test screen reader compatibility'],
      expected_result: 'App is fully accessible'
    },
    {
      id: 'TC_010',
      title: 'Error handling',
      type: 'Functional',
      priority: 'High',
      steps: ['Trigger network error', 'Check error display', 'Verify recovery'],
      expected_result: 'Graceful error handling with user-friendly messages'
    }
  ];

  // Filter by test type
  let filteredCases = allTestCases;
  if (testType && testType !== 'All Test Types') {
    filteredCases = allTestCases.filter(tc => tc.type === testType);
  }

  console.log(`✅ [DEMO MODE] Filtered to ${filteredCases.length} test cases for type: ${testType}`);
  return filteredCases;
};