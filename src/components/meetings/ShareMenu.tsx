import React, { useState } from 'react';
import { Share2, Mail, MessageSquare, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ShareMenu() {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = async (method: 'email' | 'slack' | 'copy') => {
    switch (method) {
      case 'email':
        window.location.href = `mailto:?subject=Meeting Notes: Q1 Product Strategy Review&body=Here are the notes from our meeting...`;
        break;
      case 'slack':
        // In production, this would integrate with Slack's Web API
        console.log('Sharing to Slack');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(window.location.href);
          // You could show a toast notification here
          console.log('Link copied to clipboard');
        } catch (err) {
          console.error('Failed to copy link:', err);
        }
        break;
    }
    setShowShareOptions(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="apple-button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Share2 className="h-5 w-5 mr-2" />
        Share Notes
      </motion.button>
      
      <AnimatePresence>
        {showShareOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5
                     overflow-hidden"
          >
            <div className="p-2">
              <motion.button
                onClick={() => handleShare('email')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5
                         text-[#1d1d1f] transition-colors"
                whileHover={{ x: 4 }}
              >
                <Mail className="h-5 w-5 text-[#6e6e73]" />
                Share via Email
              </motion.button>
              <motion.button
                onClick={() => handleShare('slack')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5
                         text-[#1d1d1f] transition-colors"
                whileHover={{ x: 4 }}
              >
                <MessageSquare className="h-5 w-5 text-[#6e6e73]" />
                Share to Slack
              </motion.button>
              <motion.button
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl hover:bg-black/5
                         text-[#1d1d1f] transition-colors"
                whileHover={{ x: 4 }}
              >
                <Copy className="h-5 w-5 text-[#6e6e73]" />
                Copy Link
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}