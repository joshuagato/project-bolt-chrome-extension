import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';

export function GoogleCalendarButton() {
  const { connectCalendar, isConnecting } = useGoogleCalendar();

  return (
    <motion.button
      onClick={connectCalendar}
      className="apple-button inline-flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isConnecting}
    >
      <Calendar className="h-5 w-5" />
      {isConnecting ? 'Connecting...' : 'Connect Calendar'}
    </motion.button>
  );
}