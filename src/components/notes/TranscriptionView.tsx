import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TranscriptionViewProps {
  isTranscribing: boolean;
  transcription: string;
}

export function TranscriptionView({ isTranscribing, transcription }: TranscriptionViewProps) {
  const [showTranscript, setShowTranscript] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      {/* Animated Indicator */}
      <motion.button
        onClick={() => setShowTranscript(!showTranscript)}
        className={cn(
          "w-full p-4 rounded-xl bg-[#f5f5f7] relative overflow-hidden",
          "hover:bg-[#f0f0f2] transition-colors duration-200",
          "flex items-center gap-4"
        )}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Waveform Animation */}
        <div className="relative w-12 h-12 rounded-xl bg-[#0071e3]/10 flex items-center justify-center">
          {isTranscribing ? (
            <div className="flex items-center gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-[#0071e3]"
                  animate={{
                    height: ["8px", "16px", "8px"],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          ) : (
            <Activity className="h-6 w-6 text-[#0071e3]" />
          )}
        </div>

        <div className="flex-1 text-left">
          <p className="font-medium text-[#1d1d1f]">
            {isTranscribing ? 'Transcription in Progress' : 'Transcription Paused'}
          </p>
          <p className="text-sm text-[#6e6e73]">
            {showTranscript ? 'Click to hide transcription' : 'Click to view transcription'}
          </p>
        </div>

        {/* Live Recording Indicator */}
        {isTranscribing && (
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#0071e3]"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-[#0071e3]">Recording</span>
          </div>
        )}
      </motion.button>

      {/* Transcription Content */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="p-6 rounded-xl bg-[#f5f5f7] font-mono text-sm text-[#1d1d1f] whitespace-pre-wrap leading-relaxed">
              {transcription || "Waiting for speech..."}
              {isTranscribing && (
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block ml-1"
                >
                  ▋
                </motion.span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}