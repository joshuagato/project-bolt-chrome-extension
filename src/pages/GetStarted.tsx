import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { GoogleSignIn } from '../components/landing/GoogleSignIn';

export function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5f5f7] to-white flex flex-col items-center justify-center px-4">
      {/* Logo Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 10,
            stiffness: 100,
          }
        }}
        className="mb-8"
      >
        <div className="relative">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#40b0fd]
                     flex items-center justify-center shadow-lg"
          >
            <Settings className="h-12 w-12 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Text Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent 
                     bg-gradient-to-r from-[#0071e3] to-[#40b0fd]">
          Nexcribe
        </h1>
        <p className="text-[#6e6e73] text-xl">
          Transform your meetings with AI-powered notes
        </p>
      </motion.div>

      {/* Sign In Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <GoogleSignIn />
      </motion.div>

      {/* Terms and Privacy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 text-center text-sm text-[#6e6e73]"
      >
        <p>
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#0071e3] hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#0071e3] hover:underline">Privacy Policy</a>
        </p>
      </motion.div>
    </div>
  );
}