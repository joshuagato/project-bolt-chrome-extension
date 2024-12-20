import React, { useState } from 'react';
import { X, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShareOptions } from './ShareOptions';

interface RecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecordingModal({ isOpen, onClose }: RecordingModalProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleShare = (method: 'email' | 'link' | 'slack') => {
    console.log(`Sharing via ${method}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div 
          className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-center p-6 border-b border-[#f0f0f0]">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Note"
              className="text-2xl font-semibold bg-transparent border-none focus:outline-none 
                       text-[#1d1d1f] placeholder-[#86868b]"
            />
            <div className="flex items-center gap-4">
              <ShareOptions onShare={handleShare} />
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-black/5 transition-colors"
              >
                <X className="h-5 w-5 text-[#1d1d1f]" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Start typing your notes here..."
              className="w-full h-[400px] resize-none bg-transparent border-none focus:outline-none
                       text-[#1d1d1f] placeholder-[#86868b] text-base leading-relaxed"
              autoFocus
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}