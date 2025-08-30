import React, { useState, useRef, useCallback } from 'react';

interface AnalysisResult {
  id: string;
  projectName: string;
  timestamp: Date;
  score: number;
  issues: number;
  suggestions: number;
  status: 'completed' | 'processing' | 'failed';
  progress?: number;
  errorMessage?: string;
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
        category: 'security' | 'performance' | 'maintainability' | 'style';
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
      case 'critical': return 'text-red-600 bg-red-100/80 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100/80 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100/80 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100/80 border-blue-200';
      default: return 'text-slate-600 bg-slate-100/80 border-slate-200';
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return '🔒';
      case 'performance': return '⚡';
      case 'maintainability': return '🔧';
      case 'style': return '🎨';
      default: return '📝';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="p-8 border-b border-slate-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">
              Analysis Details: {result.projectName}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 text-3xl font-bold hover:bg-slate-100 p-2 rounded-xl transition-all duration-300"
            >
              ×
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-6 text-sm text-slate-600">
            <span>Analyzed: {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}</span>
            <span>Status: {result.status}</span>
            <span>Overall Score: {result.score}/100</span>
          </div>
        </div>

        <div className="p-8">
          {result.details ? (
            <div className="space-y-8">
              {/* Summary Section */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-6 rounded-2xl border border-slate-200/50">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Project Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{result.details.summary.totalFiles}</div>
                    <div className="text-sm text-slate-600 font-medium">Total Files</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{result.details.summary.averageScore}</div>
                    <div className="text-sm text-slate-600 font-medium">Average Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">{result.details.summary.totalIssues}</div>
                    <div className="text-sm text-slate-600 font-medium">Total Issues</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{result.issues}</div>
                    <div className="text-sm text-slate-600 font-medium">Suggestions</div>
                  </div>
                </div>
              </div>

              {/* File Details */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">File Analysis</h3>
                <div className="space-y-6">
                  {result.details.files.map((file, index) => (
                    <div key={index} className="bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{file.name}</h4>
                          <p className="text-sm text-slate-500 font-medium">{file.path}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold border ${
                            file.score >= 80 ? 'text-emerald-600 bg-emerald-100/80 border-emerald-200' :
                            file.score >= 60 ? 'text-amber-600 bg-amber-100/80 border-amber-200' :
                            'text-red-600 bg-red-100/80 border-red-200'
                          }`}>
                            {file.score}/100
                          </span>
                          <span className="text-sm text-slate-600 font-medium">{file.metrics.size}</span>
                        </div>
                      </div>
                      
                      {/* File Metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 mb-1">{file.metrics.complexity}</div>
                          <div className="text-xs text-slate-600 font-medium">Complexity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 mb-1">{file.metrics.maintainability}</div>
                          <div className="text-xs text-slate-600 font-medium">Maintainability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 mb-1">{file.metrics.readability}</div>
                          <div className="text-xs text-slate-600 font-medium">Readability</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-slate-900 mb-1">{file.metrics.lines}</div>
                          <div className="text-xs text-slate-600 font-medium">Lines</div>
                        </div>
                      </div>

                      {/* Issues */}
                      {file.issues.length > 0 && (
                        <div>
                          <h5 className="font-bold text-slate-900 mb-4 text-lg">Issues Found</h5>
                          <div className="space-y-3">
                            {file.issues.map((issue, issueIndex) => (
                              <div key={issueIndex} className="flex items-start space-x-4 p-4 bg-red-50/50 rounded-xl border border-red-200/50">
                                <span className="text-xl filter drop-shadow-sm">{getIssueTypeIcon(issue.type)}</span>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(issue.severity)}`}>
                                      {issue.severity.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-slate-500 font-medium">{getCategoryIcon(issue.category)} {issue.category}</span>
                                    {issue.line && (
                                      <span className="text-xs text-slate-500 font-medium">Line {issue.line}</span>
                                    )}
                                  </div>
                                  <p className="text-sm text-slate-700 font-medium">{issue.message}</p>
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
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-slate-600 text-lg">Detailed analysis data not available</p>
              <p className="text-sm text-slate-500">This is a demo result with basic information</p>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-slate-200/50 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-3 text-slate-600 hover:text-slate-800 font-semibold hover:bg-slate-100 rounded-xl transition-all duration-300"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Simulate report download
              alert('Report download functionality would be implemented here');
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, []);

  const handleFileUpload = useCallback(async (files: File[]) => {
    setIsAnalyzing(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      // Simulate file upload and analysis process
      const totalSteps = 5;
      let currentStep = 0;
      
      for (let i = 0; i < totalSteps; i++) {
        currentStep = i + 1;
        setUploadProgress((currentStep / totalSteps) * 100);
        
        switch (currentStep) {
          case 1:
            setCurrentFile('Uploading files...');
            await new Promise(resolve => setTimeout(resolve, 800));
            break;
          case 2:
            setCurrentFile('Scanning project structure...');
            await new Promise(resolve => setTimeout(resolve, 600));
            break;
          case 3:
            setCurrentFile('Analyzing code quality...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
          case 4:
            setCurrentFile('Generating AI insights...');
            await new Promise(resolve => setTimeout(resolve, 800));
            break;
          case 5:
            setCurrentFile('Finalizing results...');
            await new Promise(resolve => setTimeout(resolve, 400));
            break;
        }
      }
      
      const newResult: AnalysisResult = {
        id: Date.now().toString(),
        projectName: files[0].name.replace(/\.[^/.]+$/, ''),
        timestamp: new Date(),
        score: Math.floor(Math.random() * 40) + 60,
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
                  severity: 'low',
                  category: 'style'
                },
                {
                  type: 'error',
                  message: 'Console.log statement should be removed in production',
                  line: Math.floor(Math.random() * 50) + 1,
                  severity: 'medium',
                  category: 'security'
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
      setUploadProgress(100);
      setCurrentFile('Analysis completed successfully!');
      
      // Reset progress after a delay
      setTimeout(() => {
        setUploadProgress(0);
        setCurrentFile('');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleViewDetails = useCallback((result: AnalysisResult) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedResult(null);
  }, []);

  const handleDownloadReport = useCallback((result: AnalysisResult) => {
    const reportContent = generateReportContent(result);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${result.projectName}_analysis_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  const generateReportContent = useCallback((result: AnalysisResult): string => {
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

Issues Found:
`;
        file.issues.forEach((issue, issueIndex) => {
          report += `  ${issueIndex + 1}. [${issue.severity.toUpperCase()}] ${issue.type.toUpperCase()} (${issue.category})`;
          if (issue.line) {
            report += ` (Line ${issue.line})`;
          }
          report += `: ${issue.message}\n`;
        });
        report += `\n${'-'.repeat(30)}\n\n`;
      });
    }

    report += `\n${'='.repeat(50)}
Report generated by Code Analyzer
AI-Powered Code Review & Quality Analysis
${'='.repeat(50)}`;

    return report;
  }, []);

  const getScoreColor = useCallback((score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-100/80 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-100/80 border-amber-200';
    return 'text-red-600 bg-red-100/80 border-red-200';
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-100/80 border-emerald-200';
      case 'processing': return 'text-blue-600 bg-blue-100/80 border-blue-200';
      case 'failed': return 'text-red-600 bg-red-100/80 border-red-200';
      default: return 'text-slate-600 bg-slate-100/80 border-slate-200';
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6 space-y-8">
      <div>
        <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-4">
          Code Analysis
        </h1>
        <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
          Upload or analyze your code for quality insights
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-red-500 text-2xl">❌</span>
              <div>
                <h3 className="text-lg font-bold text-red-800">Analysis Error</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 hover:bg-red-100 p-2 rounded-xl transition-all duration-300"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Upload Project</h2>
        <div 
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-500 ${
            isDragOver 
              ? 'border-blue-400 bg-blue-50/50 shadow-lg shadow-blue-200/50' 
              : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-6xl mb-6 filter drop-shadow-lg">📁</div>
          <p className="text-slate-600 mb-6 text-lg font-medium">
            Drag and drop your project folder here, or click to browse
          </p>
          <button 
            onClick={handleFileSelect}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
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

      {/* Enhanced Progress Indicator */}
      {isAnalyzing && (
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Analyzing Project...</h3>
                <p className="text-slate-600 font-medium">{currentFile}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            
            <div className="text-right">
              <span className="text-lg font-bold text-slate-700">{Math.round(uploadProgress)}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Analysis</h2>
          {analysisResults.length > 0 && (
            <button 
              onClick={() => {
                // Export all results
                const allResults = analysisResults.map(result => ({
                  name: result.projectName,
                  score: result.score,
                  issues: result.issues,
                  timestamp: result.timestamp
                }));
                const blob = new Blob([JSON.stringify(allResults, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `all_analysis_results_${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors hover:text-purple-600"
            >
              Export All Results
            </button>
          )}
        </div>
        
        {analysisResults.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            <div className="text-5xl mb-4">📊</div>
            <p className="text-lg font-medium">No recent analysis found</p>
            <p className="text-sm">Upload a project to get started</p>
          </div>
        ) : (
          <div className="space-y-6">
            {analysisResults.map((result) => (
              <div key={result.id} className="bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{result.projectName}</h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {result.timestamp.toLocaleDateString()} at {result.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-8 text-sm text-slate-600 mb-4">
                  <span className="font-medium">Issues: {result.issues}</span>
                  <span className="font-medium">Suggestions: {result.suggestions}</span>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleViewDetails(result)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleDownloadReport(result)}
                    className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold hover:underline transition-colors"
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
