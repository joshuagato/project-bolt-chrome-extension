import React from 'react';
import { PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function NewNoteButton() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <motion.button
        onClick={() => navigate('/notes/new')}
        className="w-full bg-white rounded-2xl p-8 text-[#1d1d1f] shadow-sm border border-[#e5e5e5]/50
                   hover:shadow-lg transition-all group"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-xl bg-[#0071e3]/10">
            <PenLine className="h-8 w-8 text-[#0071e3]" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2">New Note</h3>
            <p className="text-[#6e6e73] mb-4">
              Start taking notes for your meetings and events. Keep track of important discussions and decisions.
            </p>
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0071e3] text-white rounded-full text-sm
                         font-medium"
              whileHover={{ x: 5 }}
            >
              Take Notes
              <PenLine className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </motion.button>
    </div>
  );
}