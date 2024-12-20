import { pipeline } from '@xenova/transformers';
import { TranscriptionResult } from '../../../types/transcription';

export class TranscriptionEngine {
  private transcriber: any;
  private isInitialized = false;
  private streamingBuffer: Float32Array[] = [];

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Use tiny model for faster processing
      this.transcriber = await pipeline(
        'automatic-speech-recognition',
        'Xenova/whisper-tiny.en',
        {
          chunk_length_s: 5, // Smaller chunks
          stride_length_s: 1, // Smaller stride for better continuity
          return_timestamps: true,
          max_new_tokens: 128 // Limit output size for faster processing
        }
      );
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize transcription engine:', error);
      throw error;
    }
  }

  async transcribeStream(audioData: Float32Array): Promise<TranscriptionResult> {
    if (!this.isInitialized) {
      throw new Error('Transcription engine not initialized');
    }

    try {
      // Add to streaming buffer
      this.streamingBuffer.push(audioData);
      
      // Keep only last 5 seconds of audio
      const maxBufferLength = 5 * 16000; // 5 seconds at 16kHz
      while (this.getTotalSamples() > maxBufferLength) {
        this.streamingBuffer.shift();
      }

      // Combine buffer for processing
      const combinedAudio = this.getCombinedBuffer();
      
      const result = await this.transcriber(combinedAudio, {
        task: 'transcribe',
        language: 'en',
        timestamp_granularity: 'word'
      });

      return {
        text: result.text,
        speakers: [],
        segments: []
      };
    } catch (error) {
      console.error('Transcription error:', error);
      throw error;
    }
  }

  private getTotalSamples(): number {
    return this.streamingBuffer.reduce((sum, chunk) => sum + chunk.length, 0);
  }

  private getCombinedBuffer(): Float32Array {
    const totalLength = this.getTotalSamples();
    const combined = new Float32Array(totalLength);
    let offset = 0;

    for (const chunk of this.streamingBuffer) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }

    return combined;
  }

  cleanup(): void {
    this.streamingBuffer = [];
    this.isInitialized = false;
  }
}