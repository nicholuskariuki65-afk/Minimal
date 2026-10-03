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
      className="fixed bottom-22 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs shadow-lg border border-[var(--border)] backdrop-blur-md font-medium"
    >
      <WifiOff className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={1.75} />
      <span>Offline reading mode · Cached stories ready</span>
    </div>
  );
};
