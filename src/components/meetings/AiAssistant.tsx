import React, { useState } from 'react';

export function AiAssistant() {
  const [question, setQuestion] = useState('');

  const handleAskQuestion = () => {
    if (question.trim()) {
      console.log('Question asked:', question);
      setQuestion('');
    }
  };

  return (
    <div className="apple-card">
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Ask Nexcribe</h2>
        <div className="space-y-4">
          <p className="text-sm text-[#6e6e73]">
            Ask questions about this meeting and get AI-powered answers
          </p>
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What were the key decisions?"
              className="apple-input pr-24"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAskQuestion();
                }
              }}
            />
            <button
              onClick={handleAskQuestion}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg 
                       bg-[#0071e3] text-white text-sm font-medium"
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}