import { pipeline } from '@xenova/transformers';

export class WhisperRecognitionService {
  private transcriber: any;
  private isInitialized = false;
  private audioChunks: Float32Array[] = [];
  private processingInterval: number | null = null;

  constructor(private onTranscriptUpdate: (text: string) => void) {}

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Whisper model
      this.transcriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
      this.isInitialized = true;

      // Start processing chunks periodically
      this.processingInterval = window.setInterval(() => {
        this.processChunks();
      }, 3000); // Process every 3 seconds

    } catch (error) {
      console.error('Failed to initialize Whisper:', error);
      throw error;
    }
  }

  private async processChunks(): Promise<void> {
    if (this.audioChunks.length === 0) return;

    try {
      // Combine chunks into a single audio buffer
      const combinedChunks = this.concatenateFloat32Arrays(this.audioChunks);
      this.audioChunks = []; // Clear processed chunks

      // Convert audio data to the format expected by Whisper
      const audioData = this.prepareAudioData(combinedChunks);

      // Transcribe audio
      const result = await this.transcriber(audioData, {
        chunk_length_s: 30,
        stride_length_s: 5,
        return_timestamps: true
      });

      if (result.text) {
        this.onTranscriptUpdate(result.text);
      }
    } catch (error) {
      console.error('Error processing audio chunks:', error);
    }
  }

  processAudio(audioData: Float32Array): void {
    this.audioChunks.push(audioData);
  }

  private concatenateFloat32Arrays(arrays: Float32Array[]): Float32Array {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Float32Array(totalLength);
    let offset = 0;
    
    for (const arr of arrays) {
      result.set(arr, offset);
      offset += arr.length;
    }
    
    return result;
  }

  private prepareAudioData(audioData: Float32Array): Float32Array {
    // Normalize audio data to [-1, 1] range
    const maxValue = Math.max(...audioData.map(Math.abs));
    return audioData.map(x => x / maxValue);
  }

  cleanup(): void {
    if (this.processingInterval) {
      window.clearInterval(this.processingInterval);
    }
    this.audioChunks = [];
    this.isInitialized = false;
  }
}