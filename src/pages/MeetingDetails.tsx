import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { MeetingHeader } from '../components/meetings/MeetingHeader';
import { MeetingSummary } from '../components/meetings/MeetingSummary';
import { ActionItems } from '../components/meetings/ActionItems';
import { TranscriptSection } from '../components/meetings/TranscriptSection';

// Sample meeting data for demonstration
const meetingData = {
  id: '1',
  title: 'Q1 2024 Product Strategy Review',
  date: new Date('2024-03-20T10:00:00'),
  duration: 60,
  participants: 12,
  summary: `During our Q1 2024 Product Strategy Review, we outlined key initiatives and milestones for the upcoming quarter. The team presented impressive metrics showing a 40% increase in user engagement since our last major feature release.

Key Discussion Points:
• Mobile app redesign progress and timeline
• Enterprise feature roadmap expansion
• User retention optimization strategies
• International market expansion plans

The design team showcased new prototypes for the mobile experience, receiving positive feedback from stakeholders. We also identified several opportunities to enhance our enterprise offering based on recent customer feedback.`,
  actionItems: [
    'Schedule follow-up with design team to finalize mobile app wireframes',
    'Create detailed timeline for enterprise SSO implementation',
    'Review user feedback from beta testing group and prioritize top requests',
    'Prepare Q2 metrics dashboard for next month\'s review',
    'Set up meetings with international partners for market expansion'
  ],
  transcript: `[10:00 AM] Sarah Johnson (CEO): Welcome everyone to our Q1 Product Strategy Review. We have a packed agenda today.

[10:02 AM] Mike Chen (Product Lead): Thanks Sarah. I'll kick things off with our latest metrics. We're seeing a 40% increase in daily active users since the last release.

[10:15 AM] Emily Rodriguez (Design Director): Great numbers, Mike. Let me share our progress on the mobile redesign...`
};

export function MeetingDetails() {
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponses, setAiResponses] = useState<Array<{ question: string; answer: string }>>([]);

  const handleAskQuestion = () => {
    if (!aiQuestion.trim()) return;
    
    // Simulate AI response
    const newResponse = {
      question: aiQuestion,
      answer: "Based on the meeting transcript, the team discussed several key points including the mobile app redesign, enterprise features, and international expansion plans. The metrics showed a 40% increase in user engagement, which was highlighted as a significant achievement."
    };
    
    setAiResponses([...aiResponses, newResponse]);
    setAiQuestion('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <MeetingHeader meeting={meetingData} />
          <MeetingSummary summary={meetingData.summary} />
          <ActionItems items={meetingData.actionItems} />
          <div className="apple-card">
            <TranscriptSection transcript={meetingData.transcript} />
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="apple-card p-8 h-fit sticky top-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Ask Nexcribe
            </h2>

            <div className="space-y-6">
              {aiResponses.map((response, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-sm font-medium text-[#0071e3]">{response.question}</p>
                  <p className="text-sm text-[#1d1d1f] bg-[#f5f5f7] p-4 rounded-xl">
                    {response.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ask about this meeting..."
                className="apple-input pr-20"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAskQuestion();
                  }
                }}
              />
              <button
                onClick={handleAskQuestion}
                disabled={!aiQuestion.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-lg
                         bg-[#0071e3] text-white text-sm font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ask
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}