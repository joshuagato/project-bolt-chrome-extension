import React from 'react';
import { motion } from 'framer-motion';
import { ChromeExtensionButton } from '../ui/ChromeExtensionButton';
import { GoogleCalendarButton } from '../integrations/GoogleCalendarButton';

export function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-semibold text-[#1d1d1f]">Dashboard</h1>
      <div className="flex items-center gap-4">
        <GoogleCalendarButton />
        <ChromeExtensionButton />
      </div>
    </div>
  );
}