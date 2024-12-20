export interface TranscriptionResult {
  text: string;
  speakers: Speaker[];
  segments: TranscriptionSegment[];
  summary?: string;
  actionItems?: string[];
}

export interface Speaker {
  id: string;
  name: string;
  confidence?: number;
}

export interface TranscriptionSegment {
  speakerId: string;
  text: string;
  startTime: number;
  endTime: number;
  confidence: number;
}

export interface AudioProcessingOptions {
  sampleRate: number;
  frameSize: number;
  vadThreshold: number;
  noiseSuppression: boolean;
  echoCancellation: boolean;
  autoGainControl: boolean;
}