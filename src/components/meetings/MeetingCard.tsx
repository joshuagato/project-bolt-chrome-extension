import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import type { Meeting } from '../../types';
import { formatDate } from '../../utils/dateFormatter';

interface MeetingCardProps {
  meeting: Meeting;
  onClick: (meeting: Meeting) => void;
}

export function MeetingCard({ meeting, onClick }: MeetingCardProps) {
  return (
    <button
      onClick={() => onClick(meeting)}
      className="w-full text-left apple-card p-6 hover:scale-[1.02] transition-transform"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-[#1d1d1f]">{meeting.title}</h3>
          <div className="mt-2 flex flex-wrap gap-4">
            <span className="flex items-center text-sm text-[#6e6e73]">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(meeting.date)}
            </span>
            <span className="flex items-center text-sm text-[#6e6e73]">
              <Clock className="h-4 w-4 mr-1" />
              {meeting.duration} min
            </span>
            {meeting.participants && (
              <span className="flex items-center text-sm text-[#6e6e73]">
                <Users className="h-4 w-4 mr-1" />
                {meeting.participants} participants
              </span>
            )}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          meeting.status === 'upcoming' 
            ? 'bg-[#0071e3]/10 text-[#0071e3]'
            : 'bg-green-100 text-green-800'
        }`}>
          {meeting.status}
        </span>
      </div>
    </button>
  );
}