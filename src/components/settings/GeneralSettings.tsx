import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export function GeneralSettings() {
  const { user } = useAuth();
  const timezones = [
    'America/Los_Angeles',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">General Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Display Name
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              className="apple-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              className="apple-input"
              disabled
            />
            <p className="mt-1 text-sm text-[#6e6e73]">
              Email changes must be made through Google Workspace
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1d1d1f] mb-2">
              Time Zone
            </label>
            <select className="apple-input" defaultValue={user?.timezone}>
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}