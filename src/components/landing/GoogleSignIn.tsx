import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

export function GoogleSignIn() {
  const { signInWithGoogle } = useAuth();

  return (
    <motion.button
      onClick={signInWithGoogle}
      className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-lg
                 hover:shadow-xl transition-all border border-[#e5e5e5]"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-6 h-6"
      />
      <span className="text-[#1d1d1f] font-medium">Continue with Google</span>
    </motion.button>
  );
}