import '../styles/simplified.css';

export default function Assets() {
  return (
    <div className="main" style={{ background: 'var(--primary-bg)', minHeight: '100vh' }}>
      <div className="container">
        <section className="hero">
          <h1>
            <span className="brand">Asset Management</span> (ID.AM)
          </h1>
          <p>
            Comprehensive asset inventory, classification, and management for your cybersecurity posture. Track hardware, software, data, and personnel assets across your organization.
          </p>
        </section>

        <section className="workspace-section">
          <h2 className="section-title">Asset Management Capabilities</h2>
          
          <div className="workspace-grid">
            <div className="workspace-card assets">
              <div className="card-header">
                <div className="card-icon">💻</div>
                <div>
                  <h3 className="card-title">Hardware Assets</h3>
                  <p className="card-subtitle">Physical Device Inventory</p>
                </div>
              </div>
              <p className="card-description">
                Complete inventory of servers, workstations, network devices, IoT devices, and mobile equipment with ownership and criticality classification.
              </p>
              <div className="card-tags">
                <span className="tag">Servers</span>
                <span className="tag">Workstations</span>
                <span className="tag">Network Devices</span>
              </div>
            </div>

            <div className="workspace-card assets">
              <div className="card-header">
                <div className="card-icon">⚙️</div>
                <div>
                  <h3 className="card-title">Software Assets</h3>
                  <p className="card-subtitle">Application & License Management</p>
                </div>
              </div>
              <p className="card-description">
                Track operating systems, applications, databases, and third-party software with version control, licensing, and vulnerability status.
              </p>
              <div className="card-tags">
                <span className="tag">Applications</span>
                <span className="tag">Licenses</span>
                <span className="tag">Versions</span>
              </div>
            </div>

            <div className="workspace-card assets">
              <div className="card-header">
                <div className="card-icon">📊</div>
                <div>
                  <h3 className="card-title">Data Assets</h3>
                  <p className="card-subtitle">Information Classification</p>
                </div>
              </div>
              <p className="card-description">
                Classify and catalog data assets based on sensitivity, regulatory requirements, and business criticality with proper data governance.
              </p>
              <div className="card-tags">
                <span className="tag">Classification</span>
                <span className="tag">Governance</span>
                <span className="tag">Compliance</span>
              </div>
            </div>

            <div className="workspace-card assets">
              <div className="card-header">
                <div className="card-icon">👥</div>
                <div>
                  <h3 className="card-title">Personnel Assets</h3>
                  <p className="card-subtitle">Human Resources & Access</p>
                </div>
              </div>
              <p className="card-description">
                Manage personnel with access privileges, roles, responsibilities, and security clearance levels for comprehensive access control.
              </p>
              <div className="card-tags">
                <span className="tag">Personnel</span>
                <span className="tag">Roles</span>
                <span className="tag">Access Rights</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
