import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Compass, Bookmark, SlidersHorizontal } from 'lucide-react';
import { ActiveView } from '../../types';
import { motion } from 'motion/react';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const tabs: Array<{
    id: ActiveView;
    label: string;
    icon: React.FC<{ className?: string; strokeWidth?: number }>;
  }> = [
    { id: 'for-you', label: 'For You', icon: BookOpen },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: SlidersHorizontal },
  ];

  return (
    <aside
      aria-label="Bottom Navigation"
      className="fixed bottom-5 sm:bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none pb-safe"
    >
      <nav
        role="navigation"
        className="pointer-events-auto w-full max-w-[340px] sm:max-w-[360px] rounded-full p-1.5 glass-dock relative select-none"
      >
        <div className="grid grid-cols-4 items-center relative">
          {tabs.map(tab => {
            const isActive = activeView === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center py-2 px-1 rounded-full transition-colors duration-200 min-h-[46px] cursor-pointer"
              >
                {/* Smooth Animated Active Pill with Glass Depth & High Contrast */}
                {isActive && (
                  <motion.div
                    layoutId="dock-active-indicator"
                    className="absolute inset-0 rounded-full bg-white/90 dark:bg-white/16 shadow-xs border border-black/5 dark:border-white/20"
                    transition={{
                      type: 'spring',
                      stiffness: 440,
                      damping: 34,
                      mass: 0.8,
                    }}
                  />
                )}

                {/* Tab Content (Icon & Label with Crisp High Contrast) */}
                <div
                  className={`relative z-10 flex flex-col items-center justify-center transition-colors duration-200 ${
                    isActive
                      ? 'text-stone-950 dark:text-white font-semibold'
                      : 'text-stone-600 hover:text-stone-950 dark:text-stone-300 dark:hover:text-white font-medium'
                  }`}
                >
                  <motion.span
                    animate={{ scale: isActive ? 1.06 : 1 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Icon
                      className="w-4 h-4"
                      strokeWidth={isActive ? 2.1 : 1.75}
                    />
                  </motion.span>
                  <span className="text-[10px] tracking-tight mt-1 leading-none">
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};
