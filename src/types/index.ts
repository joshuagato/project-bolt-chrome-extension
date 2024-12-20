export interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number;
  status: 'upcoming' | 'completed';
  participants?: number;
  summary?: string;
  actionItems?: string[];
}

export interface User {
  displayName: string;
  email: string;
  timezone: string;
  photoUrl?: string;
}

export interface Stats {
  totalMeetingTime: number;
  totalMeetings: number;
  notesShared: number;
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  url: string;
}