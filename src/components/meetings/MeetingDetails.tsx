import React, { useState } from 'react';
import { Calendar, Clock, Users, Share2, Copy, Mail, MessageSquare, X, ChevronDown } from 'lucide-react';
import { Meeting } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import { cn } from '../../utils/cn';

interface MeetingDetailsProps {
  meeting: Meeting;
  onClose: () => void;
}

export function MeetingDetails({ meeting, onClose }: MeetingDetailsProps) {
  const [isTranscriptOpen, setIsTranscriptOpen] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = (method: 'email' | 'slack' | 'copy') => {
    // Implement sharing logic here
    console.log(`Sharing via ${method}`);
    setShowShareOptions(false);
  };

  const handleAskQuestion = (question: string) => {
    // Implement AI question handling here
    console.log('Question asked:', question);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/20 backdrop-blur-sm">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform">
          <div className="relative bg-white rounded-2xl shadow-xl">
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-semibold text-[#1d1d1f]">{meeting.title}</h2>
                <div className="mt-2 flex flex-wrap gap-4">
                  <span className="flex items-center text-sm text-[#6e6e73]">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(meeting.date)}
                  </span>
                  <span className="flex items-center text-sm text-[#6e6e73]">
                    <Clock className="h-4 w-4 mr-1" />
                    {meeting.duration} min
                  </span>
                  <span className="flex items-center text-sm text-[#6e6e73]">
                    <Users className="h-4 w-4 mr-1" />
                    {meeting.participants} participants
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="p-2 rounded-xl hover:bg-black/5 transition-colors"
                  >
                    <Share2 className="h-5 w-5 text-[#1d1d1f]" />
                  </button>
                  
                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                      <div className="p-2">
                        <button
                          onClick={() => handleShare('email')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-black/5"
                        >
                          <Mail className="h-4 w-4" />
                          Share via Email
                        </button>
                        <button
                          onClick={() => handleShare('slack')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-black/5"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Share to Slack
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-black/5"
                        >
                          <Copy className="h-4 w-4" />
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-black/5 transition-colors"
                >
                  <X className="h-5 w-5 text-[#1d1d1f]" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Summary</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-[#1d1d1f] leading-relaxed">
                    {meeting.summary}
                  </p>
                </div>
              </div>

              {/* Action Items */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Action Items</h3>
                <ul className="space-y-3">
                  {meeting.actionItems?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-[#0071e3]" />
                      <span className="text-[#1d1d1f]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transcript */}
              <div>
                <button
                  onClick={() => setIsTranscriptOpen(!isTranscriptOpen)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-[#0071e3] transition-colors"
                >
                  <span className="font-medium">View Full Transcript</span>
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform",
                    isTranscriptOpen && "transform rotate-180"
                  )} />
                </button>
                
                {isTranscriptOpen && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-50 animate-slideDown">
                    <p className="text-sm text-[#1d1d1f] whitespace-pre-line">
                      {/* Add actual transcript content here */}
                      This is the full transcript of the meeting...
                    </p>
                  </div>
                )}
              </div>

              {/* AI Assistant */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Ask Nexcribe</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask a question about this meeting..."
                    className="apple-input pr-24"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAskQuestion((e.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg bg-[#0071e3] text-white text-sm font-medium">
                    Ask
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}