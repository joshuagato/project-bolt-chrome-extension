import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ListChecks, BrainCircuit } from 'lucide-react';

interface EnhancementResultProps {
  summary: string;
  actionItems: string[];
  keyPoints: string[];
}

export function EnhancementResult({ summary, actionItems, keyPoints }: EnhancementResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Summary */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="h-5 w-5 text-[#0071e3]" />
          <h3 className="text-lg font-semibold">AI-Generated Summary</h3>
        </div>
        <p className="text-[#1d1d1f] leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </div>

      {/* Key Points */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-[#0071e3]" />
          <h3 className="text-lg font-semibold">Key Points</h3>
        </div>
        <ul className="space-y-2">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#0071e3] flex-shrink-0" />
              <span className="text-[#1d1d1f]">{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <ListChecks className="h-5 w-5 text-[#0071e3]" />
          <h3 className="text-lg font-semibold">Action Items</h3>
        </div>
        <ul className="space-y-2">
          {actionItems.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <label className="group flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded-md border-gray-300 text-[#0071e3]
                           focus:ring-[#0071e3] cursor-pointer"
                />
                <span className="text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                  {item}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}