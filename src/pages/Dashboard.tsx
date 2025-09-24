import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>, action: string) => {
    // Create ripple effect on click - simplified version
    const ripple = document.createElement('div');
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
      z-index: 1;
    `;
    
    event.currentTarget.style.position = 'relative';
    event.currentTarget.style.overflow = 'hidden';
    event.currentTarget.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Handle navigation
    console.log(`Navigating to: ${action}`);
    
    // Navigate to the appropriate route
    switch (action) {
      case 'executive-dashboard':
        navigate('/executive-dashboard');
        break;
      case 'penetration-testing':
        navigate('/penetration-testing');
        break;
      case 'asset-management':
        navigate('/asset-management');
        break;
      case 'compliance':
        navigate('/compliance');
        break;
      case 'identity':
        navigate('/identity');
        break;
      case 'vulnerabilities':
        navigate('/vulnerabilities');
        break;
      case 'incidents':
        navigate('/incidents');
        break;
      default:
        console.log(`No route defined for: ${action}`);
    }
  };

  return (
    <div className="main">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <h1>
            Welcome to <span className="brand">Cybrty</span>
          </h1>
          <p>
            AI-Orchestrated Cybersecurity Platform providing comprehensive protection, threat detection, and compliance management for your organization
          </p>
          
          <div className="hero-stats">
            <div className="stat-badge">
              <div className="stat-value">420+</div>
              <div className="stat-label">🛡️ Assets Protected</div>
            </div>
            <div className="stat-badge">
              <div className="stat-value">87.5%</div>
              <div className="stat-label">✅ Compliance Score</div>
            </div>
            <div className="stat-badge">
              <div className="stat-value">24/7</div>
              <div className="stat-label">🎯 AI Monitoring</div>
            </div>
            <div className="stat-badge">
              <div className="stat-value">12</div>
              <div className="stat-label">🚨 Active Alerts</div>
            </div>
          </div>
        </section>

        {/* Status Overview */}
        <section className="status-grid">
          <div className="status-card status-secure">
            <div className="status-value" style={{ color: 'var(--accent-success)' }}>SECURE</div>
            <div className="status-label">🛡️ Security Status</div>
            <div className="status-trend" style={{ color: 'var(--accent-success)' }}>All systems operational</div>
          </div>
          
          <div className="status-card status-warning">
            <div className="status-value" style={{ color: 'var(--accent-warning)' }}>12</div>
            <div className="status-label">🚨 Active Alerts</div>
            <div className="status-trend" style={{ color: 'var(--accent-warning)' }}>3 require attention</div>
          </div>
          
          <div className="status-card status-secure">
            <div className="status-value" style={{ color: 'var(--accent-success)' }}>72</div>
            <div className="status-label">📊 Risk Score</div>
            <div className="status-trend" style={{ color: 'var(--accent-success)' }}>Low risk profile</div>
          </div>
          
          <div className="status-card status-info">
            <div className="status-value" style={{ color: 'var(--accent-primary)' }}>420</div>
            <div className="status-label">💻 Total Assets</div>
            <div className="status-trend" style={{ color: 'var(--accent-primary)' }}>15 critical assets</div>
          </div>
        </section>

        {/* Cybersecurity Workspaces */}
        <section className="workspace-section">
          <h2 className="section-title">
            Cybersecurity Workspaces
          </h2>
          
          <div className="workspace-grid">
            {/* Executive Dashboard */}
            <div 
              className="workspace-card executive"
              onClick={(e) => handleCardClick(e, 'executive-dashboard')}
            >
              <div className="card-header">
                <div className="card-icon">📊</div>
                <div>
                  <h3 className="card-title">Executive Dashboard</h3>
                  <p className="card-subtitle">Strategic Risk & Governance</p>
                </div>
              </div>
              <p className="card-description">
                Executive-level cybersecurity metrics, risk posture analysis, compliance scorecards, and strategic security insights for C-suite decision making.
              </p>
              <div className="card-tags">
                <span className="tag">Risk Metrics</span>
                <span className="tag">Board Reports</span>
                <span className="tag">KPIs</span>
              </div>
            </div>

            {/* Security Operations */}
            <div className="workspace-card security-ops">
              <div className="card-header">
                <div className="card-icon">🛡️</div>
                <div>
                  <h3 className="card-title">Security Operations</h3>
                  <p className="card-subtitle">SOC & Threat Management</p>
                </div>
              </div>
              <p className="card-description">
                24/7 security monitoring, SIEM management, threat detection, incident triage, and real-time security event analysis with AI-powered automation.
              </p>
              <div className="card-tags">
                <span className="tag">SIEM/SOC</span>
                <span className="tag">AI Detection</span>
                <span className="tag">Real-time</span>
              </div>
            </div>

            {/* Incident Response */}
            {/* Incident Response */}
            <div 
              className="workspace-card incidents"
              onClick={(e) => handleCardClick(e, 'incidents')}
            >
              <div className="card-header">
                <div className="card-icon">🚨</div>
                <div>
                  <h3 className="card-title">Incident Response</h3>
                  <p className="card-subtitle">Crisis Management & Recovery</p>
                </div>
              </div>
              <p className="card-description">
                Comprehensive incident management, automated response playbooks, forensic analysis, breach containment, and post-incident recovery coordination.
              </p>
              <div className="card-tags">
                <span className="tag">SOAR</span>
                <span className="tag">Forensics</span>
                <span className="tag">Playbooks</span>
              </div>
            </div>

            {/* Asset Management */}
            <div 
              className="workspace-card assets"
              onClick={(e) => handleCardClick(e, 'asset-management')}
            >
              <div className="card-header">
                <div className="card-icon">💻</div>
                <div>
                  <h3 className="card-title">Asset Management</h3>
                  <p className="card-subtitle">Inventory & Vulnerability Assessment</p>
                </div>
              </div>
              <p className="card-description">
                Complete asset discovery, vulnerability management, risk scoring, patch management, and software composition analysis (SBOM) tracking.
              </p>
              <div className="card-tags">
                <span className="tag">Discovery</span>
                <span className="tag">SBOM</span>
                <span className="tag">Patch Mgmt</span>
              </div>
            </div>

            {/* Compliance Center */}
            <div 
              className="workspace-card compliance"
              onClick={(e) => handleCardClick(e, 'compliance')}
            >
              <div className="card-header">
                <div className="card-icon">📋</div>
                <div>
                  <h3 className="card-title">Compliance Center</h3>
                  <p className="card-subtitle">GRC & Regulatory Management</p>
                </div>
              </div>
              <p className="card-description">
                Multi-framework compliance tracking (NIST, SOC 2, ISO 27001, GDPR), audit management, policy governance, and automated compliance reporting.
              </p>
              <div className="card-tags">
                <span className="tag">NIST</span>
                <span className="tag">SOC 2</span>
                <span className="tag">ISO 27001</span>
              </div>
            </div>

            {/* Identity & Access */}
            <div 
              className="workspace-card users"
              onClick={(e) => handleCardClick(e, 'identity')}
            >
              <div className="card-header">
                <div className="card-icon">👥</div>
                <div>
                  <h3 className="card-title">Identity & Access</h3>
                  <p className="card-subtitle">IAM & Zero Trust</p>
                </div>
              </div>
              <p className="card-description">
                Advanced identity governance, privileged access management, zero-trust implementation, MFA enforcement, and user behavior analytics.
              </p>
              <div className="card-tags">
                <span className="tag">Zero Trust</span>
                <span className="tag">PAM</span>
                <span className="tag">SSO/MFA</span>
              </div>
            </div>

            {/* Threat Intelligence */}
            <div className="workspace-card threat-intel">
              <div className="card-header">
                <div className="card-icon">🧠</div>
                <div>
                  <h3 className="card-title">Threat Intelligence</h3>
                  <p className="card-subtitle">CTI & Threat Hunting</p>
                </div>
              </div>
              <p className="card-description">
                Advanced threat intelligence feeds, IOC analysis, threat actor profiling, campaign tracking, and proactive threat hunting capabilities.
              </p>
              <div className="card-tags">
                <span className="tag">CTI Feeds</span>
                <span className="tag">IOC Analysis</span>
                <span className="tag">Hunting</span>
              </div>
            </div>

            {/* Penetration Testing */}
            <div 
              className="workspace-card penetration"
              onClick={(e) => handleCardClick(e, 'penetration-testing')}
            >
              <div className="card-header">
                <div className="card-icon">🔒</div>
                <div>
                  <h3 className="card-title">Penetration Testing</h3>
                  <p className="card-subtitle">Security Assessment & Testing</p>
                </div>
              </div>
              <p className="card-description">
                Automated and manual penetration testing, vulnerability assessments, red team exercises, and continuous security validation.
              </p>
              <div className="card-tags">
                <span className="tag">Pen Testing</span>
                <span className="tag">Red Team</span>
                <span className="tag">Assessment</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions & Utilities */}
        <section className="quick-actions">
          <h2 className="section-title">
            Quick Actions & Utilities
          </h2>
          
          <div className="actions-grid">
            {[
              { icon: '💾', title: 'Configuration Backup', desc: 'System configuration export' },
              { icon: '📞', title: 'Emergency Contacts', desc: 'Critical escalation contacts' },
              { icon: '🔔', title: 'Security Alerts', desc: 'Real-time notifications center' },
              { icon: '🔍', title: 'Audit Trail', desc: 'Activity logs & forensics' },
              { icon: '🎓', title: 'Training Resources', desc: 'Security awareness materials' },
              { icon: '📄', title: 'License Management', desc: 'Software licensing & compliance' },
              { icon: '📊', title: 'Data Export', desc: 'Export security metrics' },
              { icon: '🔗', title: 'Integrations Hub', desc: 'Third-party tool connections' },
              { icon: '🔔', title: 'Notification Center', desc: 'Centralized alert management' },
              { icon: '💾', title: 'Backup & Recovery', desc: 'Data protection & restoration' },
              { icon: '⚙️', title: 'User Preferences', desc: 'Customize platform settings' },
              { icon: '🔍', title: 'Vulnerability Scan', desc: 'Comprehensive security assessment' }
            ].map((action, index) => (
              <div key={index} className="action-card">
                <div className="action-icon">{action.icon}</div>
                <h4 className="action-title">{action.title}</h4>
                <p className="action-description">{action.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard;