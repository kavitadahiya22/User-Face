import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CybrtyHeader from './CybrtyHeader';
import { initializeEffects, createRipple } from '../../utils/effects';

const AppLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    initializeEffects();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleRippleClick = (event: React.MouseEvent<HTMLElement>) => {
    createRipple(event, event.currentTarget);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">CybrTy</span>
              </Link>
            </div>

            {/* Desktop Navigation - Cybersecurity Workflow Based */}
            <nav className="hidden md:flex space-x-1">
              {/* Dashboard Home */}
              <Link 
                to="/" 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActivePath('/')
                    ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-2 border-transparent'
                }`}
                onClick={handleRippleClick}
              >
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Link>

              {/* Security Operations */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('security-ops')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeDropdown === 'security-ops'
                      ? 'bg-red-100 text-red-700 border-2 border-red-200'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-600 border-2 border-transparent'
                  }`}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Security Operations
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                {activeDropdown === 'security-ops' && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-dropdown-fade-in overflow-hidden">
                    <div className="bg-red-50 px-4 py-3 border-b border-red-100">
                      <div className="flex items-center">
                        <div className="w-1 h-6 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Security Operations Center</span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link to="/threat-monitoring" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200">
                        <Eye className="h-4 w-4 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">Threat Monitoring</div>
                          <div className="text-xs text-gray-500">Real-time security monitoring & SIEM</div>
                        </div>
                      </Link>
                      <Link to="/incident-response" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200">
                        <Zap className="h-4 w-4 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">Incident Response</div>
                          <div className="text-xs text-gray-500">Automated incident management & SOAR</div>
                        </div>
                      </Link>
                      <Link to="/vulnerability-management" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200">
                        <Scan className="h-4 w-4 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">Vulnerability Management</div>
                          <div className="text-xs text-gray-500">Automated scanning & patch management</div>
                        </div>
                      </Link>
                      <Link to="/threat-intelligence" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200">
                        <Activity className="h-4 w-4 mr-3 text-red-500" />
                        <div>
                          <div className="font-medium">Threat Intelligence</div>
                          <div className="text-xs text-gray-500">CTI feeds & threat hunting</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* NIST Framework */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('nist')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeDropdown === 'nist'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-2 border-transparent'
                  }`}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  NIST Framework
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                {activeDropdown === 'nist' && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-dropdown-fade-in overflow-hidden">
                    <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                      <div className="flex items-center">
                        <div className="w-1 h-6 bg-blue-500 rounded-full mr-3"></div>
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">NIST Cybersecurity Framework</span>
                      </div>
                    </div>
                    <div className="py-2 max-h-96 overflow-y-auto">
                      {/* Identify */}
                      <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Identify</span>
                        </div>
                        <Link to="/asset-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-lg ml-4">
                          Asset Management
                        </Link>
                        <Link to="/risk-assessment" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 rounded-lg ml-4">
                          Risk Assessment
                        </Link>
                      </div>

                      {/* Protect */}
                      <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">Protect</span>
                        </div>
                        <Link to="/access-control" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-lg ml-4">
                          Access Control & IAM
                        </Link>
                        <Link to="/data-security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 rounded-lg ml-4">
                          Data Security
                        </Link>
                      </div>

                      {/* Detect */}
                      <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                          <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">Detect</span>
                        </div>
                        <Link to="/security-monitoring" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 rounded-lg ml-4">
                          Security Monitoring
                        </Link>
                        <Link to="/anomaly-detection" className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors duration-200 rounded-lg ml-4">
                          Anomaly Detection
                        </Link>
                      </div>

                      {/* Respond */}
                      <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                          <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">Respond</span>
                        </div>
                        <Link to="/incident-response" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-lg ml-4">
                          Incident Response
                        </Link>
                        <Link to="/communication-plan" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-lg ml-4">
                          Communication Plans
                        </Link>
                      </div>

                      {/* Recover */}
                      <div className="px-4 py-2">
                        <div className="flex items-center mb-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wide">Recover</span>
                        </div>
                        <Link to="/recovery-planning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg ml-4">
                          Recovery Planning
                        </Link>
                        <Link to="/business-continuity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 rounded-lg ml-4">
                          Business Continuity
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Compliance & Governance */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('compliance')}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeDropdown === 'compliance'
                      ? 'bg-purple-100 text-purple-700 border-2 border-purple-200'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600 border-2 border-transparent'
                  }`}
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  Compliance
                  <ChevronDown className="h-4 w-4 ml-2" />
                </button>
                
                {activeDropdown === 'compliance' && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-dropdown-fade-in overflow-hidden">
                    <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
                      <div className="flex items-center">
                        <div className="w-1 h-6 bg-purple-500 rounded-full mr-3"></div>
                        <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">Compliance & GRC</span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link to="/compliance-dashboard" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200">
                        <BarChart3 className="h-4 w-4 mr-3 text-purple-500" />
                        <div>
                          <div className="font-medium">Compliance Dashboard</div>
                          <div className="text-xs text-gray-500">Multi-framework tracking</div>
                        </div>
                      </Link>
                      <Link to="/audit-management" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200">
                        <FileCheck className="h-4 w-4 mr-3 text-purple-500" />
                        <div>
                          <div className="font-medium">Audit Management</div>
                          <div className="text-xs text-gray-500">SOC 2, ISO 27001, PCI DSS</div>
                        </div>
                      </Link>
                      <Link to="/policy-management" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200">
                        <BookOpen className="h-4 w-4 mr-3 text-purple-500" />
                        <div>
                          <div className="font-medium">Policy Management</div>
                          <div className="text-xs text-gray-500">Governance & documentation</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Identity & Access */}
              <Link 
                to="/identity-access" 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActivePath('/identity-access')
                    ? 'bg-green-100 text-green-700 border-2 border-green-200'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-600 border-2 border-transparent'
                }`}
                onClick={handleRippleClick}
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Identity & Access
              </Link>

              {/* Network Security */}
              <Link 
                to="/network-security" 
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActivePath('/network-security')
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-200'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 border-2 border-transparent'
                }`}
                onClick={handleRippleClick}
              >
                <Network className="h-4 w-4 mr-2" />
                Network Security
              </Link>
            </nav>

            {/* Right side items */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('user')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                  <span className="text-sm font-medium">Admin</span>
                </button>
                
                {activeDropdown === 'user' && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 animate-dropdown-fade-in">
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                        Profile
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-gray-400 hover:text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
              <Link
                to="/threat-monitoring"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Eye className="h-5 w-5 mr-3" />
                Threat Monitoring
              </Link>
              <Link
                to="/incident-response"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Zap className="h-5 w-5 mr-3" />
                Incident Response
              </Link>
              <Link
                to="/asset-management"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Database className="h-5 w-5 mr-3" />
                Asset Management
              </Link>
              <Link
                to="/compliance-dashboard"
                className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileCheck className="h-5 w-5 mr-3" />
                Compliance
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Close dropdowns when clicking outside */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        ></div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
