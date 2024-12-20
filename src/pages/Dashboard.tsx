import React, { useState } from 'react';
import { Clock, Users, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { StatsCard } from '../components/ui/StatsCard';
import { NewNoteButton } from '../components/notes/NewNoteButton';
import { RecordingModal } from '../components/notes/RecordingModal';
import { MeetingsSections } from '../components/meetings/MeetingsSections';

export function Dashboard() {
  const [isRecordingModalOpen, setIsRecordingModalOpen] = useState(false);
  const stats = {
    totalMeetingTime: '5.8 hours',
    totalMeetings: '6',
    notesShared: '3',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DashboardHeader />
      
      {/* Stats Row */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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

      {/* New Note Button */}
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <NewNoteButton onClick={() => setIsRecordingModalOpen(true)} />
      </motion.div>

      {/* Meetings Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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