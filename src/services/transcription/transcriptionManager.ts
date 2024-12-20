import { AudioContextService } from '../audio/audioContext';
import { MediaStreamService } from '../audio/mediaStream';
import { VoskRecognitionService } from './voskRecognition';
import { DiarizationService } from './diarization';
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

export class TranscriptionManager {
  private voskRecognition: VoskRecognitionService;
  private diarization: DiarizationService;
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: AudioWorkletNode | null = null;
  private isActive: boolean = false;

  constructor(private onTranscriptUpdate: (text: string) => void) {
    this.voskRecognition = new VoskRecognitionService(this.handleTranscriptUpdate);
    this.diarization = new DiarizationService();
  }

  private handleTranscriptUpdate = async (text: string) => {
    if (!text.trim()) return;

    const audioData = await this.getAudioData();
    const speakerId = await this.diarization.identifySpeaker(audioData);
    
    if (this.diarization.getCurrentSpeaker() !== speakerId) {
      this.diarization.setCurrentSpeaker(speakerId);
      const speakerName = this.diarization.getSpeakerName(speakerId);
      text = `\n[${speakerName}]: ${text}`;
    }

    this.onTranscriptUpdate(text);
  };

  private async getAudioData(): Promise<Float32Array> {
    // In a real implementation, get actual audio data from the stream
    return new Float32Array(DEFAULT_CONFIG.frameSize);
  }

  async start(): Promise<void> {
    try {
      // Initialize Vosk
      await this.voskRecognition.initialize(DEFAULT_CONFIG);

      // Set up audio processing
      this.mediaStream = await MediaStreamService.getAudioStream(DEFAULT_CONFIG);
      this.audioContext = AudioContextService.getInstance();
      
      await AudioContextService.loadWorklet('/audioProcessingWorklet.js');
      
      const source = this.audioContext.createMediaStreamSource(this.mediaStream);
      this.processor = new AudioWorkletNode(this.audioContext, 'audio-processor', {
        processorOptions: {
          frameSize: DEFAULT_CONFIG.frameSize,
          vadThreshold: DEFAULT_CONFIG.vadThreshold
        }
      });

      // Handle audio processing messages
      this.processor.port.onmessage = (event) => {
        const { audioData, isSpeech } = event.data;
        if (isSpeech) {
          this.voskRecognition.processAudio(new Float32Array(audioData));
        }
      };

      // Connect audio nodes
      source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
      
      this.isActive = true;
    } catch (error) {
      console.error('Failed to start transcription:', error);
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

    this.voskRecognition.cleanup();
    this.isActive = false;
  }

  pause(): void {
    if (this.processor) {
      this.processor.disconnect();
    }
    this.isActive = false;
  }

  resume(): void {
    if (this.processor && this.audioContext) {
      this.processor.connect(this.audioContext.destination);
    }
    this.isActive = true;
  }

  isRecording(): boolean {
    return this.isActive;
  }
}