import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import type { Meeting } from '../types';

interface MeetingCardProps {
  meeting: Meeting;
}

function MeetingCard({ meeting }: MeetingCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{meeting.title}</h3>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(meeting.date)}
          </div>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {meeting.duration} min
          </div>
          {meeting.participants && (
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1" />
              {meeting.participants} participants
            </div>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          meeting.status === 'upcoming' 
            ? 'bg-blue-100 text-blue-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {meeting.status}
        </span>
      </div>
      
      {meeting.summary && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Summary</h4>
          <p className="mt-1 text-sm text-gray-600">{meeting.summary}</p>
        </div>
      )}
      
      {meeting.actionItems && meeting.actionItems.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Action Items</h4>
          <ul className="mt-1 space-y-1">
            {meeting.actionItems.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}