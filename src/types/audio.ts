export interface AudioConfig {
  sampleRate: number;
  frameSize: number;
  vadThreshold: number;
  channels: number;
  echoCancellation: boolean;
  noiseSuppression: boolean;
  autoGainControl: boolean;
}

export interface AudioProcessingResult {
  audioData: Float32Array;
  isSpeech: boolean;
}