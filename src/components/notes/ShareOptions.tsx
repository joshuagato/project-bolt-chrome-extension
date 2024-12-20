import React from 'react';
import { Mail, Link2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface ShareOptionsProps {
  onShare: (method: 'email' | 'link' | 'slack') => void;
}

export function ShareOptions({ onShare }: ShareOptionsProps) {
  return (
    <div className="flex items-center gap-4">
      <motion.button
        onClick={() => onShare('email')}
        className="p-2 rounded-xl hover:bg-black/5 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="h-5 w-5 text-[#1d1d1f]" />
      </motion.button>
      
      <motion.button
        onClick={() => onShare('link')}
        className="p-2 rounded-xl hover:bg-black/5 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link2 className="h-5 w-5 text-[#1d1d1f]" />
      </motion.button>
      
      <motion.button
        onClick={() => onShare('slack')}
        className="p-2 rounded-xl hover:bg-black/5 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="h-5 w-5 text-[#1d1d1f]" />
      </motion.button>
    </div>
  );
}