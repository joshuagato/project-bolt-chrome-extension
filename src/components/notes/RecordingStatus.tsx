import React from 'react';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecordingStatusProps {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
}

export function RecordingStatus({ isRecording, onStart, onStop }: RecordingStatusProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {isRecording ? (
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
              <Mic className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <p className="text-[#6e6e73] mb-4">Recording in progress...</p>
          <button
            onClick={onStop}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-medium
                     hover:bg-red-600 transition-colors"
          >
            Stop Recording
          </button>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={onStart}
            className="w-16 h-16 rounded-full bg-[#0071e3] flex items-center justify-center
                     hover:bg-[#0077ed] transition-colors mb-4"
          >
            <Mic className="h-8 w-8 text-white" />
          </button>
          <p className="text-[#6e6e73]">Click to start recording</p>
        </div>
      )}
    </div>
  );
}