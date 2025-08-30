import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user' | 'analyst';
}

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  read: boolean;
}

const Navigation: React.FC = () => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      message: 'Analysis completed successfully for project "frontend-app"',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: '2',
      type: 'info',
      message: 'New AI model available for code analysis',
      timestamp: new Date(Date.now() - 600000),
      read: false
    },
    {
      id: '3',
      type: 'warning',
      message: 'High complexity detected in main.js (score: 85)',
      timestamp: new Date(Date.now() - 900000),
      read: true
    }
  ]);

  const [currentUser] = useState<User>({
    name: 'John Developer',
    email: 'john.developer@company.com',
    avatar: '👨‍💻',
    role: 'analyst'
  });

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊', description: 'Overview & Statistics' },
    { path: '/analysis', label: 'Analysis', icon: '🔍', description: 'Code Quality Analysis' },
    { path: '/reports', label: 'Reports', icon: '📋', description: 'Generate & View Reports' }
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20 backdrop-blur-sm">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/25">
                  🚀
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Code Analyzer
                </h1>
                <p className="text-blue-200/80 text-sm font-medium hidden lg:block">
                  AI-Powered Code Review & Quality Analysis
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-lg shadow-white/20 backdrop-blur-sm border border-white/30'
                      : 'text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-white/20'
                  }`}
                  title={item.description}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg filter drop-shadow-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  )}
                  
                  {/* Hover tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-slate-700">
                    {item.description}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20 group"
                title="Notifications"
              >
                <span className="text-xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🔔</span>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg shadow-red-500/50 animate-bounce">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 transform transition-all duration-300 scale-100 opacity-100">
                  <div className="p-6 border-b border-gray-200/50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
                        Mark all read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-500">
                        <div className="text-3xl mb-2">🔕</div>
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-100/50 hover:bg-gray-50/80 transition-all duration-200 ${
                            !notification.read ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="text-lg filter drop-shadow-sm">{getNotificationIcon(notification.type)}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-200/50">
                    <Link
                      to="/notifications"
                      className="block text-center text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-blue-50 py-2 rounded-lg transition-colors"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-3 text-blue-100 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-white/20 group"
                title="User menu"
              >
                <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">{currentUser.avatar}</span>
                <span className="hidden lg:block text-sm font-medium">{currentUser.name}</span>
                <span className="text-xs transition-transform duration-300 group-hover:rotate-180">▼</span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 z-50 transform transition-all duration-300 scale-100 opacity-100">
                  <div className="p-6 border-b border-gray-200/50">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl filter drop-shadow-lg">{currentUser.avatar}</span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                        <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mt-2 ${
                          currentUser.role === 'admin' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800' :
                          currentUser.role === 'analyst' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800' :
                          'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800'
                        }`}>
                          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="py-3">
                    <Link
                      to="/profile"
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/50"
                    >
                      👤 Profile Settings
                    </Link>
                    <Link
                      to="/preferences"
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/50"
                    >
                      ⚙️ Preferences
                    </Link>
                    <Link
                      to="/help"
                      className="block px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:text-blue-600 hover:bg-blue-50/50"
                    >
                      ❓ Help & Support
                    </Link>
                    <hr className="my-3 border-gray-200/50" />
                    <button className="block w-full text-left px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 hover:text-red-700">
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navigation;
