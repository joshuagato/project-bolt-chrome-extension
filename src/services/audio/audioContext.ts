import { AudioConfig } from '../../types/audio';

const DEFAULT_CONFIG: AudioConfig = {
  sampleRate: 16000,
  frameSize: 480,
  vadThreshold: 0.3,
  channels: 1,
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true
};

export class AudioContextService {
  private static instance: AudioContext;

  static getInstance(): AudioContext {
    if (!this.instance) {
      this.instance = new AudioContext(DEFAULT_CONFIG);
    }
    return this.instance;
  }

  static async loadWorklet(path: string): Promise<void> {
    const context = this.getInstance();
    await context.audioWorklet.addModule(path);
  }
}