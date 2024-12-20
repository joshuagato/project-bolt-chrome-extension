import { useState, useCallback, useEffect } from 'react';
import { GoogleCalendarService } from '../services/google/googleCalendarService';

interface Calendar {
  id: string;
  name: string;
  color: string;
  url: string;
}

export function useGoogleCalendar() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedCalendars, setConnectedCalendars] = useState<Calendar[]>([]);
  const service = new GoogleCalendarService();

  useEffect(() => {
    // Load connected calendars on mount
    loadConnectedCalendars();
  }, []);

  const loadConnectedCalendars = async () => {
    try {
      const calendars = await service.getConnectedCalendars();
      setConnectedCalendars(calendars);
    } catch (error) {
      console.error('Failed to load calendars:', error);
    }
  };

  const connectCalendar = useCallback(async () => {
    setIsConnecting(true);
    try {
      await service.authorize();
    } catch (error) {
      console.error('Failed to connect to Google Calendar:', error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectCalendar = useCallback(async () => {
    try {
      await service.disconnect();
      setConnectedCalendars([]);
    } catch (error) {
      console.error('Failed to disconnect calendar:', error);
    }
  }, []);

  return {
    connectCalendar,
    disconnectCalendar,
    connectedCalendars,
    isConnecting
  };
}