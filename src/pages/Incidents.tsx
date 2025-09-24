import '../styles/simplified.css';

export default function Incidents() {
  return (
    <div className="main" style={{ background: 'var(--primary-bg)', minHeight: '100vh' }}>
      <div className="container">
        <section className="hero">
          <h1>
            <span className="brand">Incident Response</span> Management
          </h1>
          <p>
            Comprehensive incident detection, response, and recovery capabilities with automated playbooks, real-time collaboration, and forensic analysis tools.
          </p>
        </section>

        <section className="workspace-section">
          <h2 className="section-title">Active Incident Management</h2>
          
          <div className="workspace-grid">
            <div className="workspace-card incidents">
              <div className="card-header">
                <div className="card-icon">🚨</div>
                <div>
                  <h3 className="card-title">Critical Incidents</h3>
                  <p className="card-subtitle">High Priority Response</p>
                </div>
              </div>
              <p className="card-description">
                Immediate response required for security breaches, system compromises, and critical infrastructure failures with automated escalation.
              </p>
              <div className="card-tags">
                <span className="tag">High Priority</span>
                <span className="tag">Auto-Escalation</span>
                <span className="tag">24/7 Response</span>
              </div>
            </div>

            <div className="workspace-card incidents">
              <div className="card-header">
                <div className="card-icon">⚠️</div>
                <div>
                  <h3 className="card-title">Medium Incidents</h3>
                  <p className="card-subtitle">Standard Response Protocols</p>
                </div>
              </div>
              <p className="card-description">
                Security events requiring investigation and response within standard SLA timeframes with documented procedures and team coordination.
              </p>
              <div className="card-tags">
                <span className="tag">Standard SLA</span>
                <span className="tag">Investigation</span>
                <span className="tag">Team Response</span>
              </div>
            </div>

            <div className="workspace-card incidents">
              <div className="card-header">
                <div className="card-icon">🔍</div>
                <div>
                  <h3 className="card-title">Forensic Analysis</h3>
                  <p className="card-subtitle">Evidence Collection & Analysis</p>
                </div>
              </div>
              <p className="card-description">
                Digital forensics capabilities for evidence preservation, timeline reconstruction, and detailed analysis of security incidents.
              </p>
              <div className="card-tags">
                <span className="tag">Evidence</span>
                <span className="tag">Timeline</span>
                <span className="tag">Analysis</span>
              </div>
            </div>

            <div className="workspace-card incidents">
              <div className="card-header">
                <div className="card-icon">📋</div>
                <div>
                  <h3 className="card-title">Response Playbooks</h3>
                  <p className="card-subtitle">Automated Response Procedures</p>
                </div>
              </div>
              <p className="card-description">
                Pre-defined response procedures and automated workflows for common incident types with role-based task assignments and escalation paths.
              </p>
              <div className="card-tags">
                <span className="tag">Automation</span>
                <span className="tag">Workflows</span>
                <span className="tag">Role-Based</span>
              </div>
            </div>
          </div>
        </section>

        <section className="status-grid">
          <div className="status-card status-danger">
            <div className="status-value" style={{ color: 'var(--accent-danger)' }}>3</div>
            <div className="status-label">🚨 Critical Incidents</div>
            <div className="status-trend" style={{ color: 'var(--accent-danger)' }}>Immediate attention required</div>
          </div>
          
          <div className="status-card status-warning">
            <div className="status-value" style={{ color: 'var(--accent-warning)' }}>8</div>
            <div className="status-label">⚠️ Medium Priority</div>
            <div className="status-trend" style={{ color: 'var(--accent-warning)' }}>Under investigation</div>
          </div>
          
          <div className="status-card status-secure">
            <div className="status-value" style={{ color: 'var(--accent-success)' }}>24</div>
            <div className="status-label">✅ Resolved Today</div>
            <div className="status-trend" style={{ color: 'var(--accent-success)' }}>Average resolution time: 2.3h</div>
          </div>
          
          <div className="status-card status-info">
            <div className="status-value" style={{ color: 'var(--accent-primary)' }}>156</div>
            <div className="status-label">📊 Total This Month</div>
            <div className="status-trend" style={{ color: 'var(--accent-primary)' }}>15% decrease from last month</div>
          </div>
        </section>
      </div>
    </div>
  );
}
