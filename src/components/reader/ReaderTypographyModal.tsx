import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check } from 'lucide-react';
import {
  ReaderFontFamily,
  ReaderFontSize,
  ReaderLineSpacing,
  ReaderTheme,
  ReaderWidth,
} from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderTypographyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { readerPreferences, updateReaderPreferences } = useApp();

  const fontOptions: Array<{ id: ReaderFontFamily; label: string; preview: string }> = [
    { id: 'serif', label: 'Newsreader', preview: 'Serif' },
    { id: 'sans', label: 'Jakarta', preview: 'Sans' },
    { id: 'mono', label: 'Mono', preview: 'Typewriter' },
  ];

  const sizeOptions: Array<{ id: ReaderFontSize; label: string; px: string }> = [
    { id: 'sm', label: 'S', px: '16px' },
    { id: 'md', label: 'M', px: '18px' },
    { id: 'lg', label: 'L', px: '21px' },
    { id: 'xl', label: 'XL', px: '24px' },
  ];

  const widthOptions: Array<{ id: ReaderWidth; label: string; max: string }> = [
    { id: 'compact', label: 'Compact', max: '560px' },
    { id: 'optimal', label: 'Optimal', max: '680px' },
    { id: 'wide', label: 'Wide', max: '800px' },
  ];

  const spacingOptions: Array<{ id: ReaderLineSpacing; label: string; val: string }> = [
    { id: 'tight', label: 'Compact', val: '1.5' },
    { id: 'normal', label: 'Normal', val: '1.75' },
    { id: 'relaxed', label: 'Relaxed', val: '2.0' },
  ];

  const themeOptions: Array<{ id: ReaderTheme; label: string; bg: string; text: string; border: string }> = [
    { id: 'alabaster', label: 'Paper', bg: '#FBF9F5', text: '#1C1917', border: '#E7E3DC' },
    { id: 'sepia', label: 'Sepia', bg: '#F5EFEB', text: '#29221B', border: '#DED3C7' },
    { id: 'charcoal', label: 'Charcoal', bg: '#18181B', text: '#F3EFE7', border: '#3A3A40' },
    { id: 'black', label: 'OLED', bg: '#0B0B0C', text: '#F2EFE8', border: '#333338' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-xs p-0 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md rounded-t-2xl sm:rounded-2xl bg-[var(--surface)] border-t sm:border border-[var(--border)] shadow-2xl p-5 sm:p-6 space-y-6"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider font-editorial-sans">
                Reading Preferences
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] p-1 rounded hover:bg-[var(--surface-secondary)] cursor-pointer"
                aria-label="Close typography modal"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </motion.button>
            </div>

            {/* 1. Theme Selection */}
            <div>
              <label className="text-xs font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider block mb-2 font-editorial-sans">
                Environment Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {themeOptions.map(theme => {
                  const isSelected = readerPreferences.readerTheme === theme.id;
                  return (
                    <motion.button
                      key={theme.id}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => updateReaderPreferences({ readerTheme: theme.id })}
                      className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-[var(--foreground)] ring-offset-2 ring-offset-[var(--surface)] font-semibold'
                          : 'hover:opacity-90'
                      }`}
                      style={{
                        backgroundColor: theme.bg,
                        color: theme.text,
                        borderColor: theme.border,
                      }}
                    >
                      <span className="text-[11px]">{theme.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 2. Typeface Selection */}
            <div>
              <label className="text-xs font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider block mb-2 font-editorial-sans">
                Typeface
              </label>
              <div className="grid grid-cols-3 gap-2">
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
                          : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--surface-secondary)]'
                      }`}
                    >
                      <span>{font.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.2]" />}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 3. Font Size */}
            <div>
              <label className="text-xs font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider block mb-2 font-editorial-sans">
                Type Size
              </label>
              <div className="grid grid-cols-4 gap-2">
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
                          : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--surface-secondary)]'
                      }`}
                    >
                      {sz.label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* 4. Column Width & Line Spacing */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider block mb-2 font-editorial-sans">
                  Column Width
                </label>
                <div className="flex flex-col gap-1.5">
                  {widthOptions.map(w => {
                    const isSelected = readerPreferences.readingWidth === w.id;
                    return (
                      <motion.button
                        key={w.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateReaderPreferences({ readingWidth: w.id })}
                        className={`py-1.5 px-2.5 rounded-md border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-medium shadow-xs'
                            : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--surface-secondary)]'
                        }`}
                      >
                        <span>{w.label}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[2.2]" />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--foreground-secondary)] uppercase tracking-wider block mb-2 font-editorial-sans">
                  Line Spacing
                </label>
                <div className="flex flex-col gap-1.5">
                  {spacingOptions.map(sp => {
                    const isSelected = readerPreferences.lineSpacing === sp.id;
                    return (
                      <motion.button
                        key={sp.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateReaderPreferences({ lineSpacing: sp.id })}
                        className={`py-1.5 px-2.5 rounded-md border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] font-medium shadow-xs'
                            : 'border-[var(--border)] text-[var(--foreground)] bg-[var(--background)] hover:bg-[var(--surface-secondary)]'
                        }`}
                      >
                        <span>{sp.label}</span>
                        {isSelected && <Check className="w-3 h-3 stroke-[2.2]" />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Done Button */}
            <div className="pt-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition shadow-xs cursor-pointer"
              >
                Apply & Return to Reading
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
