import React from 'react';

const ExecutiveDashboard: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1>Executive Dashboard</h1>
        <p>Strategic cybersecurity insights and metrics for executive leadership and board reporting</p>
        
        <div className="hero-stats">
          <div className="stat-badge">
            <span className="stat-value">87%</span>
            <div className="stat-label">🛡️ Security Posture</div>
          </div>
          <div className="stat-badge">
            <span className="stat-value">$2.4M</span>
            <div className="stat-label">💰 Risk Exposure</div>
          </div>
          <div className="stat-badge">
            <span className="stat-value">94%</span>
            <div className="stat-label">✅ Compliance</div>
          </div>
        </div>
      </section>

      <section className="workspace-section">
        <h2 className="section-title">Executive Metrics</h2>
        
        <div className="workspace-grid">
          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">📈</div>
              <div>
                <h3 className="card-title">Risk Trends</h3>
                <p className="card-subtitle">30-Day Risk Analysis</p>
              </div>
            </div>
            <p className="card-description">
              Strategic risk trend analysis showing organization-wide cybersecurity risk exposure over time with predictive insights.
            </p>
            <div className="card-tags">
              <span className="tag">↓ 12% This Month</span>
              <span className="tag">Critical: 3</span>
              <span className="tag">High: 15</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🎯</div>
              <div>
                <h3 className="card-title">Compliance Status</h3>
                <p className="card-subtitle">Regulatory Framework</p>
              </div>
            </div>
            <p className="card-description">
              Real-time compliance status across all applicable frameworks including SOX, GDPR, HIPAA, and industry standards.
            </p>
            <div className="card-tags">
              <span className="tag">SOX: 98%</span>
              <span className="tag">GDPR: 91%</span>
              <span className="tag">HIPAA: 96%</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">💼</div>
              <div>
                <h3 className="card-title">Security Investments</h3>
                <p className="card-subtitle">Budget & ROI Analysis</p>
              </div>
            </div>
            <p className="card-description">
              Security spending analysis, ROI metrics, and recommendations for strategic cybersecurity investments.
            </p>
            <div className="card-tags">
              <span className="tag">Budget: $5.2M</span>
              <span className="tag">ROI: 340%</span>
              <span className="tag">Savings: $1.8M</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🌐</div>
              <div>
                <h3 className="card-title">Threat Landscape</h3>
                <p className="card-subtitle">Industry Intelligence</p>
              </div>
            </div>
            <p className="card-description">
              Strategic threat intelligence relevant to your industry sector with impact assessment and mitigation recommendations.
            </p>
            <div className="card-tags">
              <span className="tag">APT Groups: 8</span>
              <span className="tag">Sector Risk: High</span>
              <span className="tag">Campaigns: 23</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <h2 className="section-title">Executive Actions</h2>
        
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-primary)' }}>
              📊
            </div>
            <h3 className="action-title">Board Report</h3>
            <p className="action-description">Generate comprehensive cybersecurity board presentation</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-success)' }}>
              💰
            </div>
            <h3 className="action-title">Budget Planning</h3>
            <p className="action-description">Cybersecurity budget analysis and recommendations</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-warning)' }}>
              🎯
            </div>
            <h3 className="action-title">Risk Assessment</h3>
            <p className="action-description">Strategic risk assessment and mitigation planning</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-purple)' }}>
              📋
            </div>
            <h3 className="action-title">Compliance Review</h3>
            <p className="action-description">Regulatory compliance gap analysis and roadmap</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveDashboard;
