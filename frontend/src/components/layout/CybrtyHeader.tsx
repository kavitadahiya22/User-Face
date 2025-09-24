import React, { useState } from 'react';
import { cybrtyTheme, getNistColor } from '../../styles/cybrtyTheme';

// FontAwesome icon component
const FAIcon: React.FC<{ className: string; size?: number }> = ({ className, size = 16 }) => (
  <i 
    className={className} 
    style={{ 
      fontSize: `${size}px`,
      display: 'inline-block',
      width: `${size}px`,
      textAlign: 'center'
    }} 
  />
);

interface NavDropdownProps {
  title: string;
  icon: string;
  category: 'identify' | 'protect' | 'detect' | 'respond' | 'recover';
  items: Array<{
    label: string;
    icon: string;
    href: string;
    description?: string;
  }>;
}

interface CybrtyHeaderProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  systemStatus?: 'operational' | 'warning' | 'error';
}

const NavDropdown: React.FC<NavDropdownProps> = ({ title, icon, category, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryColor = getNistColor(category);

  return (
    <div 
      className="nav-dropdown"
      style={{ position: 'relative' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a
        href="#"
        className="nav-item"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: cybrtyTheme.spacing[2],
          padding: `${cybrtyTheme.spacing[3]} ${cybrtyTheme.spacing[4]}`,
          borderRadius: cybrtyTheme.borderRadius.button,
          fontSize: '0.9rem',
          fontWeight: cybrtyTheme.typography.fontWeight.semibold,
          color: cybrtyTheme.colors.light.text.secondary,
          border: '2px solid transparent',
          background: 'transparent',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = categoryColor;
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.boxShadow = cybrtyTheme.shadows.lg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.color = cybrtyTheme.colors.light.text.secondary;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <FAIcon className={icon} size={16} />
        <span>{title}</span>
        <FAIcon className="fas fa-chevron-down" size={10} />
      </a>

      {isOpen && (
        <div
          className="nav-dropdown-content"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: cybrtyTheme.colors.light.primary.card,
            minWidth: '400px',
            boxShadow: cybrtyTheme.shadows.xl,
            borderRadius: cybrtyTheme.borderRadius.modal,
            border: `1px solid ${cybrtyTheme.colors.light.border.color}`,
            zIndex: cybrtyTheme.zIndex.modal,
            marginTop: '0px',
            overflow: 'hidden',
            animation: 'dropdownFadeIn 0.3s ease',
            // Add padding-top to create visual separation without breaking hover
            paddingTop: cybrtyTheme.spacing[2],
          }}
        >
          {/* Dropdown Header */}
          <div
            className="dropdown-header"
            style={{
              padding: `${cybrtyTheme.spacing[4]} ${cybrtyTheme.spacing[6]}`,
              fontWeight: cybrtyTheme.typography.fontWeight.bold,
              fontSize: cybrtyTheme.typography.fontSize.xs,
              color: cybrtyTheme.colors.light.text.primary,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderBottom: `2px solid ${categoryColor}`,
              background: `linear-gradient(135deg, ${categoryColor} 0%, transparent 100%)`,
              backgroundSize: '100% 2px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom',
              display: 'flex',
              alignItems: 'center',
              gap: cybrtyTheme.spacing[3],
              marginTop: `-${cybrtyTheme.spacing[2]}`, // Offset the padding-top from container
            }}
          >
            <div
              className="nist-indicator"
              style={{
                width: '4px',
                height: '24px',
                background: categoryColor,
                borderRadius: '2px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            />
            <span>
              {category === 'identify' && 'ID - Asset & Risk Management'}
              {category === 'protect' && 'PR - Safeguards & Controls'}
              {category === 'detect' && 'DE - Continuous Monitoring'}
              {category === 'respond' && 'RS - Incident Response'}
              {category === 'recover' && 'RC - Recovery & Resilience'}
            </span>
          </div>

          {/* Dropdown Items */}
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="dropdown-item"
              style={{
                color: cybrtyTheme.colors.light.text.secondary,
                padding: `${cybrtyTheme.spacing[4]} ${cybrtyTheme.spacing[6]}`,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: cybrtyTheme.spacing[3],
                fontSize: '0.9rem',
                borderBottom: index < items.length - 1 ? `1px solid ${cybrtyTheme.colors.light.border.light}` : 'none',
                fontWeight: cybrtyTheme.typography.fontWeight.medium,
                minHeight: '60px',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(59, 130, 246, 0.1)`;
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.color = cybrtyTheme.colors.light.text.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.color = cybrtyTheme.colors.light.text.secondary;
              }}
            >
              <FAIcon className={item.icon} size={16} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontWeight: cybrtyTheme.typography.fontWeight.semibold }}>{item.label}</span>
                {item.description && (
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: cybrtyTheme.colors.light.text.muted,
                    lineHeight: '1.3'
                  }}>
                    {item.description}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const CybrtyHeader: React.FC<CybrtyHeaderProps> = ({ 
  isDarkMode = false, 
  onThemeToggle,
  systemStatus = 'operational' 
}) => {

  const nistNavItems = {
    identify: [
      { label: 'Executive Dashboard', icon: 'fas fa-tachometer-alt', href: '/executive-dashboard', description: 'High-level security overview and KPIs' },
      { label: 'Asset Management', icon: 'fas fa-server', href: '/asset-management', description: 'Inventory and categorize organizational assets' },
      { label: 'Risk Assessment', icon: 'fas fa-chart-bar', href: '/risk-assessment', description: 'Identify and evaluate cybersecurity risks' },
      { label: 'Compliance Center', icon: 'fas fa-clipboard-check', href: '/compliance-center', description: 'Regulatory compliance and audit management' },
      { label: 'Business Environment', icon: 'fas fa-building', href: '/business-environment', description: 'Organizational context and critical systems' },
      { label: 'Governance & Strategy', icon: 'fas fa-gavel', href: '/governance', description: 'Cybersecurity policies and governance framework' },
      { label: 'Supply Chain Risk', icon: 'fas fa-truck', href: '/supply-chain', description: 'Third-party and supply chain risk management' },
      { label: 'Risk Management', icon: 'fas fa-balance-scale', href: '/risk-management', description: 'Enterprise risk management processes' },
    ],
    protect: [
      { label: 'Identity & Access Management', icon: 'fas fa-users-cog', href: '/identity-management', description: 'User identity and access controls' },
      { label: 'Data Security & Privacy', icon: 'fas fa-database', href: '/data-security', description: 'Data protection and privacy controls' },
      { label: 'Cloud Security (CSPM)', icon: 'fas fa-cloud-upload-alt', href: '/cloud-security', description: 'Cloud security posture management' },
      { label: 'Network Security', icon: 'fas fa-network-wired', href: '/network-security', description: 'Network segmentation and protection' },
      { label: 'Endpoint Protection', icon: 'fas fa-laptop-medical', href: '/endpoint-protection', description: 'Endpoint security and device management' },
      { label: 'Email & Web Security', icon: 'fas fa-envelope-open-text', href: '/email-web-security', description: 'Email and web-based threat protection' },
      { label: 'Awareness & Training', icon: 'fas fa-graduation-cap', href: '/security-training', description: 'Security awareness and training programs' },
      { label: 'Maintenance & Updates', icon: 'fas fa-tools', href: '/maintenance', description: 'System maintenance and patch management' },
      { label: 'Protective Technology', icon: 'fas fa-shield-virus', href: '/protective-technology', description: 'Security tools and defensive technologies' },
    ],
    detect: [
      { label: 'Security Operations Center', icon: 'fas fa-desktop', href: '/security-operations', description: '24/7 SOC operations and monitoring' },
      { label: 'SIEM & Log Management', icon: 'fas fa-file-alt', href: '/siem-logs', description: 'Security information and event management' },
      { label: 'Threat Detection & Hunting', icon: 'fas fa-search', href: '/threat-hunting', description: 'Proactive threat detection and hunting' },
      { label: 'Vulnerability Management', icon: 'fas fa-bug', href: '/vulnerability-management', description: 'Vulnerability assessment and remediation' },
      { label: 'Penetration Testing', icon: 'fas fa-user-secret', href: '/penetration-testing', description: 'Ethical hacking and security testing' },
      { label: 'Red Team Exercises', icon: 'fas fa-crosshairs', href: '/red-team-exercises', description: 'Advanced adversary simulation' },
      { label: 'Threat Intelligence', icon: 'fas fa-brain', href: '/threat-intelligence', description: 'Cyber threat intelligence and analysis' },
      { label: 'Anomaly Detection', icon: 'fas fa-exclamation-triangle', href: '/anomaly-detection', description: 'Behavioral analytics and anomaly detection' },
      { label: 'Continuous Monitoring', icon: 'fas fa-eye', href: '/continuous-monitoring', description: 'Real-time security monitoring' },
      { label: 'EDR/XDR Platform', icon: 'fas fa-laptop', href: '/edr-xdr', description: 'Extended detection and response' },
    ],
    respond: [
      { label: 'Incident Response', icon: 'fas fa-ambulance', href: '/incident-response', description: 'Security incident management and response' },
      { label: 'Digital Forensics', icon: 'fas fa-search-plus', href: '/digital-forensics', description: 'Digital evidence collection and analysis' },
      { label: 'Malware Analysis', icon: 'fas fa-virus', href: '/malware-analysis', description: 'Malware reverse engineering and analysis' },
      { label: 'Crisis Management', icon: 'fas fa-exclamation-circle', href: '/crisis-management', description: 'Crisis communication and management' },
      { label: 'Response Planning', icon: 'fas fa-clipboard-list', href: '/response-planning', description: 'Incident response procedures and playbooks' },
      { label: 'Threat Containment', icon: 'fas fa-hand-paper', href: '/threat-containment', description: 'Threat isolation and containment' },
      { label: 'Communications', icon: 'fas fa-comments', href: '/incident-communications', description: 'Incident communication protocols' },
      { label: 'Legal & Regulatory', icon: 'fas fa-balance-scale-right', href: '/legal-regulatory', description: 'Legal and regulatory incident response' },
      { label: 'Lessons Learned', icon: 'fas fa-lightbulb', href: '/lessons-learned', description: 'Post-incident analysis and improvements' },
    ],
    recover: [
      { label: 'Business Continuity', icon: 'fas fa-business-time', href: '/business-continuity', description: 'Business continuity planning and execution' },
      { label: 'Disaster Recovery', icon: 'fas fa-heartbeat', href: '/disaster-recovery', description: 'IT disaster recovery and restoration' },
      { label: 'Recovery Planning', icon: 'fas fa-redo', href: '/recovery-planning', description: 'Recovery strategy and planning' },
      { label: 'Backup & Restore', icon: 'fas fa-hdd', href: '/backup-restore', description: 'Data backup and restoration services' },
      { label: 'System Recovery', icon: 'fas fa-server', href: '/system-recovery', description: 'Infrastructure and system recovery' },
      { label: 'Recovery Testing', icon: 'fas fa-vial', href: '/recovery-testing', description: 'Recovery plan testing and validation' },
      { label: 'Recovery Communications', icon: 'fas fa-bullhorn', href: '/recovery-communications', description: 'Recovery status communication' },
      { label: 'Recovery Improvements', icon: 'fas fa-chart-line', href: '/recovery-improvements', description: 'Recovery process enhancement' },
    ],
  };

  // Helper functions for system status
  const getStatusColor = () => {
    const colors = {
      operational: cybrtyTheme.colors.light.accent.success,
      warning: cybrtyTheme.colors.light.accent.warning,
      error: cybrtyTheme.colors.light.accent.danger,
    };
    return colors[systemStatus || 'operational'];
  };

  const getStatusIcon = () => {
    const icons = {
      operational: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-exclamation-triangle',
    };
    return icons[systemStatus || 'operational'];
  };

  const getStatusText = () => {
    const texts = {
      operational: 'All Systems Operational',
      warning: 'Minor Issues Detected',
      error: 'Critical Issues',
    };
    return texts[systemStatus || 'operational'];
  };

  return (
    <>
      {/* CSS Styles */}
      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-item {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .nav-item:hover {
          transform: translateY(-2px);
        }
        
        .dropdown-item {
          transition: all 0.2s ease;
        }
        
        .dropdown-item:hover {
          background: rgba(59, 130, 246, 0.1) !important;
          transform: translateX(4px) !important;
        }
        
        .theme-toggle:hover {
          transform: scale(1.1) rotate(15deg);
        }
        
        .status-indicator:hover {
          transform: translateY(-2px);
        }
        
        /* Enhanced dropdown hover area */
        .nav-dropdown {
          position: relative;
        }
        
        .nav-dropdown-content {
          /* Remove any margin that could create a gap */
          margin-top: 0 !important;
        }
        
        /* Create a bridge for seamless hover */
        .nav-dropdown::before {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 4px;
          background: transparent;
          z-index: 999;
        }
      `}</style>

      <header
        className="header"
        style={{
          background: cybrtyTheme.colors.light.header.bg,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${cybrtyTheme.colors.light.border.color}`,
          padding: `${cybrtyTheme.spacing[4]} 0`,
          position: 'sticky',
          top: 0,
          zIndex: cybrtyTheme.zIndex.modal,
          transition: cybrtyTheme.transitions.base,
          boxShadow: cybrtyTheme.shadows.sm,
        }}
      >
        <div
          className="container"
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: `0 ${cybrtyTheme.spacing[8]}`,
          }}
        >
          <div
            className="header-content"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Logo */}
            <a
              href="executive-dashboard.html"
              className="logo"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: cybrtyTheme.spacing[3],
                fontSize: cybrtyTheme.typography.fontSize['2xl'],
                fontWeight: cybrtyTheme.typography.fontWeight.extrabold,
                color: cybrtyTheme.colors.light.accent.primary,
                textDecoration: 'none',
                transition: cybrtyTheme.transitions.base,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FAIcon className="fas fa-shield-alt" size={32} />
              <span>Cybrty</span>
            </a>

            {/* Navigation */}
            <nav
              className="nav"
              style={{
                display: 'flex',
                gap: cybrtyTheme.spacing[1],
                alignItems: 'center',
                background: `linear-gradient(135deg, ${cybrtyTheme.colors.light.primary.bg} 0%, ${cybrtyTheme.colors.light.primary.secondary} 100%)`,
                padding: `${cybrtyTheme.spacing[2]} ${cybrtyTheme.spacing[4]}`,
                borderRadius: cybrtyTheme.borderRadius.modal,
                border: `1px solid ${cybrtyTheme.colors.light.border.color}`,
                boxShadow: cybrtyTheme.shadows.sm,
              }}
            >
              {/* NIST Framework Badge */}
              <div style={{
                background: cybrtyTheme.colors.light.accent.primary,
                color: '#ffffff',
                padding: `${cybrtyTheme.spacing[1]} ${cybrtyTheme.spacing[3]}`,
                borderRadius: cybrtyTheme.borderRadius.button,
                fontSize: '0.75rem',
                fontWeight: cybrtyTheme.typography.fontWeight.bold,
                letterSpacing: '0.5px',
                marginRight: cybrtyTheme.spacing[3],
                display: 'flex',
                alignItems: 'center',
                gap: cybrtyTheme.spacing[1],
              }}>
                <FAIcon className="fas fa-certificate" size={12} />
                <span>NIST CSF v2.0 ✓</span>
              </div>
              
              {/* NIST Framework Navigation */}
              <NavDropdown
                title="Identify"
                icon="fas fa-search"
                category="identify"
                items={nistNavItems.identify}
              />

              <NavDropdown
                title="Protect"
                icon="fas fa-shield-alt"
                category="protect"
                items={nistNavItems.protect}
              />

              <NavDropdown
                title="Detect"
                icon="fas fa-radar"
                category="detect"
                items={nistNavItems.detect}
              />

              <NavDropdown
                title="Respond"
                icon="fas fa-fire-extinguisher"
                category="respond"
                items={nistNavItems.respond}
              />

              <NavDropdown
                title="Recover"
                icon="fas fa-redo-alt"
                category="recover"
                items={nistNavItems.recover}
              />
            </nav>

            {/* Header Controls */}
            <div
              className="header-controls"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: cybrtyTheme.spacing[4],
              }}
            >
              {/* Theme Toggle */}
              <button
                className="theme-toggle"
                onClick={onThemeToggle}
                style={{
                  background: cybrtyTheme.colors.light.primary.card,
                  border: `2px solid ${cybrtyTheme.colors.light.border.color}`,
                  color: cybrtyTheme.colors.light.text.primary,
                  padding: cybrtyTheme.spacing[3],
                  borderRadius: cybrtyTheme.borderRadius.button,
                  cursor: 'pointer',
                  fontSize: cybrtyTheme.typography.fontSize.lg,
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: cybrtyTheme.shadows.sm,
                  transition: cybrtyTheme.transitions.base,
                }}
                title="Toggle Light/Dark Theme"
              >
                <FAIcon 
                  className={isDarkMode ? "fas fa-sun" : "fas fa-moon"} 
                  size={20} 
                />
              </button>

              {/* System Status */}
              <div
                className="status-indicator"
                style={{
                  background: `linear-gradient(135deg, ${getStatusColor()} 0%, ${getStatusColor()}99 100%)`,
                  color: '#ffffff',
                  padding: `${cybrtyTheme.spacing[3]} ${cybrtyTheme.spacing[6]}`,
                  borderRadius: cybrtyTheme.borderRadius.button,
                  fontSize: cybrtyTheme.typography.fontSize.sm,
                  fontWeight: cybrtyTheme.typography.fontWeight.semibold,
                  display: 'flex',
                  alignItems: 'center',
                  gap: cybrtyTheme.spacing[2],
                  border: 'none',
                  boxShadow: cybrtyTheme.shadows.md,
                  cursor: 'pointer',
                  transition: cybrtyTheme.transitions.base,
                }}
              >
                <FAIcon className={getStatusIcon()} size={16} />
                <span>{getStatusText()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default CybrtyHeader;