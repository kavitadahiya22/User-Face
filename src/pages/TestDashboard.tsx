import React from 'react';

const TestDashboard: React.FC = () => {
  console.log('🧪 TestDashboard component is rendering...');
  
  return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        fontSize: '3rem', 
        color: '#2563eb', 
        marginBottom: '2rem',
        fontWeight: 'bold'
      }}>
        🛡️ CybrTy Dashboard
      </h1>
      
      <p style={{ 
        fontSize: '1.5rem', 
        color: '#64748b',
        marginBottom: '3rem'
      }}>
        ✅ Application is working correctly!
      </p>
      
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#1f2937', marginBottom: '1rem' }}>
          System Status
        </h2>
        <p style={{ color: '#10b981', fontSize: '1.2rem', fontWeight: 'bold' }}>
          🟢 All Systems Operational
        </p>
      </div>
    </div>
  );
};

export default TestDashboard;