import React from 'react';

const AssetManagement: React.FC = () => {
  return (
    <div className="container">
      <section className="hero">
        <h1>Asset Management</h1>
        <p>Comprehensive asset discovery, inventory, and management for your cybersecurity infrastructure</p>
        
        <div className="hero-stats">
          <div className="stat-badge">
            <span className="stat-value">1,247</span>
            <div className="stat-label">🖥️ Total Assets</div>
          </div>
          <div className="stat-badge">
            <span className="stat-value">98.5%</span>
            <div className="stat-label">✅ Discovery Rate</div>
          </div>
          <div className="stat-badge">
            <span className="stat-value">24/7</span>
            <div className="stat-label">🔄 Monitoring</div>
          </div>
        </div>
      </section>

      <section className="workspace-section">
        <h2 className="section-title">Asset Categories</h2>
        
        <div className="workspace-grid">
          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">🖥️</div>
              <div>
                <h3 className="card-title">IT Infrastructure</h3>
                <p className="card-subtitle">Servers, Networks & Endpoints</p>
              </div>
            </div>
            <p className="card-description">
              Comprehensive inventory of servers, network devices, workstations, and mobile devices with real-time status monitoring.
            </p>
            <div className="card-tags">
              <span className="tag">Servers: 245</span>
              <span className="tag">Endpoints: 892</span>
              <span className="tag">Network: 110</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">☁️</div>
              <div>
                <h3 className="card-title">Cloud Assets</h3>
                <p className="card-subtitle">AWS, Azure & GCP Resources</p>
              </div>
            </div>
            <p className="card-description">
              Multi-cloud asset discovery and management across AWS, Azure, Google Cloud Platform, and hybrid environments.
            </p>
            <div className="card-tags">
              <span className="tag">AWS: 156</span>
              <span className="tag">Azure: 89</span>
              <span className="tag">GCP: 42</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">📱</div>
              <div>
                <h3 className="card-title">Mobile Devices</h3>
                <p className="card-subtitle">BYOD & Corporate Devices</p>
              </div>
            </div>
            <p className="card-description">
              Mobile device management for corporate and BYOD devices including tablets, smartphones, and IoT devices.
            </p>
            <div className="card-tags">
              <span className="tag">iOS: 234</span>
              <span className="tag">Android: 178</span>
              <span className="tag">IoT: 67</span>
            </div>
          </div>

          <div className="workspace-card">
            <div className="card-header">
              <div className="card-icon">💾</div>
              <div>
                <h3 className="card-title">Data Assets</h3>
                <p className="card-subtitle">Databases & File Systems</p>
              </div>
            </div>
            <p className="card-description">
              Data classification, location tracking, and protection status for structured and unstructured data assets.
            </p>
            <div className="card-tags">
              <span className="tag">Databases: 45</span>
              <span className="tag">File Shares: 123</span>
              <span className="tag">Archives: 78</span>
            </div>
          </div>
        </div>
      </section>

      <section className="quick-actions">
        <h2 className="section-title">Asset Management Actions</h2>
        
        <div className="actions-grid">
          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-primary)' }}>
              🔍
            </div>
            <h3 className="action-title">Asset Discovery</h3>
            <p className="action-description">Initiate comprehensive network and cloud asset discovery scan</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-success)' }}>
              📋
            </div>
            <h3 className="action-title">Generate Inventory</h3>
            <p className="action-description">Export detailed asset inventory reports for compliance</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-warning)' }}>
              🔧
            </div>
            <h3 className="action-title">Asset Configuration</h3>
            <p className="action-description">Review and update asset configuration baselines</p>
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ color: 'var(--accent-purple)' }}>
              📊
            </div>
            <h3 className="action-title">Risk Assessment</h3>
            <p className="action-description">Analyze asset criticality and security risk levels</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssetManagement;
