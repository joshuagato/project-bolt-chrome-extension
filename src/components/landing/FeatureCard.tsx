import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="apple-card p-8">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0071e3] to-[#40b0fd] 
                    flex items-center justify-center mb-6">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}