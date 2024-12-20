import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { AudioConfig } from '../../types/audio';
import { TranscriptionResult } from '../../types/transcription';

export class AzureSpeechService {
  private speechConfig: SpeechSDK.SpeechConfig;
  private recognizer: SpeechSDK.SpeechRecognizer | null = null;
  private isInitialized = false;

  constructor(private onTranscriptUpdate: (text: string) => void) {
    // Initialize with your Azure Speech Service credentials
    this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY || '',
      process.env.AZURE_SPEECH_REGION || ''
    );
    this.speechConfig.speechRecognitionLanguage = 'en-US';
    this.speechConfig.enableDictation();
  }

  async initialize(config: AudioConfig): Promise<void> {
    if (this.isInitialized) return;

    try {
      const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
      this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, audioConfig);

      // Configure continuous recognition
      this.recognizer.recognizing = (_, event) => {
        if (event.result.text) {
          this.onTranscriptUpdate(event.result.text);
        }
      };

      this.recognizer.recognized = (_, event) => {
        if (event.result.text) {
          this.onTranscriptUpdate(event.result.text);
        }
      };

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Azure Speech Service:', error);
      throw error;
    }
  }

  async start(): Promise<void> {
    if (!this.recognizer) {
      throw new Error('Speech recognizer not initialized');
    }

    try {
      await this.recognizer.startContinuousRecognitionAsync();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    if (!this.recognizer) return;

    try {
      await this.recognizer.stopContinuousRecognitionAsync();
      this.recognizer.close();
      this.recognizer = null;
      this.isInitialized = false;
    } catch (error) {
      console.error('Failed to stop recognition:', error);
      throw error;
    }
  }

  async pause(): Promise<void> {
    if (!this.recognizer) return;

    try {
      await this.recognizer.stopContinuousRecognitionAsync();
    } catch (error) {
      console.error('Failed to pause recognition:', error);
      throw error;
    }
  }

  async resume(): Promise<void> {
    if (!this.recognizer) return;

    try {
      await this.recognizer.startContinuousRecognitionAsync();
    } catch (error) {
      console.error('Failed to resume recognition:', error);
      throw error;
    }
  }
}