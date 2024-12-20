import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Meeting } from '../../types';
import { MeetingCard } from './MeetingCard';

interface MeetingListProps {
  meetings: Meeting[];
}

export function MeetingList({ meetings }: MeetingListProps) {
  const navigate = useNavigate();

  const handleMeetingClick = (meeting: Meeting) => {
    navigate(`/meetings/${meeting.id}`);
  };

  return (
    <div className="space-y-6">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          onClick={handleMeetingClick}
        />
      ))}
    </div>
  );
}