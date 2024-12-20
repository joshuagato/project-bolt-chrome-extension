import { Model, KaldiRecognizer } from 'vosk-browser';
import { AudioConfig } from '../../types/audio';

export class VoskRecognitionService {
  private model: Model | null = null;
  private recognizer: KaldiRecognizer | null = null;
  private isInitialized = false;

  constructor(private onTranscriptUpdate: (text: string) => void) {}

  async initialize(config: AudioConfig): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load the Vosk model (small model for faster loading)
      const response = await fetch('/models/vosk-model-small-en-us-0.15.zip');
      const modelData = await response.arrayBuffer();
      this.model = new Model(modelData);

      // Initialize recognizer with audio config
      this.recognizer = new KaldiRecognizer(this.model, config.sampleRate);
      this.recognizer.setWords(true);
      this.recognizer.setPartialWords(true);

      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Vosk:', error);
      throw error;
    }
  }

  processAudio(audioData: Float32Array): void {
    if (!this.recognizer) return;

    try {
      // Convert Float32Array to Int16Array for Vosk
      const samples = new Int16Array(audioData.length);
      for (let i = 0; i < audioData.length; i++) {
        samples[i] = audioData[i] * 32768;
      }

      const result = this.recognizer.acceptWaveform(samples);
      
      if (result) {
        const finalResult = this.recognizer.result();
        if (finalResult.text) {
          this.onTranscriptUpdate(finalResult.text);
        }
      } else {
        const partialResult = this.recognizer.partialResult();
        if (partialResult.partial) {
          this.onTranscriptUpdate(partialResult.partial);
        }
      }
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  }

  reset(): void {
    if (this.recognizer) {
      this.recognizer.reset();
    }
  }

  cleanup(): void {
    if (this.recognizer) {
      this.recognizer.free();
    }
    if (this.model) {
      this.model.free();
    }
    this.isInitialized = false;
  }
}