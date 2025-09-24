import React from 'react';

const ComplianceCenter: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1>Compliance Center</h1>
        <p>Comprehensive compliance management across all regulatory frameworks and industry standards</p>
        
        <div className="hero-stats">
          <div className="stat-badge">
            <span className="stat-value">94.2%</span>
            <div className="stat-label">✅ Overall Compliance</div>
          </div>
          <div className="stat-badge">
            <span className="stat-value">12</span>
            <div className="stat-label">📋 Frameworks</div>
          </div>
          <div className="stat-badge">
            <span className="stat-value">3</span>
            <div className="stat-label">⚠️ Gaps</div>
          </div>
        </div>
      </section>

      <section className="workspace-section">
        <h2 className="section-title">Compliance Frameworks</h2>
        
        <div className="workspace-grid">
          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🏛️</div>
              <div>
                <h3 className="card-title">SOX Compliance</h3>
                <p className="card-subtitle">Sarbanes-Oxley Act</p>
              </div>
            </div>
            <p className="card-description">
              Internal controls over financial reporting with comprehensive audit trails and access controls.
            </p>
            <div className="card-tags">
              <span className="tag" style={{ background: 'var(--gradient-success)' }}>98% Complete</span>
              <span className="tag">302 Controls</span>
              <span className="tag">404 Assessment</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🇪🇺</div>
              <div>
                <h3 className="card-title">GDPR Compliance</h3>
                <p className="card-subtitle">General Data Protection Regulation</p>
              </div>
            </div>
            <p className="card-description">
              Data protection and privacy compliance including consent management and breach notification procedures.
            </p>
            <div className="card-tags">
              <span className="tag" style={{ background: 'var(--gradient-warning)' }}>91% Complete</span>
              <span className="tag">Data Mapping</span>
              <span className="tag">Privacy Rights</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🏥</div>
              <div>
                <h3 className="card-title">HIPAA Compliance</h3>
                <p className="card-subtitle">Health Insurance Portability</p>
              </div>
            </div>
            <p className="card-description">
              Healthcare data protection with PHI safeguards, access controls, and audit logging requirements.
            </p>
            <div className="card-tags">
              <span className="tag" style={{ background: 'var(--gradient-success)' }}>96% Complete</span>
              <span className="tag">PHI Protection</span>
              <span className="tag">Audit Logs</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🛡️</div>
              <div>
                <h3 className="card-title">NIST Cybersecurity</h3>
                <p className="card-subtitle">Framework Implementation</p>
              </div>
            </div>
            <p className="card-description">
              NIST Cybersecurity Framework implementation across Identify, Protect, Detect, Respond, and Recover functions.
            </p>
            <div className="card-tags">
              <span className="tag" style={{ background: 'var(--gradient-success)' }}>87% Complete</span>
              <span className="tag">5 Functions</span>
              <span className="tag">108 Subcategories</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">☁️</div>
              <div>
                <h3 className="card-title">SOC 2 Type II</h3>
                <p className="card-subtitle">Service Organization Controls</p>
              </div>
            </div>
            <p className="card-description">
              Trust services criteria for Security, Availability, Processing Integrity, Confidentiality, and Privacy.
            </p>
            <div className="card-tags">
              <span className="tag" style={{ background: 'var(--gradient-success)' }}>93% Complete</span>
              <span className="tag">5 Criteria</span>
              <span className="tag">Continuous Monitoring</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🔒</div>
              <div>
                <h3 className="card-title">ISO 27001</h3>
                <p className="card-subtitle">Information Security Management</p>
              </div>
            </div>
            <p className="card-description">
              International standard for information security management systems with 114 security controls.
            </p>
            <div className="card-tags">
              <span className="tag" style={{ background: 'var(--gradient-warning)' }}>89% Complete</span>
              <span className="tag">14 Domains</span>
              <span className="tag">114 Controls</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <h2 className="section-title">Compliance Actions</h2>
        
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-primary)' }}>
              📊
            </div>
            <h3 className="action-title">Compliance Report</h3>
            <p className="action-description">Generate comprehensive compliance status report</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-success)' }}>
              🔍
            </div>
            <h3 className="action-title">Gap Analysis</h3>
            <p className="action-description">Identify and prioritize compliance gaps</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-warning)' }}>
              📋
            </div>
            <h3 className="action-title">Control Assessment</h3>
            <p className="action-description">Evaluate security control effectiveness</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-purple)' }}>
              📅
            </div>
            <h3 className="action-title">Audit Preparation</h3>
            <p className="action-description">Prepare for external compliance audits</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComplianceCenter;
