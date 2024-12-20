import { TranscriptionResult } from '../types/transcription';

// Simple mock transcription service for demo purposes
export async function transcribeAudio(audioBlob: Blob): Promise<TranscriptionResult> {
  try {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return {
      text: "Sample transcription of the recorded audio...",
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