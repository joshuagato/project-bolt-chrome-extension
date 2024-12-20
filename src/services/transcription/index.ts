import { TranscriptionResult } from '../../types/transcription';

// Simple mock transcription service for demo purposes
export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      text: "Sample transcription of the recorded audio...",
      speakers: [{ id: "speaker1", name: "Speaker 1" }],
      segments: [{
        speakerId: "speaker1",
        text: "Sample transcription segment",
        startTime: 0,
        endTime: 5,
        confidence: 0.95
      }],
      summary: "Brief summary of the transcribed content",
      actionItems: [
        "First action item",
        "Second action item"
      ]
    };
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio');
  }
}