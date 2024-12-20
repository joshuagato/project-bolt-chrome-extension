import { TranscriptionResult } from '../../types/transcription';

export class SpeechRecognitionService {
  private recognition: SpeechRecognition;
  private onTranscriptUpdate: (text: string) => void;

  constructor(onTranscriptUpdate: (text: string) => void) {
    this.onTranscriptUpdate = onTranscriptUpdate;
    this.recognition = this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): SpeechRecognition {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        this.onTranscriptUpdate(finalTranscript);
      }
    };

    return recognition;
  }

  start(): void {
    this.recognition.start();
  }

  stop(): void {
    this.recognition.stop();
  }

  pause(): void {
    this.recognition.stop();
  }

  resume(): void {
    this.recognition.start();
  }
}