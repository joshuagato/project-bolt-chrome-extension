import { AudioConfig } from '../../types/audio';
import { TranscriptionResult } from '../../types/transcription';
import { AudioProcessor } from './core/audioProcessor';
import { AudioStream } from './core/audioStream';
import { AudioBuffer } from './core/audioBuffer';
import { TranscriptionEngine } from './core/transcriptionEngine';

// Reduce processing interval for faster updates
const PROCESSING_INTERVAL = 1000; // Process every 1 second
const CHUNK_SIZE = 4096; // Smaller chunks for faster processing

export class TranscriptionService {
  private audioProcessor: AudioProcessor;
  private audioStream: AudioStream;
  private audioBuffer: AudioBuffer;
  private transcriptionEngine: TranscriptionEngine;
  private processingInterval: number | null = null;
  private isActive = false;
  private lastProcessedTime = 0;

  constructor(
    private config: AudioConfig,
    private onTranscriptUpdate: (text: string) => void
  ) {
    this.audioProcessor = new AudioProcessor({
      ...config,
      frameSize: CHUNK_SIZE,
      // Increase VAD sensitivity for faster speech detection
      vadThreshold: 0.2
    });
    this.audioBuffer = new AudioBuffer();
    this.transcriptionEngine = new TranscriptionEngine();
    this.audioStream = new AudioStream(config, this.handleAudioData.bind(this));
  }

  async initialize(): Promise<void> {
    try {
      await Promise.all([
        this.audioProcessor.initialize(),
        this.transcriptionEngine.initialize(),
        this.initializeWorker()
      ]);
    } catch (error) {
      console.error('Failed to initialize transcription service:', error);
      throw error;
    }
  }

  private async initializeWorker(): Promise<void> {
    // Initialize Web Worker for background processing
    const worker = new Worker(new URL('./workers/transcriptionWorker.ts', import.meta.url));
    worker.onmessage = (event) => {
      if (event.data.type === 'transcription') {
        this.onTranscriptUpdate(event.data.text);
      }
    };
  }

  private async handleAudioData(audioData: Float32Array): Promise<void> {
    if (!this.isActive) return;

    try {
      // Process audio in smaller chunks
      for (let i = 0; i < audioData.length; i += CHUNK_SIZE) {
        const chunk = audioData.slice(i, i + CHUNK_SIZE);
        const { processedAudio, isSpeech } = await this.audioProcessor.processAudioChunk(chunk);
        
        if (isSpeech) {
          this.audioBuffer.addChunk(processedAudio);
          
          // Process immediately if enough time has passed
          const now = Date.now();
          if (now - this.lastProcessedTime >= PROCESSING_INTERVAL) {
            await this.processBuffer();
            this.lastProcessedTime = now;
          }
        }
      }
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  }

  private async processBuffer(): Promise<void> {
    if (this.audioBuffer.isEmpty()) return;

    try {
      const audioData = this.audioBuffer.getCombinedAudio();
      const normalizedAudio = this.audioProcessor.normalizeAudio(audioData);
      
      // Use streaming mode for faster results
      const result = await this.transcriptionEngine.transcribeStream(normalizedAudio);
      
      if (result.text) {
        this.onTranscriptUpdate(result.text);
      }

      this.audioBuffer.clear();
    } catch (error) {
      console.error('Error processing audio buffer:', error);
    }
  }

  async start(): Promise<void> {
    try {
      await this.audioStream.initialize();
      this.isActive = true;
      this.lastProcessedTime = Date.now();

      // Use requestAnimationFrame for smoother processing
      const processLoop = () => {
        if (this.isActive) {
          this.processBuffer();
          requestAnimationFrame(processLoop);
        }
      };
      requestAnimationFrame(processLoop);
    } catch (error) {
      console.error('Failed to start transcription:', error);
      throw error;
    }
  }

  stop(): void {
    this.isActive = false;
    this.audioStream.stop();
    this.audioBuffer.clear();
    this.lastProcessedTime = 0;
  }

  pause(): void {
    this.isActive = false;
    this.audioStream.pause();
  }

  resume(): void {
    this.isActive = true;
    this.lastProcessedTime = Date.now();
    this.audioStream.resume();
  }
}