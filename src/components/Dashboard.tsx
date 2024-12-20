import React, { useState } from 'react';
import { Clock, Users, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatsCard } from './ui/StatsCard';
import { NewNoteButton } from './notes/NewNoteButton';
import { ChromeExtensionButton } from './ui/ChromeExtensionButton';
import { RecordingModal } from './notes/RecordingModal';
import { MeetingsSections } from './meetings/MeetingsSections';

export function Dashboard() {
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const stats = {
    totalMeetingTime: '5.8 hours',
    totalMeetings: '6',
    notesShared: '3',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-8 text-[#1d1d1f]"
      >
        Dashboard
      </motion.h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left Column - Chrome Extension */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ChromeExtensionButton />
        </motion.div>

        {/* Center and Right Columns - Stats */}
        <motion.div 
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatsCard
            icon={<Clock className="h-6 w-6" />}
            label="Total Meeting Time"
            value={stats.totalMeetingTime}
          />
          <StatsCard
            icon={<Users className="h-6 w-6" />}
            label="Total Meetings"
            value={stats.totalMeetings}
          />
          <StatsCard
            icon={<Share2 className="h-6 w-6" />}
            label="Notes Shared"
            value={stats.notesShared}
          />
        </motion.div>
      </div>

      {/* New Note Button */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <NewNoteButton onClick={() => setIsRecordingModalOpen(true)} />
      </motion.div>

      {/* Meetings Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <MeetingsSections />
      </motion.div>

      <RecordingModal
        isOpen={isRecordingModalOpen}
        onClose={() => setIsRecordingModalOpen(false)}
      />
    </div>
  );
}