import { useState } from 'react';
import { AiEnhancementService } from '../services/ai/aiEnhancementService';

interface EnhancementResult {
  summary: string;
  actionItems: string[];
  keyPoints: string[];
}

export function useAiEnhancement() {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementResult, setEnhancementResult] = useState<EnhancementResult | null>(null);
  const aiService = new AiEnhancementService();

  const enhanceContent = async (transcription: string, notes: string) => {
    setIsEnhancing(true);
    try {
      const result = await aiService.enhanceTranscription(transcription, notes);
      setEnhancementResult(result);
      return result;
    } catch (error) {
      console.error('Enhancement failed:', error);
      throw error;
    } finally {
      setIsEnhancing(false);
    }
  };

  return {
    isEnhancing,
    enhancementResult,
    enhanceContent
  };
}