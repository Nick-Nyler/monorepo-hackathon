import React, { useState } from 'react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats: StatCard[] = [
    {
      title: 'Projects Analyzed',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: '📊',
      color: 'bg-blue-500'
    },
    {
      title: 'Average Score',
      value: '78/100',
      change: '+5%',
      changeType: 'positive',
      icon: '🎯',
      color: 'bg-green-500'
    },
    {
      title: 'Issues Found',
      value: '156',
      change: '-8%',
      changeType: 'positive',
      icon: '🔍',
      color: 'bg-yellow-500'
    },
    {
      title: 'AI Suggestions',
      value: '89',
      change: '+23%',
      changeType: 'positive',
      icon: '🤖',
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'Project analyzed', project: 'frontend-app', time: '2 minutes ago', status: 'completed' },
    { id: 2, action: 'Report generated', project: 'api-service', time: '15 minutes ago', status: 'completed' },
    { id: 3, action: 'AI analysis', project: 'mobile-app', time: '1 hour ago', status: 'completed' },
    { id: 4, action: 'Quality scan', project: 'backend-api', time: '2 hours ago', status: 'completed' }
  ];

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      default: return '→';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Code Analyzer
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI-powered code review and quality analysis for modern JavaScript and TypeScript projects
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                    {getChangeIcon(stat.changeType)} {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last week</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-full text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-3xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Analysis</h3>
          <p className="text-gray-600 mb-4">
            Analyze your code for quality, security, and maintainability issues
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
            Start Analysis →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insights</h3>
          <p className="text-gray-600 mb-4">
            Get intelligent suggestions and explanations powered by AI
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
            Explore AI Features →
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-all duration-200 hover:scale-105">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Metrics</h3>
          <p className="text-gray-600 mb-4">
            Track complexity, maintainability, and readability scores
          </p>
          <button className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
            View Metrics →
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.project}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
            <div>
              <h3 className="font-medium text-gray-900">Install Dependencies</h3>
              <code className="text-sm text-gray-600 bg-white px-2 py-1 rounded border">pnpm install</code>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
            <div>
              <h3 className="font-medium text-gray-900">Build Project</h3>
              <code className="text-sm text-gray-600 bg-white px-2 py-1 rounded border">pnpm build</code>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
            <div>
              <h3 className="font-medium text-gray-900">Analyze Code</h3>
              <code className="text-sm text-gray-600 bg-white px-2 py-1 rounded border">pnpm cli analyze ./your-project</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
