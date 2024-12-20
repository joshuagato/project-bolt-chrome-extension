import React, { useState } from 'react';
import { ChevronDown, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TranscriptSectionProps {
  transcript: string;
}

export function TranscriptSection({ transcript }: TranscriptSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 border-t border-[#f0f0f0]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center
                     group-hover:bg-[#0071e3]/20 transition-colors"
          >
            <FileText className="h-5 w-5 text-[#0071e3]" />
          </motion.div>
          <span className="text-xl font-semibold text-[#1d1d1f]">Full Transcript</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-[#6e6e73]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-6 bg-[#f5f5f7] rounded-xl p-6">
              <pre className="font-mono text-sm text-[#1d1d1f] whitespace-pre-wrap leading-relaxed">
                {transcript}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}