import { AudioConfig } from '../../../types/audio';
import { AudioContextService } from '../../audio/audioContext';
import { MediaStreamService } from '../../audio/mediaStream';

export class AudioStream {
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: AudioWorkletNode | null = null;

  constructor(
    private config: AudioConfig,
    private onAudioData: (audioData: Float32Array) => void
  ) {}

  async initialize(): Promise<void> {
    try {
      this.mediaStream = await MediaStreamService.getAudioStream(this.config);
      this.audioContext = AudioContextService.getInstance();
      
      await AudioContextService.loadWorklet('/audioProcessingWorklet.js');
      
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.processor = new AudioWorkletNode(this.audioContext, 'audio-processor', {
        processorOptions: {
          frameSize: this.config.frameSize,
          vadThreshold: this.config.vadThreshold
        }
      });

      this.processor.port.onmessage = (event) => {
        const { audioData } = event.data;
        this.onAudioData(new Float32Array(audioData));
      };

      source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Failed to initialize audio stream:', error);
      throw error;
    }
  }

  stop(): void {
    if (this.mediaStream) {
      MediaStreamService.stopStream(this.mediaStream);
      this.mediaStream = null;
    }
    
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  pause(): void {
    if (this.processor) {
      this.processor.disconnect();
    }
  }

  resume(): void {
    if (this.processor && this.audioContext) {
      this.processor.connect(this.audioContext.destination);
    }
  }
}