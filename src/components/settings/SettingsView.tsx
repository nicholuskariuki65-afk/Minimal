import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PWAInstallButton } from '../common/PWAInstallButton';
import {
  AppTheme,
  ReaderFontFamily,
  ReaderFontSize,
  ReaderLineSpacing,
  ReaderWidth,
} from '../../types';
import {
  Moon,
  Sun,
  Monitor,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Info,
} from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsView: React.FC = () => {
  const {
    appTheme,
    setAppTheme,
    readerPreferences,
    updateReaderPreferences,
    selectedTopics,
    setActiveView,
    resetOnboarding,
    savedStoryIds,
  } = useApp();

  const [confirmReset, setConfirmReset] = useState(false);

  const themeOptions: Array<{ id: AppTheme; label: string; icon: React.FC<{ className?: string; strokeWidth?: number }> }> = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const fontOptions: Array<{ id: ReaderFontFamily; label: string }> = [
    { id: 'serif', label: 'Serif (Newsreader)' },
    { id: 'sans', label: 'Sans (Plus Jakarta)' },
    { id: 'mono', label: 'Monospace (JetBrains)' },
  ];

  const sizeOptions: Array<{ id: ReaderFontSize; label: string }> = [
    { id: 'sm', label: 'Small' },
    { id: 'md', label: 'Medium' },
    { id: 'lg', label: 'Large' },
    { id: 'xl', label: 'Extra Large' },
  ];

  const widthOptions: Array<{ id: ReaderWidth; label: string }> = [
    { id: 'compact', label: 'Compact (560px)' },
    { id: 'optimal', label: 'Optimal (680px)' },
    { id: 'wide', label: 'Wide (800px)' },
  ];

  const spacingOptions: Array<{ id: ReaderLineSpacing; label: string }> = [
    { id: 'tight', label: 'Compact (1.5x)' },
    { id: 'normal', label: 'Normal (1.75x)' },
    { id: 'relaxed', label: 'Relaxed (2.0x)' },
  ];

  const handleResetData = () => {
    localStorage.clear();
    setConfirmReset(false);
    resetOnboarding();
  };

  return (
    <div className="max-w-2xl mx-auto w-full pb-20">
      {/* Title */}
      <div className="mb-8 pb-3 border-b border-[var(--border)]">
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[var(--foreground)]">
          Settings
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[var(--foreground-secondary)]">
          Fine-tune your reading environment and preferences.
        </p>
      </div>

      <div className="space-y-10">
        {/* Section 1: Appearance */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--foreground-muted)] font-editorial-sans">
            Appearance
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {themeOptions.map(opt => {
              const Icon = opt.icon;
              const isSelected = appTheme === opt.id;
              return (
                <motion.button
                  key={opt.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setAppTheme(opt.id)}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] shadow-xs font-semibold'
                      : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--foreground-secondary)]'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1.5" strokeWidth={1.75} />
                  <span>{opt.label}</span>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Section 2: Reading Default Preferences */}
        <section className="space-y-5 pt-4 border-t border-[var(--border)]">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--foreground-muted)] font-editorial-sans">
            Reading Defaults
          </h2>

          {/* Typeface */}
          <div>
            <label className="text-xs font-medium text-[var(--foreground)] block mb-2">
              Default Typeface
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {fontOptions.map(font => {
                const isSelected = readerPreferences.fontFamily === font.id;
                return (
                  <motion.button
                    key={font.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => updateReaderPreferences({ fontFamily: font.id })}
                    className={`py-2 px-3 rounded-lg border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-xs'
                        : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)]'
                    }`}
                  >
                    <span>{font.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.2]" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="text-xs font-medium text-[var(--foreground)] block mb-2">
              Default Text Size
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {sizeOptions.map(sz => {
                const isSelected = readerPreferences.fontSize === sz.id;
                return (
                  <motion.button
                    key={sz.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => updateReaderPreferences({ fontSize: sz.id })}
                    className={`py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-xs'
                        : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)]'
                    }`}
                  >
                    {sz.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Width & Spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-[var(--foreground)] block mb-2">
                Reading Column Width
              </label>
              <div className="space-y-1.5">
                {widthOptions.map(w => {
                  const isSelected = readerPreferences.readingWidth === w.id;
                  return (
                    <motion.button
                      key={w.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => updateReaderPreferences({ readingWidth: w.id })}
                      className={`w-full py-2 px-3 rounded-lg border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-medium shadow-xs'
                          : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)]'
                      }`}
                    >
                      <span>{w.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.2]" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[var(--foreground)] block mb-2">
                Line Spacing
              </label>
              <div className="space-y-1.5">
                {spacingOptions.map(sp => {
                  const isSelected = readerPreferences.lineSpacing === sp.id;
                  return (
                    <motion.button
                      key={sp.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => updateReaderPreferences({ lineSpacing: sp.id })}
                      className={`w-full py-2 px-3 rounded-lg border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-medium shadow-xs'
                          : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)]'
                      }`}
                    >
                      <span>{sp.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.2]" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Topics Management */}
        <section className="space-y-4 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--foreground-muted)] font-editorial-sans">
                Curated Topics
              </h2>
              <p className="text-xs text-[var(--foreground-secondary)] mt-0.5">
                {selectedTopics.length} topics currently followed in your For You feed.
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveView('topics')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--foreground)] border border-[var(--border)] px-3 py-1.5 rounded-lg hover:bg-[var(--surface)] transition cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Manage Topics</span>
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {selectedTopics.map(topic => (
              <span
                key={topic}
                className="text-xs font-medium text-[var(--foreground)] bg-[var(--surface)] border border-[var(--border)] px-2.5 py-1 rounded-md"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        {/* Section 4: PWA / Device Installation */}
        <section className="space-y-3 pt-4 border-t border-[var(--border)]">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--foreground-muted)] font-editorial-sans">
            App & Offline
          </h2>
          <PWAInstallButton variant="settings" />
        </section>

        {/* Section 5: About Minimal */}
        <section className="space-y-4 pt-4 border-t border-[var(--border)]">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-[var(--foreground-muted)] font-editorial-sans">
            About Minimal
          </h2>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3 text-xs leading-relaxed text-[var(--foreground-secondary)] shadow-xs">
            <div className="flex items-center gap-2 font-semibold text-[var(--foreground)] text-sm">
              <Info className="w-4 h-4 text-[var(--foreground-muted)]" strokeWidth={1.75} />
              <span>Minimal v1.0.0</span>
            </div>
            <p>
              Minimal is a calm, distraction-free reading sanctuary. We believe that clarity precedes comprehension, and that meaningful reading requires quiet space rather than algorithmic velocity.
            </p>
            <p className="italic text-[var(--foreground-secondary)]">
              “You choose what matters. We make it easy to read.”
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-[var(--foreground-muted)] border-t border-[var(--border-subtle)]">
              <span>Local Storage: {savedStoryIds.length} saved stories</span>
              <span>All rights reserved</span>
            </div>
          </div>

          {/* Reset App State */}
          <div className="pt-2">
            {!confirmReset ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-muted)] hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Reset all preferences & restart onboarding</span>
              </motion.button>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs">
                <span className="text-rose-700 dark:text-rose-300 font-medium">
                  Reset local cache and begin fresh onboarding?
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetData}
                  className="px-2.5 py-1 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 transition cursor-pointer"
                >
                  Confirm Reset
                </motion.button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-2 py-1 text-[var(--foreground-secondary)] hover:underline cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
