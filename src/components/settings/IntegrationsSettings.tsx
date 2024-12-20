import React from 'react';
import { Slack } from 'lucide-react';
import { CalendarIntegration } from './integrations/CalendarIntegration';

export function IntegrationsSettings() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Integrations</h2>
        <div className="space-y-6">
          {/* Calendar Integration */}
          <CalendarIntegration />

          {/* Slack Integration */}
          <div className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#611f69] rounded-xl flex items-center justify-center">
                <Slack className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-[#1d1d1f]">Slack</h3>
                <p className="text-sm text-[#6e6e73]">
                  Share meeting notes directly to Slack channels
                </p>
              </div>
            </div>
            <button className="apple-button">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}