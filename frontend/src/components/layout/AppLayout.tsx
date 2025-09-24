import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import CybrtyHeader from './CybrtyHeader';
import { initializeEffects } from '../../utils/effects';

const AppLayout: React.FC = () => {
  useEffect(() => {
    initializeEffects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NIST Framework Header */}
      <CybrtyHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;