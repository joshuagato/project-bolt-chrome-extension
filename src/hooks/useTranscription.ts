import { useState, useEffect, useCallback } from 'react';
import { TranscriptionService } from '../services/transcription/transcriptionService';
import { AudioConfig } from '../types/audio';

const DEFAULT_CONFIG: AudioConfig = {
  sampleRate: 16000,
  frameSize: 480,
  vadThreshold: 0.3,
  channels: 1,
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true
};

export function useTranscription() {
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [service, setService] = useState<TranscriptionService | null>(null);

  useEffect(() => {
    const transcriptionService = new TranscriptionService((text) => {
      setTranscription(prev => prev + ' ' + text);
    });

    transcriptionService.initialize(DEFAULT_CONFIG).then(() => {
      setService(transcriptionService);
    }).catch(error => {
      console.error('Failed to initialize transcription service:', error);
    });

    return () => {
      if (isTranscribing) {
        transcriptionService.stop();
      }
    };
  }, []);

  const startTranscription = useCallback(async () => {
    if (!service) return;
    
    try {
      service.start();
      setIsTranscribing(true);
    } catch (error) {
      console.error('Failed to start transcription:', error);
      setIsTranscribing(false);
    }
  }, [service]);

  const stopTranscription = useCallback(() => {
    if (!service) return;
    
    service.stop();
    setIsTranscribing(false);
  }, [service]);

  const pauseTranscription = useCallback(() => {
    if (!service) return;
    
    service.pause();
    setIsTranscribing(false);
  }, [service]);

  const resumeTranscription = useCallback(() => {
    if (!service) return;
    
    service.resume();
    setIsTranscribing(true);
  }, [service]);

  return {
    isTranscribing,
    transcription,
    startTranscription,
    stopTranscription,
    pauseTranscription,
    resumeTranscription
  };
}