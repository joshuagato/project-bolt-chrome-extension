import React from 'react';
import { Calendar, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleCalendar } from '../../../hooks/useGoogleCalendar';

export function CalendarIntegration() {
  const { 
    connectCalendar, 
    disconnectCalendar,
    connectedCalendars,
    isConnecting 
  } = useGoogleCalendar();

  if (!connectedCalendars.length) {
    return (
      <div className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0071e3] rounded-xl flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-[#1d1d1f]">Google Calendar</h3>
            <p className="text-sm text-[#6e6e73]">
              Sync your meetings and schedule
            </p>
          </div>
        </div>
        <motion.button
          onClick={connectCalendar}
          className="apple-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect'}
        </motion.button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border border-[#e5e5e5] rounded-xl bg-[#f5f5f7]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#0071e3] rounded-xl flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-[#1d1d1f]">Google Calendar</h3>
            <p className="text-sm text-[#34c759]">Connected</p>
          </div>
        </div>
        <button
          onClick={disconnectCalendar}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {/* Connected Calendars List */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] divide-y divide-[#e5e5e5]">
        {connectedCalendars.map((calendar) => (
          <div 
            key={calendar.id}
            className="flex items-center justify-between p-4 group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: calendar.color }} />
              <span className="text-sm text-[#1d1d1f]">{calendar.name}</span>
            </div>
            <a
              href={calendar.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#6e6e73] hover:text-[#1d1d1f] rounded-lg 
                       opacity-0 group-hover:opacity-100 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}