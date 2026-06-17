import { useState } from 'react';
import axios from 'axios';
import './App.css';

export default function App() {
  const [url, setUrl] = useState('');
  const [testType, setTestType] = useState('All Test Types');
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateTestCases = async () => {
    setError('');
    setTestCases([]);
    setLoading(true);

    try {
      const response = await axios.post('https://testcasegenerator-production-e7ab.up.railway.app/api/generate-test-cases',{
        url,
        testType
      });

      setTestCases(response.data.testCases || []);
    } catch (err) {
      setError(`Error: ${err.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (testCases.length === 0) {
      alert('No test cases to download');
      return;
    }

    const headers = ['ID', 'Title', 'Type', 'Priority', 'Expected Result'];
    const rows = testCases.map(tc => [
      tc.id,
      tc.title,
      tc.type,
      tc.priority,
      tc.expected_result
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-cases-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    if (testCases.length === 0) {
      alert('No test cases to download');
      return;
    }

    const jsonContent = JSON.stringify(testCases, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-cases-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo-section">
          <span className="logo">🤖</span>
          <h1>Test Case Generator AI</h1>
          <p className="subtitle">Powered by Claude AI • Intelligent Test Case Generation</p>
        </div>
      </div>

      <div className="input-section">
        <div className="form-group">
          <label htmlFor="url">Website URL</label>
          <input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="testType">Test Type</label>
          <select
            id="testType"
            value={testType}
            onChange={(e) => setTestType(e.target.value)}
            className="select-field"
          >
            <option>All Test Types</option>
            <option>Functional</option>
            <option>Compatibility</option>
            <option>Performance</option>
            <option>Security</option>
            <option>Accessibility</option>
          </select>
        </div>

        <button
          onClick={handleGenerateTestCases}
          disabled={!url || loading}
          className="generate-btn"
        >
          {loading ? '⏳ Generating...' : '✨ Generate Test Cases'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <span>❌ {error}</span>
        </div>
      )}

      {testCases.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>✅ Test Cases Generated ({testCases.length})</h2>
            <div className="download-buttons">
              <button onClick={downloadCSV} className="download-btn csv-btn">
                📥 Download CSV
              </button>
              <button onClick={downloadJSON} className="download-btn json-btn">
                📥 Download JSON
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Priority</th>
                  <th>Expected Result</th>
                </tr>
              </thead>
              <tbody>
                {testCases.map((tc, index) => (
                  <tr key={index} className={`priority-${tc.priority.toLowerCase()}`}>
                    <td className="id-cell">{tc.id}</td>
                    <td>{tc.title}</td>
                    <td><span className={`type-badge ${tc.type.toLowerCase()}`}>{tc.type}</span></td>
                    <td><span className={`priority-badge ${tc.priority.toLowerCase()}`}>{tc.priority}</span></td>
                    <td>{tc.expected_result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="metadata">
            <span>📅 Generated at: {new Date().toLocaleString()}</span>
            <span>🔗 URL: {url}</span>
          </div>
        </div>
      )}
    </div>
  );
}