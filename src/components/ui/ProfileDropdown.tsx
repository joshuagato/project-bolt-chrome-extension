import React, { useState, useRef, useEffect } from 'react';
import { Settings, Key, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (route: string) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 rounded-xl overflow-hidden ring-2 ring-white hover:ring-[#0071e3] 
                   transition-all duration-200 focus:outline-none"
      >
        <img
          src={user?.photoUrl}
          alt={user?.displayName}
          className="h-full w-full object-cover"
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-lg ring-1 ring-black/5',
            'transform opacity-100 scale-100 transition-all duration-200 ease-out',
            'origin-top-right z-50'
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user?.photoUrl}
                alt={user?.displayName}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-semibold text-[#1d1d1f]">{user?.displayName}</h3>
                <p className="text-sm text-[#6e6e73]">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => handleNavigate('/settings')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl
                         text-[#1d1d1f] hover:bg-black/5 transition-colors text-left"
              >
                <Settings className="h-5 w-5 text-[#6e6e73]" />
                Account Settings
              </button>
              <button 
                onClick={() => handleNavigate('/settings/password')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl
                         text-[#1d1d1f] hover:bg-black/5 transition-colors text-left"
              >
                <Key className="h-5 w-5 text-[#6e6e73]" />
                Change Password
              </button>
              <hr className="my-2 border-[#e5e5e5]" />
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl
                         text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}