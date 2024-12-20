import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export function StatsCard({ icon, label, value }: StatsCardProps) {
  return (
    <motion.div 
      className="apple-card p-6 hover:scale-[1.02] transition-transform"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#40b0fd] text-white">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-[#6e6e73]">{label}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}