import React from 'react';
import { Menu, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProfileDropdown } from './ui/ProfileDropdown';

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0071e3] to-[#40b0fd] 
                            flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1d1d1f]">Nexcribe</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/settings')}
              className="p-2 rounded-xl hover:bg-black/5 transition-colors"
            >
              <Settings className="h-5 w-5 text-[#1d1d1f]" />
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}