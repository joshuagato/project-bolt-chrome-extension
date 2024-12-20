import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { ShareMenu } from './ShareMenu';
import { formatDate } from '../../utils/dateFormatter';
import type { Meeting } from '../../types';

interface MeetingHeaderProps {
  meeting: Meeting;
}

export function MeetingHeader({ meeting }: MeetingHeaderProps) {
  return (
    <div className="apple-card mb-8">
      <div className="p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-semibold text-[#1d1d1f]">{meeting.title}</h1>
            <div className="mt-4 flex flex-wrap gap-6">
              <span className="flex items-center text-[#6e6e73]">
                <Calendar className="h-5 w-5 mr-2" />
                {formatDate(meeting.date)}
              </span>
              <span className="flex items-center text-[#6e6e73]">
                <Clock className="h-5 w-5 mr-2" />
                {meeting.duration} minutes
              </span>
              {meeting.participants && (
                <span className="flex items-center text-[#6e6e73]">
                  <Users className="h-5 w-5 mr-2" />
                  {meeting.participants} participants
                </span>
              )}
            </div>
          </div>
          <ShareMenu />
        </div>
      </div>
    </div>
  );
}