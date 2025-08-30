import React, { useState, useRef } from 'react';

interface AnalysisResult {
  id: string;
  projectName: string;
  timestamp: Date;
  score: number;
  issues: number;
  suggestions: number;
  status: 'completed' | 'processing' | 'failed';
  details?: {
    files: Array<{
      name: string;
      path: string;
      score: number;
      issues: Array<{
        type: 'error' | 'warning' | 'info';
        message: string;
        line?: number;
        severity: 'low' | 'medium' | 'high';
      }>;
      metrics: {
        complexity: number;
        maintainability: number;
        readability: number;
        lines: number;
        size: string;
      };
    }>;
    summary: {
      totalFiles: number;
      averageScore: number;
      totalIssues: number;
      criticalIssues: number;
      highPriorityIssues: number;
      mediumPriorityIssues: number;
      lowPriorityIssues: number;
    };
  };
}

interface DetailModalProps {
  result: AnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ result, isOpen, onClose }) => {
  if (!isOpen || !result) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIssueTypeIcon = (type: string) => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📝';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Analysis Details: {result.projectName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
            <span>Analyzed: {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}</span>
            <span>Status: {result.status}</span>
            <span>Overall Score: {result.score}/100</span>
          </div>
        </div>

        <div className="p-6">
          {result.details ? (
            <div className="space-y-6">
              {/* Summary Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{result.details.summary.totalFiles}</div>
                    <div className="text-sm text-gray-600">Total Files</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{result.details.summary.averageScore}</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{result.details.summary.totalIssues}</div>
                    <div className="text-sm text-gray-600">Total Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{result.issues}</div>
                    <div className="text-sm text-gray-600">Suggestions</div>
                  </div>
                </div>
              </div>

              {/* File Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">File Analysis</h3>
                <div className="space-y-4">
                  {result.details.files.map((file, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{file.name}</h4>
                          <p className="text-sm text-gray-500">{file.path}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            file.score >= 80 ? 'text-green-600 bg-green-100' :
                            file.score >= 60 ? 'text-yellow-600 bg-yellow-100' :
                            'text-red-600 bg-red-100'
                          }`}>
                            {file.score}/100
                          </span>
                          <span className="text-sm text-gray-600">{file.metrics.size}</span>
                        </div>
                      </div>
                      
                      {/* File Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{file.metrics.complexity}</div>
                          <div className="text-xs text-gray-600">Complexity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{file.metrics.maintainability}</div>
                          <div className="text-xs text-gray-600">Maintainability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{file.metrics.readability}</div>
                          <div className="text-xs text-gray-600">Readability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-gray-900">{file.metrics.lines}</div>
                          <div className="text-xs text-gray-600">Lines</div>
                        </div>
                      </div>

                      {/* Issues */}
                      {file.issues.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Issues Found</h5>
                          <div className="space-y-2">
                            {file.issues.map((issue, issueIndex) => (
                              <div key={issueIndex} className="flex items-start space-x-2 p-2 bg-red-50 rounded">
                                <span className="text-lg">{getIssueTypeIcon(issue.type)}</span>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                                      {issue.severity.toUpperCase()}
                                    </span>
                                    {issue.line && (
                                      <span className="text-xs text-gray-500">Line {issue.line}</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-700">{issue.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-gray-600">Detailed analysis data not available</p>
              <p className="text-sm text-gray-500">This is a demo result with basic information</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Simulate report download
              alert('Report download functionality would be implemented here');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
          >
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
};

const Analysis: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    setIsAnalyzing(true);
    
    // Simulate analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newResult: AnalysisResult = {
      id: Date.now().toString(),
      projectName: files[0].name.replace(/\.[^/.]+$/, ''),
      timestamp: new Date(),
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      issues: Math.floor(Math.random() * 10) + 1,
      suggestions: Math.floor(Math.random() * 5) + 1,
      status: 'completed',
      details: {
        files: [
          {
            name: 'main.js',
            path: 'src/main.js',
            score: Math.floor(Math.random() * 40) + 60,
            issues: [
              {
                type: 'warning',
                message: 'Consider using const instead of var',
                line: Math.floor(Math.random() * 50) + 1,
                severity: 'low'
              },
              {
                type: 'error',
                message: 'Console.log statement should be removed in production',
                line: Math.floor(Math.random() * 50) + 1,
                severity: 'medium'
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
        summary: {
          totalFiles: 1,
          averageScore: Math.floor(Math.random() * 40) + 60,
          totalIssues: Math.floor(Math.random() * 10) + 1,
          criticalIssues: 0,
          highPriorityIssues: Math.floor(Math.random() * 3),
          mediumPriorityIssues: Math.floor(Math.random() * 5) + 1,
          lowPriorityIssues: Math.floor(Math.random() * 3)
        }
      }
    };
    
    setAnalysisResults(prev => [newResult, ...prev]);
    setIsAnalyzing(false);
  };

  const handleViewDetails = (result: AnalysisResult) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };

  const handleDownloadReport = (result: AnalysisResult) => {
    // Generate comprehensive report content
    const reportContent = generateReportContent(result);
    
    // Create and download the report
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.projectName}_analysis_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateReportContent = (result: AnalysisResult): string => {
    const timestamp = result.timestamp.toLocaleString();
    let report = `CODE ANALYSIS REPORT
${'='.repeat(50)}

Project: ${result.projectName}
Analysis Date: ${timestamp}
Overall Score: ${result.score}/100
Status: ${result.status}
Total Issues: ${result.issues}
Total Suggestions: ${result.suggestions}

${'='.repeat(50)}

`;

    if (result.details) {
      report += `PROJECT SUMMARY
${'-'.repeat(30)}
Total Files: ${result.details.summary.totalFiles}
Average Score: ${result.details.summary.averageScore}/100
Total Issues: ${result.details.summary.totalIssues}
Critical Issues: ${result.details.summary.criticalIssues}
High Priority Issues: ${result.details.summary.highPriorityIssues}
Medium Priority Issues: ${result.details.summary.mediumPriorityIssues}
Low Priority Issues: ${result.details.summary.lowPriorityIssues}

${'='.repeat(50)}

FILE ANALYSIS
${'-'.repeat(30)}

`;

      result.details.files.forEach((file, index) => {
        report += `File ${index + 1}: ${file.name}
Path: ${file.path}
Score: ${file.score}/100
Size: ${file.metrics.size}
Lines: ${file.metrics.lines}

Metrics:
  - Complexity: ${file.metrics.complexity}
  - Maintainability: ${file.metrics.maintainability}/100
  - Readability: ${file.metrics.readability}/100

`;

        if (file.issues.length > 0) {
          report += `Issues Found:\n`;
          file.issues.forEach((issue, issueIndex) => {
            report += `  ${issueIndex + 1}. [${issue.severity.toUpperCase()}] ${issue.type.toUpperCase()}`;
            if (issue.line) {
              report += ` (Line ${issue.line})`;
            }
            report += `: ${issue.message}\n`;
          });
        }

        report += `\n${'-'.repeat(30)}\n\n`;
      });
    }

    report += `\n${'='.repeat(50)}
Report generated by Code Analyzer
AI-Powered Code Review & Quality Analysis
${'='.repeat(50)}`;

    return report;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Analysis</h1>
        <p className="text-gray-600">Upload or analyze your code for quality insights</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Project</h2>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-4xl mb-4">📁</div>
          <p className="text-gray-600 mb-4">
            Drag and drop your project folder here, or click to browse
          </p>
          <button 
            onClick={handleFileSelect}
            disabled={isAnalyzing}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isAnalyzing ? 'Analyzing...' : 'Select Project'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            webkitdirectory=""
            directory=""
            onChange={handleFileInputChange}
            className="hidden"
            accept=".js,.ts,.jsx,.tsx,.py,.java,.go,.rs"
          />
        </div>
      </div>

      {isAnalyzing && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Analyzing Project...</h3>
              <p className="text-gray-600">This may take a few moments</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Analysis</h2>
        {analysisResults.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <div className="text-3xl mb-2">📊</div>
            <p>No recent analysis found</p>
            <p className="text-sm">Upload a project to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {analysisResults.map((result) => (
              <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{result.projectName}</h3>
                    <p className="text-sm text-gray-500">
                      {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center space-x-6 text-sm text-gray-600">
                  <span>Issues: {result.issues}</span>
                  <span>Suggestions: {result.suggestions}</span>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button 
                    onClick={() => handleViewDetails(result)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleDownloadReport(result)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium hover:underline"
                  >
                    Download Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <DetailModal
        result={selectedResult}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Analysis;
