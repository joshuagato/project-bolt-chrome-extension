import React from 'react';
import { Settings } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white/30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Settings className="h-20 w-20 text-[#0071e3]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0071e3] to-[#40b0fd]">
              Nexcribe
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your meetings with AI-powered note-taking and smart summaries
          </p>
        </div>
      </div>
    </div>
  );
}