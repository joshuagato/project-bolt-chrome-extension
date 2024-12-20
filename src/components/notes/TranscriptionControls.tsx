import React from 'react';
import { Mic, MicOff, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TranscriptionControlsProps {
  isTranscribing: boolean;
  onToggleTranscription: () => void;
  onEnhanceWithAI: () => void;
}

export function TranscriptionControls({
  isTranscribing,
  onToggleTranscription,
  onEnhanceWithAI
}: TranscriptionControlsProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <motion.button
        onClick={onToggleTranscription}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                   ${isTranscribing ? 'bg-red-500 hover:bg-red-600' : 'bg-[#0071e3] hover:bg-[#0077ed]'}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isTranscribing ? (
          <MicOff className="h-8 w-8 text-white" />
        ) : (
          <Mic className="h-8 w-8 text-white" />
        )}
      </motion.button>

      <div className="text-center">
        <p className="text-[#1d1d1f] font-medium">
          {isTranscribing ? 'Recording in Progress' : 'Ready to Record'}
        </p>
        <p className="text-[#6e6e73] text-sm">
          {isTranscribing ? 'Click to pause' : 'Click to resume'}
        </p>
      </div>

      <AnimatePresence>
        {!isTranscribing && (
          <motion.button
            onClick={onEnhanceWithAI}
            className="flex items-center gap-2 px-6 py-3 bg-[#0071e3] text-white rounded-full
                     hover:bg-[#0077ed] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Wand2 className="h-5 w-5" />
            Enhance with AI
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}