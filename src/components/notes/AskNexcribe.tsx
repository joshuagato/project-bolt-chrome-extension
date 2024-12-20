import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

interface AskNexcribeProps {
  onAskQuestion: (question: string) => void;
  responses: Array<{ question: string; answer: string }>;
}

export function AskNexcribe({ onAskQuestion, responses }: AskNexcribeProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onAskQuestion(question);
      setQuestion('');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Ask Nexcribe
      </h3>

      <div className="space-y-6">
        {responses.map((response, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-medium text-[#0071e3]">{response.question}</p>
            <p className="text-sm text-[#1d1d1f] bg-[#f5f5f7] p-4 rounded-xl">
              {response.answer}
            </p>
          </motion.div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about this note..."
          className="apple-input pr-20"
        />
        <button
          type="submit"
          disabled={!question.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg
                   bg-[#0071e3] text-white text-sm font-medium
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ask
        </button>
      </form>
    </div>
  );
}