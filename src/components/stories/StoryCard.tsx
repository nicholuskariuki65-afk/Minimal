import React from 'react';
import { Story } from '../../types';
import { useApp } from '../../context/AppContext';
import { Bookmark, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  story: Story;
  variant?: 'lead' | 'standard' | 'compact';
}

export const StoryCard: React.FC<Props> = ({ story, variant = 'standard' }) => {
  const { openStory, isStorySaved, toggleSaveStory, readingProgress } = useApp();
  const saved = isStorySaved(story.id);
  const progress = readingProgress[story.id];
  const isCompleted = progress?.completed;

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveStory(story.id);
  };

  // Lead Story Variant (Hero prominence on feed)
  if (variant === 'lead') {
    return (
      <article
        onClick={() => openStory(story.id)}
        className="group cursor-pointer pb-8 border-b border-[var(--border-subtle)] transition-colors"
      >
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 items-start">
          <div className={`${story.heroImage ? 'md:col-span-7' : 'md:col-span-12'} flex flex-col justify-between`}>
            <div>
              {/* Unboxed Metadata Header (Zero-Pill discipline) */}
              <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] mb-2.5">
                <span className="font-semibold text-[var(--foreground)] tracking-wider uppercase text-[11px]">
                  {story.topic}
                </span>
                <span aria-hidden="true" className="opacity-60">·</span>
                <span>{story.source}</span>
                <span aria-hidden="true" className="opacity-60">·</span>
                <span>{story.readTimeMinutes} min read</span>
                {isCompleted && (
                  <>
                    <span aria-hidden="true" className="opacity-60">·</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Read
                    </span>
                  </>
                )}
              </div>

              {/* Dominant Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-[var(--foreground)] group-hover:opacity-85 transition-opacity balance-text leading-snug">
                {story.title}
              </h2>

              {/* Subtitle / Deck */}
              <p className="mt-3 text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed font-editorial-sans line-clamp-3">
                {story.subtitle}
              </p>
            </div>

            {/* Bottom Meta & Save Button */}
            <div className="mt-5 flex items-center justify-between pt-3 text-xs text-[var(--foreground-muted)] border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span>By {story.author}</span>
                <span aria-hidden="true" className="opacity-60">·</span>
                <span>{story.publishedAt}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.86 }}
                onClick={handleSaveClick}
                aria-label={saved ? 'Remove from saved' : 'Save story'}
                title={saved ? 'Saved' : 'Save for later'}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center -mr-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
              >
                <Bookmark
                  className={`w-4 h-4 transition-all duration-200 ${saved ? 'fill-[var(--foreground)] text-[var(--foreground)] scale-105' : ''}`}
                  strokeWidth={1.75}
                />
              </motion.button>
            </div>
          </div>

          {/* Lead Image if present */}
          {story.heroImage && (
            <div className="mt-4 md:mt-0 md:col-span-5 w-full aspect-16/10 sm:aspect-16/9 md:aspect-4/3 overflow-hidden rounded-lg bg-[var(--surface-secondary)] border border-[var(--border-subtle)] shadow-xs">
              <img
                src={story.heroImage}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          )}
        </div>
      </article>
    );
  }

  // Compact Variant (e.g. for Related Stories or dense lists)
  if (variant === 'compact') {
    return (
      <article
        onClick={() => openStory(story.id)}
        className="group cursor-pointer py-4 border-b border-[var(--border-subtle)] flex items-start justify-between gap-4 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)] mb-1">
            <span className="font-semibold text-[var(--foreground)]">{story.topic}</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{story.readTimeMinutes} min</span>
            {isCompleted && (
              <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">· Read</span>
            )}
          </div>
          <h4 className="text-base font-serif font-medium text-[var(--foreground)] group-hover:opacity-85 transition-opacity leading-snug line-clamp-2">
            {story.title}
          </h4>
        </div>

        <motion.button
          whileTap={{ scale: 0.86 }}
          onClick={handleSaveClick}
          aria-label={saved ? 'Remove from saved' : 'Save story'}
          className="min-h-[40px] min-w-[40px] flex items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors shrink-0 cursor-pointer"
        >
          <Bookmark
            className={`w-4 h-4 transition-all duration-200 ${saved ? 'fill-[var(--foreground)] text-[var(--foreground)] scale-105' : ''}`}
            strokeWidth={1.75}
          />
        </motion.button>
      </article>
    );
  }

  // Standard Editorial Row Variant
  return (
    <article
      onClick={() => openStory(story.id)}
      className="group cursor-pointer py-6 border-b border-[var(--border-subtle)] transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] mb-2">
            <span className="font-semibold text-[var(--foreground)] tracking-wider uppercase text-[11px]">
              {story.topic}
            </span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{story.source}</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{story.readTimeMinutes} min read</span>
            {isCompleted && (
              <>
                <span aria-hidden="true" className="opacity-60">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} /> Read
                </span>
              </>
            )}
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--foreground)] group-hover:opacity-85 transition-opacity leading-snug balance-text">
            {story.title}
          </h3>

          {/* Subtitle / summary */}
          <p className="mt-2 text-sm text-[var(--foreground-secondary)] line-clamp-2 leading-relaxed font-editorial-sans">
            {story.subtitle}
          </p>

          {/* Author & Published Time */}
          <div className="mt-3 flex items-center justify-between text-xs text-[var(--foreground-muted)]">
            <div className="flex items-center gap-1.5">
              <span>{story.author}</span>
              <span aria-hidden="true" className="opacity-60">·</span>
              <span>{story.publishedAt}</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.86 }}
              onClick={handleSaveClick}
              aria-label={saved ? 'Remove from saved' : 'Save story'}
              title={saved ? 'Saved' : 'Save for later'}
              className="sm:hidden min-h-[38px] min-w-[38px] flex items-center justify-center -mr-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 transition-all duration-200 ${saved ? 'fill-[var(--foreground)] text-[var(--foreground)] scale-105' : ''}`}
                strokeWidth={1.75}
              />
            </motion.button>
          </div>
        </div>

        {/* Thumbnail or desktop bookmark */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-3 shrink-0">
          {story.heroImage && (
            <div className="w-24 h-20 sm:w-28 sm:h-20 rounded-lg overflow-hidden bg-[var(--surface-secondary)] border border-[var(--border-subtle)] shrink-0 shadow-xs">
              <img
                src={story.heroImage}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.86 }}
            onClick={handleSaveClick}
            aria-label={saved ? 'Remove from saved' : 'Save story'}
            title={saved ? 'Saved' : 'Save for later'}
            className="hidden sm:flex min-h-[38px] min-w-[38px] items-center justify-center text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors -mr-2 cursor-pointer"
          >
            <Bookmark
              className={`w-4 h-4 transition-all duration-200 ${saved ? 'fill-[var(--foreground)] text-[var(--foreground)] scale-105' : ''}`}
              strokeWidth={1.75}
            />
          </motion.button>
        </div>
      </div>
    </article>
  );
};
