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
      className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs shadow-md border border-stone-800 dark:border-stone-200"
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-400" />
      <span>Offline reading mode · Cached stories ready</span>
    </div>
  );
};
