import React from 'react';
import { Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

export function ChromeExtensionButton() {
  const handleInstallExtension = () => {
    // Chrome Web Store URL would go here in production
    window.open('https://chrome.google.com/webstore', '_blank');
  };

  return (
    <motion.button
      onClick={handleInstallExtension}
      className="apple-button inline-flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Chrome className="h-5 w-5" />
      Add to Chrome
    </motion.button>
  );
}