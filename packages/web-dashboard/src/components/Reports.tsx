import React, { useState } from 'react';

interface Report {
  id: string;
  name: string;
  type: 'html' | 'json' | 'text';
  timestamp: Date;
  size: string;
  status: 'generated' | 'generating' | 'failed';
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: 'Sample Project Analysis',
      type: 'html',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      size: '2.4 MB',
      status: 'generated'
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async (type: 'html' | 'json' | 'text') => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newReport: Report = {
      id: Date.now().toString(),
      name: `Report_${type.toUpperCase()}_${new Date().toISOString().split('T')[0]}`,
      type,
      timestamp: new Date(),
      size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      status: 'generated'
    };
    
    setReports(prev => [newReport, ...prev]);
    setIsGenerating(false);
  };

  const handleDownloadReport = (report: Report) => {
    // Generate actual report content based on type
    let reportContent = '';
    let fileExtension = '';
    let mimeType = '';

    switch (report.type) {
      case 'html':
        reportContent = generateHTMLReport(report);
        fileExtension = 'html';
        mimeType = 'text/html';
        break;
      case 'json':
        reportContent = generateJSONReport(report);
        fileExtension = 'json';
        mimeType = 'application/json';
        break;
      case 'text':
        reportContent = generateTextReport(report);
        fileExtension = 'txt';
        mimeType = 'text/plain';
        break;
      default:
        reportContent = generateTextReport(report);
        fileExtension = 'txt';
        mimeType = 'text/plain';
    }

    // Create and download the report
    const blob = new Blob([reportContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.name}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateHTMLReport = (report: Report): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${report.name} - Code Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2563eb; margin: 0; }
        .metadata { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
        .metadata-item { background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center; }
        .metadata-value { font-size: 24px; font-weight: bold; color: #2563eb; }
        .metadata-label { color: #64748b; margin-top: 5px; }
        .section { margin: 30px 0; }
        .section h2 { color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
        .status-completed { background: #dcfce7; color: #166534; }
        .status-generating { background: #dbeafe; color: #1e40af; }
        .status-failed { background: #fee2e2; color: #991b1b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Code Analyzer Report</h1>
            <p>AI-Powered Code Review & Quality Analysis</p>
        </div>
        
        <div class="metadata">
            <div class="metadata-item">
                <div class="metadata-value">${report.name}</div>
                <div class="metadata-label">Report Name</div>
            </div>
            <div class="metadata-item">
                <div class="metadata-value">${report.type.toUpperCase()}</div>
                <div class="metadata-label">Report Type</div>
            </div>
            <div class="metadata-item">
                <div class="metadata-value">${report.size}</div>
                <div class="metadata-label">File Size</div>
            </div>
            <div class="metadata-item">
                <div class="metadata-value">${report.timestamp.toLocaleDateString()}</div>
                <div class="metadata-label">Generated Date</div>
            </div>
        </div>

        <div class="section">
            <h2>Report Status</h2>
            <span class="status-badge status-${report.status}">${report.status.toUpperCase()}</span>
        </div>

        <div class="section">
            <h2>Analysis Summary</h2>
            <p>This report was generated by the Code Analyzer system, providing comprehensive insights into code quality, maintainability, and potential improvements.</p>
            <p>The analysis covers multiple aspects including:</p>
            <ul>
                <li>Code complexity metrics</li>
                <li>Maintainability scores</li>
                <li>Readability assessments</li>
                <li>Issue detection and categorization</li>
                <li>AI-powered suggestions</li>
            </ul>
        </div>

        <div class="section">
            <h2>Technical Details</h2>
            <p><strong>Generated:</strong> ${report.timestamp.toLocaleString()}</p>
            <p><strong>Format:</strong> ${report.type.toUpperCase()}</p>
            <p><strong>Size:</strong> ${report.size}</p>
            <p><strong>Status:</strong> ${report.status}</p>
        </div>

        <div class="section">
            <h2>Next Steps</h2>
            <p>Based on this analysis, consider:</p>
            <ol>
                <li>Addressing high-priority issues first</li>
                <li>Refactoring complex code sections</li>
                <li>Implementing suggested improvements</li>
                <li>Setting up automated quality gates</li>
                <li>Regular code review processes</li>
            </ol>
        </div>

        <div class="section">
            <p><em>Report generated by Code Analyzer - AI-Powered Code Review & Quality Analysis</em></p>
        </div>
    </div>
</body>
</html>`;
  };

  const generateJSONReport = (report: Report): string => {
    const reportData = {
      metadata: {
        name: report.name,
        type: report.type,
        timestamp: report.timestamp.toISOString(),
        size: report.size,
        status: report.status
      },
      summary: {
        totalFiles: Math.floor(Math.random() * 10) + 1,
        averageScore: Math.floor(Math.random() * 40) + 60,
        totalIssues: Math.floor(Math.random() * 20) + 1,
        criticalIssues: Math.floor(Math.random() * 3),
        highPriorityIssues: Math.floor(Math.random() * 5) + 1,
        mediumPriorityIssues: Math.floor(Math.random() * 8) + 2,
        lowPriorityIssues: Math.floor(Math.random() * 10) + 1
      },
      files: [
        {
          name: "main.js",
          path: "src/main.js",
          score: Math.floor(Math.random() * 40) + 60,
          issues: [
            {
              type: "warning",
              message: "Consider using const instead of var",
              line: Math.floor(Math.random() * 50) + 1,
              severity: "low"
            },
            {
              type: "error",
              message: "Console.log statement should be removed in production",
              line: Math.floor(Math.random() * 50) + 1,
              severity: "medium"
            }
          ],
          metrics: {
            complexity: Math.floor(Math.random() * 20) + 5,
            maintainability: Math.floor(Math.random() * 40) + 40,
            readability: Math.floor(Math.random() * 30) + 70,
            lines: Math.floor(Math.random() * 100) + 50,
            size: `${(Math.random() * 10 + 1).toFixed(1)} KB`
          }
        }
      ],
      recommendations: [
        "Address high-priority issues first",
        "Refactor complex code sections",
        "Implement automated testing",
        "Set up code quality gates",
        "Regular code review processes"
      ]
    };

    return JSON.stringify(reportData, null, 2);
  };

  const generateTextReport = (report: Report): string => {
    return `CODE ANALYZER REPORT
${'='.repeat(50)}

Report: ${report.name}
Type: ${report.type.toUpperCase()}
Generated: ${report.timestamp.toLocaleString()}
Size: ${report.size}
Status: ${report.status.toUpperCase()}

${'='.repeat(50)}

PROJECT SUMMARY
${'-'.repeat(30)}
Total Files: ${Math.floor(Math.random() * 10) + 1}
Average Score: ${Math.floor(Math.random() * 40) + 60}/100
Total Issues: ${Math.floor(Math.random() * 20) + 1}
Critical Issues: ${Math.floor(Math.random() * 3)}
High Priority Issues: ${Math.floor(Math.random() * 5) + 1}
Medium Priority Issues: ${Math.floor(Math.random() * 8) + 2}
Low Priority Issues: ${Math.floor(Math.random() * 10) + 1}

${'='.repeat(50)}

FILE ANALYSIS
${'-'.repeat(30)}

File: main.js
Path: src/main.js
Score: ${Math.floor(Math.random() * 40) + 60}/100
Size: ${(Math.random() * 10 + 1).toFixed(1)} KB
Lines: ${Math.floor(Math.random() * 100) + 50}

Metrics:
  - Complexity: ${Math.floor(Math.random() * 20) + 5}
  - Maintainability: ${Math.floor(Math.random() * 40) + 40}/100
  - Readability: ${Math.floor(Math.random() * 30) + 70}/100

Issues Found:
  1. [LOW] WARNING (Line ${Math.floor(Math.random() * 50) + 1}): Consider using const instead of var
  2. [MEDIUM] ERROR (Line ${Math.floor(Math.random() * 50) + 1}): Console.log statement should be removed in production

${'='.repeat(50)}

RECOMMENDATIONS
${'-'.repeat(30)}
1. Address high-priority issues first
2. Refactor complex code sections
3. Implement automated testing
4. Set up code quality gates
5. Regular code review processes

${'='.repeat(50)}

Report generated by Code Analyzer
AI-Powered Code Review & Quality Analysis
${'='.repeat(50)}`;
  };

  const handleDeleteReport = (reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'html': return '📄';
      case 'json': return '📊';
      case 'text': return '📋';
      default: return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'html': return 'bg-green-100 text-green-800';
      case 'json': return 'bg-blue-100 text-blue-800';
      case 'text': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'text-green-600 bg-green-100';
      case 'generating': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
        <p className="text-gray-600">View and export your code analysis reports</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Generate Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => handleGenerateReport('html')}
            disabled={isGenerating}
            className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-medium">HTML Report</div>
            <div className="text-sm opacity-90">Interactive web report</div>
          </button>
          
          <button 
            onClick={() => handleGenerateReport('json')}
            disabled={isGenerating}
            className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">JSON Report</div>
            <div className="text-sm opacity-90">Machine-readable data</div>
          </button>
          
          <button 
            onClick={() => handleGenerateReport('text')}
            disabled={isGenerating}
            className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium">Text Report</div>
            <div className="text-sm opacity-90">Console-friendly output</div>
          </button>
        </div>
        
        {isGenerating && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-blue-800">Generating report...</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report History</h2>
        {reports.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-3xl mb-2">📚</div>
            <p>No reports generated yet</p>
            <p className="text-sm">Generate a report to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTypeIcon(report.type)}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                          {report.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {report.timestamp.toLocaleDateString()} at {report.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{report.size}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button 
                    onClick={() => handleDownloadReport(report)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    Download
                  </button>
                  <button 
                    onClick={() => handleDeleteReport(report.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
