import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GetStarted } from '../pages/GetStarted';
import { Dashboard } from './Dashboard';
import { Header } from './Header';

export function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <GetStarted />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Dashboard />
    </div>
  );
}