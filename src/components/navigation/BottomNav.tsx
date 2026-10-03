import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Compass, Bookmark, Settings2 } from 'lucide-react';
import { ActiveView } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const tabs: Array<{ id: ActiveView; label: string; icon: React.FC<{ className?: string }> }> = [
    { id: 'for-you', label: 'For You', icon: BookOpen },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings2 },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#141416]/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 pb-safe transition-colors">
      <nav className="grid grid-cols-4 h-14 items-center">
        {tabs.map(tab => {
          const isActive = activeView === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors ${
                isActive
                  ? 'text-stone-900 dark:text-stone-100 font-semibold'
                  : 'text-stone-400 hover:text-stone-700 dark:text-stone-500 dark:hover:text-stone-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.7]'}`} />
              <span className="text-[10px] tracking-tight mt-1">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
