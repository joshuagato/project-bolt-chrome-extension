import React, { useState } from 'react';
import { Settings, Bell, CreditCard, Link } from 'lucide-react';
import { cn } from '../../utils/cn';
import { GeneralSettings } from './GeneralSettings';
import { IntegrationsSettings } from './IntegrationsSettings';
import { NotificationSettings } from './NotificationSettings';
import { BillingSettings } from './BillingSettings';

const tabs = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'integrations', label: 'Integrations', icon: Link },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export function SettingsLayout() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-[#1d1d1f]">Settings</h1>
      
      <div className="flex gap-8">
        <aside className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors',
                    activeTab === tab.id
                      ? 'bg-[#0071e3] text-white'
                      : 'text-[#1d1d1f] hover:bg-black/5'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 max-w-2xl">
          <div className="apple-card">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'integrations' && <IntegrationsSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'billing' && <BillingSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}