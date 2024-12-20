interface Calendar {
  id: string;
  name: string;
  color: string;
  url: string;
}

export class GoogleCalendarService {
  private readonly CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
  private readonly SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar.events.readonly'
  ];

  async authorize(): Promise<void> {
    const authUrl = this.buildAuthUrl();
    window.location.href = authUrl;
  }

  async disconnect(): Promise<void> {
    // In a real implementation, this would:
    // 1. Revoke the OAuth token
    // 2. Clear local storage
    // 3. Notify the backend
    localStorage.removeItem('google_calendar_token');
  }

  async getConnectedCalendars(): Promise<Calendar[]> {
    const token = localStorage.getItem('google_calendar_token');
    if (!token) return [];

    try {
      // In a real implementation, this would make an API call to Google Calendar
      // For now, return mock data
      return [
        {
          id: '1',
          name: 'Work Calendar',
          color: '#34c759',
          url: 'https://calendar.google.com'
        },
        {
          id: '2',
          name: 'Personal Calendar',
          color: '#007aff',
          url: 'https://calendar.google.com'
        },
        {
          id: '3',
          name: 'Team Meetings',
          color: '#ff9500',
          url: 'https://calendar.google.com'
        }
      ];
    } catch (error) {
      console.error('Failed to fetch calendars:', error);
      return [];
    }
  }

  private buildAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: `${window.location.origin}/auth/google/callback`,
      response_type: 'code',
      scope: this.SCOPES.join(' '),
      access_type: 'offline',
      prompt: 'consent'
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }
}