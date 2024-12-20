import { AudioConfig } from '../../../types/audio';
import { createNoiseSuppressor, detectVoiceActivity } from '../../../utils/audioProcessing';

export class AudioProcessor {
  private noiseSuppressor: any;
  private config: AudioConfig;

  constructor(config: AudioConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    this.noiseSuppressor = await createNoiseSuppressor();
  }

  async processAudioChunk(chunk: Float32Array): Promise<{ 
    processedAudio: Float32Array;
    isSpeech: boolean;
  }> {
    // Apply noise suppression
    const cleanAudio = await this.noiseSuppressor.process(chunk);
    
    // Detect voice activity
    const isSpeech = detectVoiceActivity(cleanAudio, this.config.vadThreshold);

    return {
      processedAudio: cleanAudio,
      isSpeech
    };
  }

  normalizeAudio(audioData: Float32Array): Float32Array {
    const maxValue = Math.max(...audioData.map(Math.abs));
    return audioData.map(x => x / maxValue);
  }
}