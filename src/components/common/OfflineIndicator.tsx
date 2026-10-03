import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-22 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/95 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs shadow-lg border border-stone-700/80 dark:border-stone-200/80 backdrop-blur-md font-medium"
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 shrink-0" strokeWidth={1.75} />
      <span>Offline reading mode · Cached stories ready</span>
    </div>
  );
};
