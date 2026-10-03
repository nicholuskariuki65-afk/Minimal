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
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)] transition-colors text-left shadow-xs cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Download className="w-4 h-4 text-[var(--icon)]" strokeWidth={1.75} />
            <div>
              <div className="text-sm font-medium text-[var(--foreground)]">
                Install Minimal App
              </div>
              <div className="text-xs text-[var(--foreground-muted)]">
                Install on your device for distraction-free reading
              </div>
            </div>
          </div>
          <span className="text-xs font-medium text-[var(--foreground)] border border-[var(--border)] rounded-md px-2.5 py-1">
            Install
          </span>
        </button>
      );
    }

    return (
      <button
        onClick={install}
        aria-label="Install Minimal PWA"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] border border-[var(--border)] rounded-md hover:bg-[var(--surface)] transition-colors whitespace-nowrap cursor-pointer"
      >
        <Download className="w-3.5 h-3.5 text-[var(--icon)]" strokeWidth={1.75} />
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
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)] transition-colors text-left shadow-xs cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4 text-[var(--icon)]" strokeWidth={1.75} />
              <div>
                <div className="text-sm font-medium text-[var(--foreground)]">
                  Add to Home Screen
                </div>
                <div className="text-xs text-[var(--foreground-muted)]">
                  Open as a standalone app on iOS Safari
                </div>
              </div>
            </div>
            <span className="text-xs font-medium text-[var(--foreground)] border border-[var(--border)] rounded-md px-2 py-1">
              Instructions
            </span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[var(--foreground)] border border-[var(--border)] rounded-md hover:bg-[var(--surface)] transition-colors whitespace-nowrap cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[var(--icon)]" strokeWidth={1.75} />
            <span>Install on iOS</span>
          </button>
        )}

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in"
            onClick={() => setShowIOSGuide(false)}
          >
            <div
              className="w-full max-w-sm rounded-2xl bg-[var(--surface)] p-6 shadow-2xl border border-[var(--border)] relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-[var(--foreground-muted)] hover:text-[var(--foreground)] p-1 rounded cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Install Minimal on iPhone / iPad
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--foreground-secondary)]">
                For a distraction-free, full-screen reading experience on Safari:
              </p>
              <ol className="mt-3 space-y-2 text-xs text-[var(--foreground-secondary)] list-decimal list-inside pl-1">
                <li>
                  Tap the <strong className="font-semibold text-[var(--foreground)]">Share</strong> button in Safari’s navigation bar.
                </li>
                <li>
                  Scroll down and choose <strong className="font-semibold text-[var(--foreground)]">Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong className="font-semibold text-[var(--foreground)]">Add</strong> in the top-right corner.
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-[var(--foreground)] text-[var(--background)] py-2.5 text-xs font-semibold hover:opacity-90 transition shadow-xs cursor-pointer"
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
