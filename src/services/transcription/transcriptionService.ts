import { AudioConfig } from '../../types/audio';
import { AzureSpeechService } from './azureSpeechService';
import { SpeechRecognitionService } from './speechRecognition';

export class TranscriptionService {
  private azureService: AzureSpeechService | null = null;
  private webSpeechService: SpeechRecognitionService | null = null;
  private isUsingAzure = false;

  constructor(private onTranscriptUpdate: (text: string) => void) {}

  async initialize(config: AudioConfig): Promise<void> {
    try {
      // Try to initialize Azure Speech Service first
      this.azureService = new AzureSpeechService(this.onTranscriptUpdate);
      await this.azureService.initialize(config);
      this.isUsingAzure = true;
    } catch (error) {
      console.log('Falling back to Web Speech API');
      // Fallback to Web Speech API
      this.webSpeechService = new SpeechRecognitionService(this.onTranscriptUpdate);
      this.isUsingAzure = false;
    }
  }

  async start(): Promise<void> {
    if (this.isUsingAzure && this.azureService) {
      await this.azureService.start();
    } else {
      this.webSpeechService?.start();
    }
  }

  async stop(): Promise<void> {
    if (this.isUsingAzure && this.azureService) {
      await this.azureService.stop();
    } else {
      this.webSpeechService?.stop();
    }
  }

  async pause(): Promise<void> {
    if (this.isUsingAzure && this.azureService) {
      await this.azureService.pause();
    } else {
      this.webSpeechService?.pause();
    }
  }

  async resume(): Promise<void> {
    if (this.isUsingAzure && this.azureService) {
      await this.azureService.resume();
    } else {
      this.webSpeechService?.resume();
    }
  }
}