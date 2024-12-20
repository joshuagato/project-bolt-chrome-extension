import React from 'react';
import { MeetingList } from './MeetingList';
import type { Meeting } from '../../types';

// Sample data - In a real app, this would come from your backend
const sampleMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Product Strategy Review',
    date: new Date('2024-03-20T10:00:00'),
    duration: 60,
    status: 'completed',
    participants: 8
  },
  {
    id: '2',
    title: 'Design System Workshop',
    date: new Date('2024-03-21T14:00:00'),
    duration: 90,
    status: 'completed',
    participants: 6
  },
  {
    id: '3',
    title: 'Sprint Planning',
    date: new Date('2024-03-25T09:00:00'),
    duration: 60,
    status: 'upcoming',
    participants: 10
  },
  {
    id: '4',
    title: 'Stakeholder Update',
    date: new Date('2024-03-26T15:30:00'),
    duration: 45,
    status: 'upcoming',
    participants: 5
  }
];

export function MeetingsSections() {
  const completedMeetings = sampleMeetings.filter(m => m.status === 'completed');
  const upcomingMeetings = sampleMeetings.filter(m => m.status === 'upcoming');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Upcoming</h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {upcomingMeetings.length} scheduled
          </span>
        </div>
        <MeetingList meetings={upcomingMeetings} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Completed</h2>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {completedMeetings.length} completed
          </span>
        </div>
        <MeetingList meetings={completedMeetings} />
      </section>
    </div>
  );
}