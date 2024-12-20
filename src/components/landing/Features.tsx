import React from 'react';
import { Brain, Clock, Share2, FileText } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: FileText,
      title: 'AI-Powered Transcription',
      description: 'Automatically convert your meetings into searchable text',
    },
    {
      icon: Brain,
      title: 'Smart Summaries',
      description: 'Get AI-generated summaries of key points and action items',
    },
    {
      icon: Clock,
      title: 'Time Saving',
      description: 'Focus on the conversation, let us handle the note-taking',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Share meeting notes with your team in one click',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}