import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>, action: string) => {
    // Create ripple effect on click
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

  const workspaceCards = [
    {
      id: 'executive-dashboard',
      title: 'Executive Dashboard',
      subtitle: 'C-Suite Security Overview',
      icon: '📊',
      description: 'High-level security metrics, risk posture, compliance status, and strategic security insights for executive leadership.',
      tags: ['KPIs', 'Risk Score', 'Compliance'],
      color: '#2563eb'
    },
    {
      id: 'penetration-testing',
      title: 'Penetration Testing',
      subtitle: 'Security Assessment & Testing',
      icon: '🔒',
      description: 'Automated and manual penetration testing, vulnerability assessments, red team exercises, and continuous security validation.',
      tags: ['Pen Testing', 'Red Team', 'Vulnerability Assessment'],
      color: '#dc2626'
    },
    {
      id: 'asset-management',
      title: 'Asset Management',
      subtitle: 'Inventory & Vulnerability Assessment',
      icon: '💻',
      description: 'Complete asset discovery, vulnerability management, risk scoring, patch management, and software composition analysis (SBOM) tracking.',
      tags: ['Discovery', 'SBOM', 'Patch Mgmt'],
      color: '#059669'
    },
    {
      id: 'compliance',
      title: 'Compliance Center',
      subtitle: 'GRC & Regulatory Management',
      icon: '📋',
      description: 'Multi-framework compliance tracking (NIST, SOC 2, ISO 27001, GDPR), audit management, policy governance, and automated compliance reporting.',
      tags: ['NIST', 'SOC 2', 'ISO 27001'],
      color: '#7c3aed'
    },
    {
      id: 'identity',
      title: 'Identity & Access',
      subtitle: 'IAM & Zero Trust',
      icon: '👥',
      description: 'Advanced identity governance, privileged access management, zero-trust implementation, MFA enforcement, and user behavior analytics.',
      tags: ['Zero Trust', 'PAM', 'SSO/MFA'],
      color: '#0891b2'
    },
    {
      id: 'vulnerabilities',
      title: 'Vulnerability Management',
      subtitle: 'Risk Assessment & Mitigation',
      icon: '🚨',
      description: 'Continuous vulnerability scanning, risk prioritization, automated patching workflows, and vulnerability lifecycle management.',
      tags: ['CVE Tracking', 'Risk Scoring', 'Auto-Patching'],
      color: '#d97706'
    },
    {
      id: 'incidents',
      title: 'Incident Response',
      subtitle: 'SOAR & Digital Forensics',
      icon: '🚁',
      description: 'Security orchestration, automated response, digital forensics, incident management, and post-incident analysis capabilities.',
      tags: ['SOAR', 'Forensics', 'Playbooks'],
      color: '#e11d48'
    }
  ];

  return (
    <div style={{ 
      padding: '2rem 0',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Hero Section */}
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#1e293b',
          marginBottom: '1rem'
        }}>
          Welcome to <span style={{ color: '#2563eb' }}>Cybrty</span> Security Operations
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#64748b',
          maxWidth: '800px',
          margin: '0 auto 2rem',
          lineHeight: '1.6'
        }}>
          AI-Orchestrated Cybersecurity Platform providing comprehensive protection, threat detection, and compliance management for your organization
        </p>
        
        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {[
            { value: '420+', label: '🛡️ Assets Protected' },
            { value: '87.5%', label: '✅ Compliance Score' },
            { value: '24/7', label: '🎯 AI Monitoring' },
            { value: '12', label: '🚨 Active Alerts' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#2563eb',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#64748b'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workspace Cards Grid */}
      <section>
        <h2 style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          color: '#1e293b',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Security Workspaces
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {workspaceCards.map((card) => (
            <div
              key={card.id}
              onClick={(e) => handleCardClick(e, card.id)}
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = card.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  background: `${card.color}15`,
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: `2px solid ${card.color}30`
                }}>
                  {card.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#1e293b',
                    marginBottom: '0.25rem'
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontSize: '0.875rem',
                    color: card.color,
                    fontWeight: '600'
                  }}>
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1rem',
                fontSize: '0.95rem'
              }}>
                {card.description}
              </p>

              {/* Tags */}
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      background: `${card.color}15`,
                      color: card.color,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: `1px solid ${card.color}30`
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;