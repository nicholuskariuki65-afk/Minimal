import React from 'react';
import { useApp } from '../../context/AppContext';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { Moon, Sun, Monitor } from 'lucide-react';
import { AppTheme } from '../../types';
import { motion } from 'motion/react';

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
    <header className="sticky top-0 z-30 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          onClick={() => setActiveView('for-you')}
          className="text-lg sm:text-xl font-bold tracking-widest text-[var(--foreground)] uppercase hover:opacity-85 transition-opacity font-editorial-sans cursor-pointer interactive-tap"
        >
          MINIMAL
        </button>

        {/* Zone 2: Desktop navigation links with sliding underline (visible on desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`py-1 relative transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[var(--foreground)] font-semibold'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="topbar-active-indicator"
                    className="absolute -bottom-[19px] sm:-bottom-[23px] left-0 right-0 h-[2px] bg-[var(--foreground)]"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PWAInstallButton variant="nav" />

          {/* Theme Quick Toggle with modern line icons & subtle tap feedback */}
          <button
            onClick={cycleTheme}
            aria-label={`Toggle theme (currently ${appTheme})`}
            title={`Current theme: ${appTheme}. Click to cycle.`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-secondary)] transition-colors interactive-tap cursor-pointer"
          >
            {appTheme === 'light' && <Sun className="w-4 h-4" strokeWidth={1.75} />}
            {appTheme === 'dark' && <Moon className="w-4 h-4" strokeWidth={1.75} />}
            {appTheme === 'system' && <Monitor className="w-4 h-4" strokeWidth={1.75} />}
          </button>
        </div>
      </div>
    </header>
  );
};
