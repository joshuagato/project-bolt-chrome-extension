export class AudioBuffer {
  private chunks: Float32Array[] = [];
  private totalSamples = 0;

  addChunk(chunk: Float32Array): void {
    this.chunks.push(chunk);
    this.totalSamples += chunk.length;
  }

  clear(): void {
    this.chunks = [];
    this.totalSamples = 0;
  }

  isEmpty(): boolean {
    return this.chunks.length === 0;
  }

  getCombinedAudio(): Float32Array {
    if (this.isEmpty()) {
      return new Float32Array(0);
    }

    const result = new Float32Array(this.totalSamples);
    let offset = 0;

    for (const chunk of this.chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }
}