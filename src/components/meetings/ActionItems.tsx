import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ActionItemsProps {
  items: string[];
}

export function ActionItems({ items }: ActionItemsProps) {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newCompleted = new Set(completedItems);
    if (completedItems.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedItems(newCompleted);
  };

  return (
    <div className="apple-card">
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-6">Action Items</h2>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <motion.li
              key={index}
              className="flex items-start gap-4 group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleItem(index)}
                className={`relative flex-shrink-0 w-6 h-6 rounded-lg border-2 transition-colors
                          ${completedItems.has(index)
                            ? 'bg-[#0071e3] border-[#0071e3]'
                            : 'border-[#d1d1d6] group-hover:border-[#0071e3]'
                          }`}
              >
                <motion.div
                  initial={false}
                  animate={{ scale: completedItems.has(index) ? 1 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              </button>
              <span className={`flex-1 transition-colors ${
                completedItems.has(index)
                  ? 'text-[#86868b] line-through'
                  : 'text-[#1d1d1f]'
              }`}>
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}