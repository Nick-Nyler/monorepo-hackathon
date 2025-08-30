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
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.name}.${report.type}`;
    link.click();
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
