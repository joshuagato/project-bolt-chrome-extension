import { TranscriptionEngine } from '../core/transcriptionEngine';
import { AudioProcessor } from '../core/audioProcessor';

let transcriptionEngine: TranscriptionEngine;
let audioProcessor: AudioProcessor;

// Initialize services
async function initialize() {
  transcriptionEngine = new TranscriptionEngine();
  audioProcessor = new AudioProcessor({
    frameSize: 4096,
    vadThreshold: 0.2,
    sampleRate: 16000,
    channels: 1,
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true
  });

  await Promise.all([
    transcriptionEngine.initialize(),
    audioProcessor.initialize()
  ]);
}

// Handle messages from main thread
self.onmessage = async (event) => {
  if (event.data.type === 'initialize') {
    await initialize();
    self.postMessage({ type: 'initialized' });
  } else if (event.data.type === 'process') {
    const { audioData } = event.data;
    const { processedAudio } = await audioProcessor.processAudioChunk(new Float32Array(audioData));
    const result = await transcriptionEngine.transcribeStream(processedAudio);
    
    if (result.text) {
      self.postMessage({ type: 'transcription', text: result.text });
    }
  }
};