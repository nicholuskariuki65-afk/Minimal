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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ReaderTypographyModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { readerPreferences, updateReaderPreferences } = useApp();

  if (!isOpen) return null;

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
    { id: 'charcoal', label: 'Charcoal', bg: '#18181B', text: '#E5E1D8', border: '#2D2D32' },
    { id: 'black', label: 'OLED', bg: '#0B0B0C', text: '#DEDAD3', border: '#222226' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/35 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-t-2xl sm:rounded-xl bg-[#FBF9F5] dark:bg-[#1C1C1F] border-t sm:border border-stone-200 dark:border-stone-800 shadow-2xl p-5 sm:p-6 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider font-editorial-sans">
            Reading Preferences
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 p-1"
            aria-label="Close typography modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Theme Selection */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
            Environment Theme
          </label>
          <div className="grid grid-cols-4 gap-2">
            {themeOptions.map(theme => {
              const isSelected = readerPreferences.readerTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => updateReaderPreferences({ readerTheme: theme.id })}
                  className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg border text-xs font-medium transition-all ${
                    isSelected
                      ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-1 dark:ring-offset-stone-950 font-semibold'
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    backgroundColor: theme.bg,
                    color: theme.text,
                    borderColor: theme.border,
                  }}
                >
                  <span className="text-[11px]">{theme.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Typeface Selection */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
            Typeface
          </label>
          <div className="grid grid-cols-3 gap-2">
            {fontOptions.map(font => {
              const isSelected = readerPreferences.fontFamily === font.id;
              return (
                <button
                  key={font.id}
                  onClick={() => updateReaderPreferences({ fontFamily: font.id })}
                  className={`py-2 px-3 rounded-lg border text-xs text-left transition-colors flex items-center justify-between ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <span>{font.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Font Size */}
        <div>
          <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
            Type Size
          </label>
          <div className="grid grid-cols-4 gap-2">
            {sizeOptions.map(sz => {
              const isSelected = readerPreferences.fontSize === sz.id;
              return (
                <button
                  key={sz.id}
                  onClick={() => updateReaderPreferences({ fontSize: sz.id })}
                  className={`py-2 rounded-lg border text-xs font-medium transition-colors ${
                    isSelected
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-semibold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                  }`}
                >
                  {sz.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Column Width & Line Spacing */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
              Column Width
            </label>
            <div className="flex flex-col gap-1.5">
              {widthOptions.map(w => {
                const isSelected = readerPreferences.readingWidth === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => updateReaderPreferences({ readingWidth: w.id })}
                    className={`py-1.5 px-2.5 rounded-md border text-xs text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <span>{w.label}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider block mb-2">
              Line Spacing
            </label>
            <div className="flex flex-col gap-1.5">
              {spacingOptions.map(sp => {
                const isSelected = readerPreferences.lineSpacing === sp.id;
                return (
                  <button
                    key={sp.id}
                    onClick={() => updateReaderPreferences({ lineSpacing: sp.id })}
                    className={`py-1.5 px-2.5 rounded-md border text-xs text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'border-stone-900 dark:border-stone-100 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-medium'
                        : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <span>{sp.label}</span>
                    {isSelected && <Check className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition"
          >
            Apply & Return to Reading
          </button>
        </div>
      </div>
    </div>
  );
};
