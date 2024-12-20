import { AudioConfig } from '../../types/audio';

export class MediaStreamService {
  static async getAudioStream(config: Partial<AudioConfig> = {}): Promise<MediaStream> {
    try {
      return await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: config.echoCancellation ?? true,
          noiseSuppression: config.noiseSuppression ?? true,
          autoGainControl: config.autoGainControl ?? true,
          channelCount: config.channels ?? 1,
          sampleRate: config.sampleRate ?? 16000
        }
      });
    } catch (error) {
      console.error('Failed to access microphone:', error);
      throw error;
    }
  }

  static stopStream(stream: MediaStream): void {
    stream.getTracks().forEach(track => track.stop());
  }
}