import React from 'react';

export function NotificationSettings() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1d1d1f]">Meeting Reminders</h3>
              <p className="text-sm text-[#6e6e73]">
                Get notified before your scheduled meetings
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#6e6e73] peer-checked:bg-[#0071e3] rounded-full
                            peer-checked:after:translate-x-full after:content-[''] after:absolute
                            after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                            after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1d1d1f]">Note Sharing</h3>
              <p className="text-sm text-[#6e6e73]">
                Receive notifications when notes are shared with you
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#6e6e73] peer-checked:bg-[#0071e3] rounded-full
                            peer-checked:after:translate-x-full after:content-[''] after:absolute
                            after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                            after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1d1d1f]">Summary Completion</h3>
              <p className="text-sm text-[#6e6e73]">
                Get notified when AI summaries are ready
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-[#6e6e73] peer-checked:bg-[#0071e3] rounded-full
                            peer-checked:after:translate-x-full after:content-[''] after:absolute
                            after:top-[2px] after:left-[2px] after:bg-white after:rounded-full
                            after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}