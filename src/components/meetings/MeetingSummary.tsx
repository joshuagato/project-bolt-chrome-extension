import React from 'react';

interface MeetingSummaryProps {
  summary: string;
}

export function MeetingSummary({ summary }: MeetingSummaryProps) {
  return (
    <div className="apple-card">
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-[#1d1d1f] leading-relaxed whitespace-pre-line">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}