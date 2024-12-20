import React from 'react';
import { ChangePasswordForm } from '../components/settings/ChangePassword';

export function ChangePassword() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="apple-card">
        <ChangePasswordForm />
      </div>
    </div>
  );
}