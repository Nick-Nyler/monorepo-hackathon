import React, { useState, useEffect } from 'react';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  color: string;
  trend: number[];
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'failed' | 'pending';
  lastAnalysis: Date;
  score: number;
  issues: number;
  team: string[];
  repository: string;
}

interface Activity {
  id: string;
  action: string;
  project: string;
  time: Date;
  status: 'completed' | 'processing' | 'failed';
  user: string;
  details?: string;
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced stats with real-time data simulation
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: 'Projects Analyzed',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: '📊',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: [18, 20, 22, 24, 26, 28, 30]
    },
    {
      title: 'Average Score',
      value: '78/100',
      change: '+5%',
      changeType: 'positive',
      icon: '🎯',
      color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      trend: [73, 74, 75, 76, 77, 78, 79]
    },
    {
      title: 'Issues Found',
      value: '156',
      change: '-8%',
      changeType: 'positive',
      icon: '🔍',
      color: 'bg-gradient-to-br from-amber-500 to-amber-600',
      trend: [180, 175, 170, 165, 160, 158, 156]
    },
    {
      title: 'AI Suggestions',
      value: '89',
      change: '+23%',
      changeType: 'positive',
      icon: '🤖',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      trend: [72, 75, 78, 81, 84, 87, 89]
    }
  ]);

  const [recentProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'frontend-app',
      status: 'active',
      lastAnalysis: new Date(Date.now() - 3600000),
      score: 82,
      issues: 12,
      team: ['John D.', 'Sarah M.'],
      repository: 'github.com/company/frontend-app'
    },
    {
      id: '2',
      name: 'api-service',
      status: 'completed',
      lastAnalysis: new Date(Date.now() - 7200000),
      score: 91,
      issues: 3,
      team: ['Mike R.', 'Lisa K.'],
      repository: 'github.com/company/api-service'
    },
    {
      id: '3',
      name: 'mobile-app',
      status: 'active',
      lastAnalysis: new Date(Date.now() - 1800000),
      score: 67,
      issues: 28,
      team: ['Alex T.', 'David L.'],
      repository: 'github.com/company/mobile-app'
    }
  ]);

  const [recentActivity] = useState<Activity[]>([
    { id: 1, action: 'Project analyzed', project: 'frontend-app', time: new Date(Date.now() - 120000), status: 'completed', user: 'John D.' },
    { id: 2, action: 'Report generated', project: 'api-service', time: new Date(Date.now() - 900000), status: 'completed', user: 'Sarah M.' },
    { id: 3, action: 'AI analysis', project: 'mobile-app', time: new Date(Date.now() - 3600000), status: 'completed', user: 'Mike R.' },
    { id: 4, action: 'Quality scan', project: 'backend-api', time: new Date(Date.now() - 7200000), status: 'completed', user: 'Lisa K.' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.title === 'Projects Analyzed' ? 
            (parseInt(stat.value) + Math.floor(Math.random() * 2)).toString() :
            stat.value
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'text-emerald-600';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-100/80 border-emerald-200';
      case 'completed': return 'text-blue-600 bg-blue-100/80 border-blue-200';
      case 'failed': return 'text-red-600 bg-red-100/80 border-red-200';
      case 'pending': return 'text-amber-600 bg-amber-100/80 border-amber-200';
      default: return 'text-gray-600 bg-gray-100/80 border-gray-200';
    }
  };

  const getProjectPriority = (score: number) => {
    if (score >= 80) return 'Low Priority';
    if (score >= 60) return 'Medium Priority';
    return 'High Priority';
  };

  const getPriorityColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-100/80 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-100/80 border-amber-200';
    return 'text-red-600 bg-red-100/80 border-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6 space-y-8">
      {/* Header with Time Range Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-4">
            Welcome to Code Analyzer
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl leading-relaxed">
            AI-powered code review and quality analysis for modern JavaScript and TypeScript projects
          </p>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="appearance-none bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl px-6 py-3 pr-12 text-slate-700 font-medium shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mb-3">{stat.value}</p>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-bold ${getChangeColor(stat.changeType)}`}>
                    {getChangeIcon(stat.changeType)} {stat.change}
                  </span>
                  <span className="text-sm text-slate-500">from last week</span>
                </div>
              </div>
              <div className={`${stat.color} p-4 rounded-2xl text-white text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
            
            {/* Mini Trend Chart */}
            <div className="flex items-end space-x-1 h-16">
              {stat.trend.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-slate-200 to-slate-100 rounded-t-lg transition-all duration-300 hover:from-slate-300 hover:to-slate-200"
                  style={{
                    height: `${(value / Math.max(...stat.trend)) * 100}%`,
                    background: i === stat.trend.length - 1 
                      ? 'linear-gradient(to top, #3b82f6, #1d4ed8)' 
                      : 'linear-gradient(to top, #e2e8f0, #cbd5e1)'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Project Management Section */}
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">Recent Projects</h2>
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
            View All Projects
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <div key={project.id} className="group bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{project.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{project.repository}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Score:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.score)}`}>
                    {project.score}/100
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Issues:</span>
                  <span className="text-sm font-bold text-slate-900">{project.issues}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">Priority:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(project.score)}`}>
                    {getProjectPriority(project.score)}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-slate-200/50 pt-4 mb-4">
                <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Team Members:</p>
                <div className="flex flex-wrap gap-2">
                  {project.team.map((member, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 text-xs font-semibold rounded-full border border-blue-200/50"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors">
                  View Details
                </button>
                <button className="text-emerald-600 hover:text-emerald-800 text-sm font-semibold hover:underline transition-colors">
                  Re-analyze
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
          <div className="text-4xl mb-6 bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">🔍</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Code Analysis</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Analyze your code for quality, security, and maintainability issues
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Automated issue detection
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Security vulnerability scanning
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Performance optimization
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors group-hover:text-purple-600">
            Start Analysis →
          </button>
        </div>

        <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
          <div className="text-4xl mb-6 bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-2xl text-white shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">🤖</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">AI Insights</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Get intelligent suggestions and explanations powered by AI
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Code improvement suggestions
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Best practice recommendations
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Automated refactoring hints
            </div>
          </div>
          <button className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors group-hover:text-pink-600">
            Explore AI Features →
          </button>
        </div>

        <div className="group bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2">
          <div className="text-4xl mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl text-white shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">📊</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Quality Metrics</h3>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Track complexity, maintainability, and readability scores
          </p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Real-time monitoring
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Trend analysis
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
              Custom dashboards
            </div>
          </div>
          <button className="text-emerald-600 hover:text-emerald-800 font-semibold hover:underline transition-colors group-hover:text-teal-600">
            View Metrics →
          </button>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent">Recent Activity</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold hover:underline transition-colors hover:text-purple-600">
            View All Activity
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/50 transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <p className="font-semibold text-slate-900">{activity.action}</p>
                  <p className="text-sm text-slate-600">{activity.project} • {activity.user}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-500">{activity.time.toLocaleTimeString()}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  activity.status === 'completed' ? 'text-emerald-600 bg-emerald-100/80 border-emerald-200' :
                  activity.status === 'processing' ? 'text-blue-600 bg-blue-100/80 border-blue-200' :
                  'text-red-600 bg-red-100/80 border-red-200'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Start */}
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-transparent mb-8">Quick Start Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 group hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">1</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Install Dependencies</h3>
              <code className="text-sm text-slate-600 bg-white/80 px-3 py-2 rounded-lg border border-slate-200/50 mt-2 block font-mono">
                pnpm install
              </code>
              <p className="text-xs text-slate-500 mt-2">Install all required packages</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200/50 group hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform duration-300">2</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Build Project</h3>
              <code className="text-sm text-slate-600 bg-white/80 px-3 py-2 rounded-lg border border-slate-200/50 mt-2 block font-mono">
                pnpm build
              </code>
              <p className="text-xs text-slate-500 mt-2">Compile TypeScript to JavaScript</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 group hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform duration-300">3</div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Analyze Code</h3>
              <code className="text-sm text-slate-600 bg-white/80 px-3 py-2 rounded-lg border border-slate-200/50 mt-2 block font-mono">
                pnpm cli analyze ./your-project
              </code>
              <p className="text-xs text-slate-500 mt-2">Start code quality analysis</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50">
          <h3 className="font-bold text-slate-900 mb-4 text-xl">💡 Pro Tips</h3>
          <ul className="text-sm text-slate-600 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Use the web dashboard for visual analysis results
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Set up automated analysis in your CI/CD pipeline
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Configure quality gates to maintain code standards
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Integrate with your existing development tools
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

