import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TranscriptionControls } from '../components/notes/TranscriptionControls';
import { ShareOptions } from '../components/notes/ShareOptions';
import { AskNexcribe } from '../components/notes/AskNexcribe';
import { TranscriptionView } from '../components/notes/TranscriptionView';
import { useTranscription } from '../hooks/useTranscription';

export function NewNote() {
  const {
    isTranscribing,
    transcription,
    startTranscription,
    stopTranscription,
    pauseTranscription,
    resumeTranscription
  } = useTranscription();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [aiResponses, setAiResponses] = useState<Array<{ question: string; answer: string }>>([]);
  const [showEnhanceButton, setShowEnhanceButton] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Start transcription automatically when the component mounts
  useEffect(() => {
    startTranscription();
    return () => stopTranscription();
  }, [startTranscription, stopTranscription]);

  const toggleTranscription = () => {
    if (isTranscribing) {
      pauseTranscription();
      setShowEnhanceButton(true);
    } else {
      resumeTranscription();
    }
  };

  const handleShare = (method: 'email' | 'link' | 'slack') => {
    console.log(`Sharing via ${method}`);
  };

  const handleEnhanceWithAI = async () => {
    setIsEnhancing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const enhancedSummary = `
AI-Enhanced Summary:

Key Points:
• Meeting discussion points captured
• Action items identified
• Next steps outlined

Action Items:
✓ Follow up on key decisions
✓ Schedule next meeting
✓ Share meeting notes

Next Steps:
1. Review action items
2. Assign responsibilities
3. Set deadlines
`;
    
    setNotes(prev => prev + enhancedSummary);
    setIsEnhancing(false);
    setShowEnhanceButton(false);
  };

  const handleAskQuestion = (question: string) => {
    setTimeout(() => {
      setAiResponses(prev => [...prev, {
        question,
        answer: "Based on the transcription and notes, here's what I found..."
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="apple-card">
        {/* Header */}
        <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Note"
            className="text-2xl font-semibold bg-transparent border-none focus:outline-none 
                     text-[#1d1d1f] placeholder-[#86868b] flex-1"
          />
          <ShareOptions onShare={handleShare} />
        </div>

        <div className="grid grid-cols-3 divide-x divide-[#f0f0f0]">
          {/* Notes Section */}
          <div className="col-span-2 p-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start typing your notes here..."
              className="w-full h-[calc(100vh-300px)] resize-none bg-transparent border-none 
                       focus:outline-none text-[#1d1d1f] placeholder-[#86868b] 
                       text-base leading-relaxed"
            />
            
            {/* Transcription View */}
            <TranscriptionView
              isTranscribing={isTranscribing}
              transcription={transcription}
            />
          </div>

          {/* Controls & AI Section */}
          <div className="p-6 space-y-8">
            <TranscriptionControls
              isTranscribing={isTranscribing}
              onToggleTranscription={toggleTranscription}
              onEnhanceWithAI={handleEnhanceWithAI}
              showEnhanceButton={showEnhanceButton && !isEnhancing}
            />

            {(showEnhanceButton || aiResponses.length > 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t border-[#f0f0f0] pt-8"
              >
                <AskNexcribe
                  onAskQuestion={handleAskQuestion}
                  responses={aiResponses}
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}