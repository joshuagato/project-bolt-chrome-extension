import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TranscriptViewerProps {
  transcript: string;
}

export function TranscriptViewer({ transcript }: TranscriptViewerProps) {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);

  return (
    <div className="apple-card">
      <div className="p-8">
        <button
          onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
          className="w-full flex items-center justify-between"
        >
          <h2 className="text-xl font-semibold">Full Transcript</h2>
          <ChevronDown className={cn(
            "h-5 w-5 transition-transform",
            isTranscriptOpen && "transform rotate-180"
          )} />
        </button>
        
        {isTranscriptOpen && (
          <div className="mt-6 animate-slideDown">
            <pre className="text-sm text-[#1d1d1f] whitespace-pre-wrap font-mono bg-gray-50 p-6 rounded-xl">
              {transcript}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}