class AudioProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.frameSize = options.processorOptions.frameSize;
    this.vadThreshold = options.processorOptions.vadThreshold;
    this.buffer = new Float32Array(this.frameSize);
    this.bufferIndex = 0;
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0][0];
    if (!input) return true;

    // Fill buffer with incoming audio
    for (let i = 0; i < input.length; i++) {
      this.buffer[this.bufferIndex++] = input[i];

      if (this.bufferIndex === this.frameSize) {
        // Calculate energy for VAD
        const energy = this.buffer.reduce((sum, sample) => sum + sample * sample, 0) / this.frameSize;
        const isSpeech = energy > this.vadThreshold;

        // Send buffer to main thread for processing
        this.port.postMessage({
          audioData: this.buffer.slice(),
          isSpeech
        });

        // Reset buffer
        this.bufferIndex = 0;
      }
    }

    return true;
  }
}

registerProcessor('audio-processor', AudioProcessor);