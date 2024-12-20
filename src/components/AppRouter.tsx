import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GetStarted } from '../pages/GetStarted';
import { Dashboard } from '../pages/Dashboard';
import { Settings } from '../pages/Settings';
import { ChangePassword } from '../pages/ChangePassword';
import { MeetingDetails } from '../pages/MeetingDetails';
import { NewNote } from '../pages/NewNote';
import { Layout } from './Layout';

export function AppRouter() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <GetStarted />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/password" element={<ChangePassword />} />
        <Route path="/meetings/:id" element={<MeetingDetails />} />
        <Route path="/notes/new" element={<NewNote />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}