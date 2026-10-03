import React from 'react';
import { useApp } from '../../context/AppContext';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { Moon, Sun, Laptop } from 'lucide-react';
import { AppTheme } from '../../types';

export const TopBar: React.FC = () => {
  const { activeView, setActiveView, appTheme, setAppTheme } = useApp();

  const navItems = [
    { id: 'for-you', label: 'For You' },
    { id: 'explore', label: 'Explore' },
    { id: 'saved', label: 'Saved' },
    { id: 'settings', label: 'Settings' },
  ] as const;

  const cycleTheme = () => {
    const nextMap: Record<AppTheme, AppTheme> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
    };
    setAppTheme(nextMap[appTheme]);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-stone-200/80 dark:border-stone-800/80 bg-[#FBF9F5]/90 dark:bg-[#121212]/90 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => setActiveView('for-you')}
          className="text-lg sm:text-xl font-bold tracking-widest text-stone-900 dark:text-stone-100 uppercase hover:opacity-80 transition-opacity font-editorial-sans"
        >
          MINIMAL
        </button>

        {/* Zone 2: 4 nav links, clean text with subtle active state (Desktop/Tablet) */}
        <nav className="hidden sm:flex items-center gap-7 text-sm font-medium">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`py-1 relative transition-colors ${
                  isActive
                    ? 'text-stone-900 dark:text-white font-semibold'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[19px] left-0 right-0 h-[2px] bg-stone-900 dark:bg-stone-100" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PWAInstallButton variant="nav" />

          {/* Theme Quick Toggle */}
          <button
            onClick={cycleTheme}
            aria-label={`Toggle theme (currently ${appTheme})`}
            title={`Current theme: ${appTheme}. Click to cycle.`}
            className="w-8 h-8 rounded-md flex items-center justify-center text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-colors"
          >
            {appTheme === 'light' && <Sun className="w-4 h-4" />}
            {appTheme === 'dark' && <Moon className="w-4 h-4" />}
            {appTheme === 'system' && <Laptop className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
