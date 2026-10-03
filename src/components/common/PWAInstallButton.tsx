import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { Download, Share2, X } from 'lucide-react';

interface Props {
  variant?: 'nav' | 'prominent' | 'settings';
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'nav' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed as standalone PWA, suppress the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'settings') {
      return (
        <button
          onClick={install}
          className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <Download className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <div>
              <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                Install Minimal App
              </div>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                Install on your device for distraction-free reading
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1">
            Install
          </span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        aria-label="Install Minimal PWA"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors whitespace-nowrap"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        {variant === 'settings' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4 text-stone-700 dark:text-stone-300" />
              <div>
                <div className="text-sm font-medium text-stone-900 dark:text-stone-100">
                  Add to Home Screen
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400">
                  Open as a standalone app on iOS Safari
                </div>
              </div>
            </div>
            <span className="text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 rounded px-2 py-1">
              Instructions
            </span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Install on iOS</span>
          </button>
        )}

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-xl bg-[#FBF9F5] dark:bg-[#1C1C1F] p-6 shadow-xl border border-stone-200 dark:border-stone-800 relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-base font-semibold text-stone-900 dark:text-stone-100">
                Install Minimal on iPhone / iPad
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                For a distraction-free, full-screen reading experience on Safari:
              </p>
              <ol className="mt-3 space-y-2 text-xs text-stone-700 dark:text-stone-300 list-decimal list-inside pl-1">
                <li>
                  Tap the <strong className="font-semibold">Share</strong> button in Safari’s navigation bar.
                </li>
                <li>
                  Scroll down and choose <strong className="font-semibold">Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong className="font-semibold">Add</strong> in the top-right corner.
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-lg bg-stone-900 dark:bg-stone-100 py-2 text-xs font-medium text-stone-100 dark:text-stone-900 hover:opacity-90 transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
