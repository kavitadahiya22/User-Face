import React, { useState, useEffect, useCallback } from 'react';
import { initializeEffects } from '../utils/effects';
import TargetConfigPanel from '../components/pentest/TargetConfigPanel';
import ScanConfigWizard from '../components/pentest/ScanConfigWizard';
import { 
  PentestWorkflowState, 
  ScanConfig
} from '../types/pentest';
import { pentestApi } from '../services/pentestApi';

const PenetrationTesting: React.FC = () => {
  const [workflowState, setWorkflowState] = useState<PentestWorkflowState>({
    currentStep: 'config',
    targets: [],
    isLoading: false
  });

  const [targetsValid, setTargetsValid] = useState(false);
  const [targetErrors, setTargetErrors] = useState<string[]>([]);

  useEffect(() => {
    initializeEffects();
  }, []);

  // Default scan configuration
  const defaultScanConfig: ScanConfig = {
    depth: 'standard',
    features: ['recon', 'vuln', 'web'],
    simulate: true,
    constraints: {
      exclude_destructive: true,
      rate_limiting: true,
      stealth_mode: false
    }
  };

  // Mock available features (in real app, fetch from API)
  const availableFeatures = [
    { id: 'recon', name: 'Reconnaissance', description: 'Network and service discovery', category: 'Discovery', risk_level: 'low' as const, estimated_time: 10 },
    { id: 'vuln', name: 'Vulnerability Scanning', description: 'Automated vulnerability detection', category: 'Assessment', risk_level: 'medium' as const, estimated_time: 30 },
    { id: 'web', name: 'Web Application Testing', description: 'OWASP Top 10 and web security testing', category: 'Web Security', risk_level: 'medium' as const, estimated_time: 45 },
    { id: 'exploit', name: 'Exploitation', description: 'Safe exploitation attempts', category: 'Exploitation', risk_level: 'high' as const, estimated_time: 60 },
    { id: 'creds', name: 'Credential Testing', description: 'Authentication and password testing', category: 'Authentication', risk_level: 'medium' as const, estimated_time: 30 },
    { id: 'lateral', name: 'Lateral Movement', description: 'Network traversal simulation', category: 'Post-Exploitation', risk_level: 'high' as const, estimated_time: 45 }
  ];

  const handleTargetsChange = useCallback((targets: string[]) => {
    setWorkflowState(prev => ({ ...prev, targets }));
  }, []);

  const handleTargetValidation = useCallback((isValid: boolean, errors: string[]) => {
    setTargetsValid(isValid);
    setTargetErrors(errors);
  }, []);

  const handleConfigChange = useCallback((scanConfig: ScanConfig) => {
    setWorkflowState(prev => ({ ...prev, scanConfig }));
  }, []);

  const handleGeneratePlan = useCallback(async () => {
    if (!workflowState.scanConfig || !targetsValid) return;

    setWorkflowState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const planRequest = {
        targets: workflowState.targets,
        depth: workflowState.scanConfig.depth,
        features: workflowState.scanConfig.features,
        simulate: workflowState.scanConfig.simulate,
        tenant_id: 'demo-tenant' // In real app, get from auth context
      };

      const plan = await pentestApi.generatePlan(planRequest);
      setWorkflowState(prev => ({
        ...prev,
        plan,
        currentStep: 'plan',
        isLoading: false
      }));
    } catch (error) {
      setWorkflowState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to generate plan',
        isLoading: false
      }));
    }
  }, [workflowState.scanConfig, workflowState.targets, targetsValid]);

  const handleExecutePlan = useCallback(async () => {
    if (!workflowState.plan || !workflowState.scanConfig) return;

    setWorkflowState(prev => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const runRequest = {
        tenant_id: 'demo-tenant',
        inputs: {
          targets: workflowState.targets,
          depth: workflowState.scanConfig.depth,
          features: workflowState.scanConfig.features,
          simulate: workflowState.scanConfig.simulate
        },
        plan_id: workflowState.plan.plan_id
      };

      const runResponse = await pentestApi.executePlan(runRequest);
      setWorkflowState(prev => ({
        ...prev,
        runId: runResponse.run_id,
        currentStep: 'execute',
        isLoading: false
      }));
    } catch (error) {
      setWorkflowState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to execute plan',
        isLoading: false
      }));
    }
  }, [workflowState.plan, workflowState.scanConfig, workflowState.targets]);

  const handleBackToConfig = () => {
    setWorkflowState(prev => ({ ...prev, currentStep: 'config' }));
  };

  const handleBackToPlan = () => {
    setWorkflowState(prev => ({ ...prev, currentStep: 'plan' }));
  };

  const renderStepContent = () => {
    switch (workflowState.currentStep) {
      case 'config':
        return (
          <div className="step-container">
            <div className="step-header">
              <h2 className="step-title">
                <i className="fas fa-cog step-icon"></i>
                Configuration
              </h2>
              <p className="step-description">
                Configure your penetration testing targets and scan parameters.
              </p>
            </div>

            <div className="config-grid">
              <div className="config-section">
                <TargetConfigPanel
                  onTargetsChange={handleTargetsChange}
                  onValidation={handleTargetValidation}
                  allowedFormats={['ip', 'domain', 'url', 'cidr']}
                  initialTargets={workflowState.targets}
                />
              </div>

              <div className="config-section">
                <ScanConfigWizard
                  onConfigChange={handleConfigChange}
                  availableFeatures={availableFeatures}
                  defaultConfig={workflowState.scanConfig || defaultScanConfig}
                  onNext={handleGeneratePlan}
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="step-actions">
              <button
                onClick={handleGeneratePlan}
                disabled={!targetsValid || !workflowState.scanConfig || workflowState.isLoading}
                className={`btn-primary btn-large ${!targetsValid || !workflowState.scanConfig ? 'disabled' : ''}`}
              >
                {workflowState.isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic"></i>
                    Generate AI Plan
                  </>
                )}
              </button>
            </div>

            {/* Validation Errors */}
            {targetErrors.length > 0 && (
              <div className="error-panel">
                <h4 className="error-title">
                  <i className="fas fa-exclamation-triangle"></i>
                  Target Validation Errors
                </h4>
                <ul className="error-list">
                  {targetErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Global Error */}
            {workflowState.error && (
              <div className="error-panel">
                <h4 className="error-title">
                  <i className="fas fa-exclamation-circle"></i>
                  Error
                </h4>
                <p>{workflowState.error}</p>
              </div>
            )}
          </div>
        );

      case 'plan':
        return (
          <div className="step-container">
            <div className="step-header">
              <h2 className="step-title">
                <i className="fas fa-clipboard-list step-icon"></i>
                Plan Review
              </h2>
              <p className="step-description">
                Review the AI-generated penetration testing plan before execution.
              </p>
            </div>

            {workflowState.plan && (
              <div className="plan-review">
                <div className="plan-header">
                  <h3>Penetration Testing Plan</h3>
                  <span className="plan-id">Plan ID: {workflowState.plan.plan_id}</span>
                </div>

                <div className="plan-content">
                  <div className="plan-notes">
                    <h4>AI-Generated Notes</h4>
                    <p>{workflowState.plan.notes}</p>
                  </div>

                  <div className="plan-steps">
                    <h4>Execution Steps ({workflowState.plan.steps.length})</h4>
                    <div className="steps-timeline">
                      {workflowState.plan.steps.map((step, index) => (
                        <div key={step.id} className="timeline-step">
                          <div className="step-number">{index + 1}</div>
                          <div className="step-content">
                            <h5>{step.agent} - {step.tool}</h5>
                            <p>Parameters: {JSON.stringify(step.params)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {workflowState.plan.safety_warnings && workflowState.plan.safety_warnings.length > 0 && (
                    <div className="safety-warnings">
                      <h4>
                        <i className="fas fa-exclamation-triangle"></i>
                        Safety Warnings
                      </h4>
                      <ul>
                        {workflowState.plan.safety_warnings.map((warning, index) => (
                          <li key={index}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="plan-actions">
                  <button
                    onClick={handleBackToConfig}
                    className="btn-secondary"
                  >
                    <i className="fas fa-arrow-left"></i>
                    Back to Config
                  </button>
                  <button
                    onClick={handleExecutePlan}
                    disabled={workflowState.isLoading}
                    className="btn-primary"
                  >
                    {workflowState.isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Starting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-play"></i>
                        Execute Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      case 'execute':
        return (
          <div className="step-container">
            <div className="step-header">
              <h2 className="step-title">
                <i className="fas fa-play-circle step-icon"></i>
                Execution Dashboard
              </h2>
              <p className="step-description">
                Monitor the real-time execution of your penetration test.
              </p>
            </div>

            <div className="execution-placeholder">
              <div className="placeholder-content">
                <i className="fas fa-desktop placeholder-icon"></i>
                <h3>Real-time Execution Dashboard</h3>
                <p>Live monitoring dashboard will be implemented here with:</p>
                <ul>
                  <li>Real-time progress tracking</li>
                  <li>Live tool output streaming</li>
                  <li>Agent status indicators</li>
                  <li>Emergency stop controls</li>
                  <li>Vulnerability discovery alerts</li>
                </ul>
                {workflowState.runId && (
                  <p className="run-info">Run ID: {workflowState.runId}</p>
                )}
              </div>
            </div>

            <div className="execution-actions">
              <button
                onClick={handleBackToPlan}
                className="btn-secondary"
              >
                <i className="fas fa-arrow-left"></i>
                Back to Plan
              </button>
              <button
                onClick={() => setWorkflowState(prev => ({ ...prev, currentStep: 'results' }))}
                className="btn-primary"
              >
                <i className="fas fa-chart-bar"></i>
                View Results
              </button>
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="step-container">
            <div className="step-header">
              <h2 className="step-title">
                <i className="fas fa-chart-line step-icon"></i>
                Results & Reports
              </h2>
              <p className="step-description">
                View penetration testing results and generate compliance reports.
              </p>
            </div>

            <div className="results-placeholder">
              <div className="placeholder-content">
                <i className="fas fa-file-alt placeholder-icon"></i>
                <h3>Results & Reporting Interface</h3>
                <p>Comprehensive results dashboard will include:</p>
                <ul>
                  <li>Vulnerability summary and categorization</li>
                  <li>CVSS scoring and risk assessment</li>
                  <li>Proof-of-concept evidence gallery</li>
                  <li>Remediation recommendations</li>
                  <li>Compliance mapping (OWASP, NIST, PCI-DSS)</li>
                  <li>Multi-format report export (PDF, HTML, JSON)</li>
                </ul>
              </div>
            </div>

            <div className="results-actions">
              <button
                onClick={() => setWorkflowState(prev => ({ ...prev, currentStep: 'config' }))}
                className="btn-secondary"
              >
                <i className="fas fa-plus"></i>
                New Test
              </button>
              <button
                className="btn-primary"
                onClick={() => console.log('Export report')}
              >
                <i className="fas fa-download"></i>
                Export Report
              </button>
            </div>
          </div>
        );

      default:
        return <div>Invalid step</div>;
    }
  };

  return (
    <div className="penetration-testing">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-info">
            <h1 className="page-title">
              <i className="fas fa-user-secret title-icon"></i>
              CybrTy Pentest Service
            </h1>
            <p className="page-subtitle">
              Enterprise-grade autonomous penetration testing platform powered by AI agents
            </p>
          </div>
          
          <div className="header-stats">
            <div className="stat-badge">
              <span className="stat-value">247</span>
              <span className="stat-label">Tests Completed</span>
            </div>
            <div className="stat-badge">
              <span className="stat-value">89%</span>
              <span className="stat-label">Issues Remediated</span>
            </div>
            <div className="stat-badge">
              <span className="stat-value">24/7</span>
              <span className="stat-label">AI Monitoring</span>
            </div>
          </div>
        </div>

        {/* Workflow Progress */}
        <div className="workflow-progress">
          <div className="progress-steps">
            {[
              { key: 'config', title: 'Configuration', icon: 'fas fa-cog' },
              { key: 'plan', title: 'Plan Review', icon: 'fas fa-clipboard-list' },
              { key: 'execute', title: 'Execution', icon: 'fas fa-play-circle' },
              { key: 'results', title: 'Results', icon: 'fas fa-chart-line' }
            ].map((step, index) => (
              <div
                key={step.key}
                className={`progress-step ${
                  workflowState.currentStep === step.key ? 'current' : 
                  ['config', 'plan', 'execute', 'results'].indexOf(workflowState.currentStep) > index ? 'completed' : 'pending'
                }`}
              >
                <div className="step-icon-wrapper">
                  <i className={step.icon}></i>
                </div>
                <span className="step-label">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-content">
        {renderStepContent()}
      </div>

      <style>{`
        .penetration-testing {
          min-height: 100vh;
          background: var(--primary-bg);
        }

        .page-header {
          background: var(--card-bg);
          border-bottom: 1px solid var(--border-color);
          padding: 2rem 0;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-info {
          flex: 1;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .title-icon {
          color: var(--accent-primary);
          font-size: 2rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .header-stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat-badge {
          background: var(--primary-bg);
          border: 1px solid var(--border-light);
          border-radius: 12px;
          padding: 1rem 1.5rem;
          text-align: center;
          min-width: 120px;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .stat-label {
          display: block;
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-top: 0.25rem;
        }

        .workflow-progress {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          gap: 2rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .progress-step.current {
          background: rgba(37, 99, 235, 0.1);
          color: var(--accent-primary);
        }

        .progress-step.completed {
          color: var(--accent-success);
        }

        .progress-step.pending {
          color: var(--text-muted);
        }

        .step-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          border: 2px solid currentColor;
          background: var(--card-bg);
        }

        .step-label {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .page-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .step-container {
          background: var(--card-bg);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-color);
        }

        .step-header {
          background: var(--primary-bg);
          padding: 2rem;
          border-bottom: 1px solid var(--border-light);
        }

        .step-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .step-icon {
          color: var(--accent-primary);
        }

        .step-description {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.6;
        }

        .config-grid {
          padding: 2rem;
          display: grid;
          gap: 2rem;
        }

        .config-section {
          background: var(--primary-bg);
          border-radius: 12px;
          overflow: hidden;
        }

        .step-actions {
          padding: 2rem;
          display: flex;
          justify-content: center;
          border-top: 1px solid var(--border-light);
        }

        .btn-primary, .btn-secondary {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover:not(.disabled) {
          background: var(--accent-secondary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .btn-primary.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: var(--border-light);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }

        .btn-secondary:hover {
          background: var(--border-color);
          transform: translateY(-1px);
        }

        .btn-large {
          padding: 1.25rem 2.5rem;
          font-size: 1.1rem;
        }

        .error-panel {
          background: rgba(220, 38, 38, 0.05);
          border: 1px solid var(--accent-danger);
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem;
        }

        .error-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--accent-danger);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .error-list {
          color: var(--accent-danger);
          margin-left: 1rem;
        }

        .plan-review {
          padding: 2rem;
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-light);
        }

        .plan-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .plan-id {
          font-family: 'JetBrains Mono', monospace;
          background: var(--primary-bg);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .plan-content {
          display: grid;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .plan-notes, .plan-steps, .safety-warnings {
          background: var(--primary-bg);
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid var(--border-light);
        }

        .plan-notes h4, .plan-steps h4, .safety-warnings h4 {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .safety-warnings {
          border-color: var(--accent-danger);
          background: rgba(220, 38, 38, 0.02);
        }

        .safety-warnings h4 {
          color: var(--accent-danger);
        }

        .safety-warnings ul {
          color: var(--accent-danger);
          margin-left: 1rem;
        }

        .steps-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .timeline-step {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .step-number {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--accent-primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .step-content h5 {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .step-content p {
          color: var(--text-secondary);
          font-size: 0.875rem;
          font-family: 'JetBrains Mono', monospace;
        }

        .plan-actions {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
        }

        .execution-placeholder, .results-placeholder {
          padding: 2rem;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .placeholder-content {
          text-align: center;
          max-width: 600px;
        }

        .placeholder-icon {
          font-size: 4rem;
          color: var(--accent-primary);
          margin-bottom: 1rem;
        }

        .placeholder-content h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .placeholder-content p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .placeholder-content ul {
          text-align: left;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .run-info {
          font-family: 'JetBrains Mono', monospace;
          background: var(--primary-bg);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          display: inline-block;
          margin-top: 1rem;
        }

        .execution-actions, .results-actions {
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-light);
        }

        @media (max-width: 1200px) {
          .header-content {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }

          .header-stats {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .header-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .progress-steps {
            flex-direction: column;
            gap: 1rem;
          }

          .page-content {
            padding: 1rem;
          }

          .step-header {
            padding: 1.5rem;
          }

          .config-grid {
            padding: 1.5rem;
          }

          .plan-actions, .execution-actions, .results-actions {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PenetrationTesting;
