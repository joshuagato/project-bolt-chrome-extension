import React from 'react';
import type { TranscriptionResult } from '../../types/transcription';

interface TranscriptionPreviewProps {
  result?: TranscriptionResult;
  isLoading: boolean;
}

export function TranscriptionPreview({ result, isLoading }: TranscriptionPreviewProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900">Transcription</h4>
        <p className="mt-1 text-sm text-gray-600">{result.text}</p>
      </div>
      
      {result.summary && (
        <div>
          <h4 className="text-sm font-medium text-gray-900">Summary</h4>
          <p className="mt-1 text-sm text-gray-600">{result.summary}</p>
        </div>
      )}

      {result.actionItems && result.actionItems.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900">Action Items</h4>
          <ul className="mt-1 space-y-1">
            {result.actionItems.map((item, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mr-2"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}