import React, { useRef, useState } from 'react';
import { Story } from '../../types';
import { useApp } from '../../context/AppContext';
import { useReadingProgress } from '../../hooks/useReadingProgress';
import { ReaderTypographyModal } from './ReaderTypographyModal';
import { StoryCard } from '../stories/StoryCard';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  story: Story;
}

export const ArticleReader: React.FC<Props> = ({ story }) => {
  const {
    closeStory,
    isStorySaved,
    toggleSaveStory,
    readerPreferences,
    recordProgress,
    allStories,
  } = useApp();

  const articleContainerRef = useRef<HTMLDivElement>(null);
  const { progress, isCompleted } = useReadingProgress(articleContainerRef);
  const [showTypeModal, setShowTypeModal] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const saved = isStorySaved(story.id);

  // Update progress in app state
  React.useEffect(() => {
    recordProgress(story.id, progress, isCompleted);
  }, [story.id, progress, isCompleted]);

  // Copy share link
  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Typography class calculations
  const fontClass =
    readerPreferences.fontFamily === 'serif'
      ? 'font-editorial-serif'
      : readerPreferences.fontFamily === 'mono'
      ? 'font-editorial-mono'
      : 'font-editorial-sans';

  const sizeClasses: Record<string, { body: string; h2: string; quote: string }> = {
    sm: { body: 'text-base', h2: 'text-xl', quote: 'text-lg' },
    md: { body: 'text-lg', h2: 'text-2xl', quote: 'text-xl' },
    lg: { body: 'text-xl', h2: 'text-3xl', quote: 'text-2xl' },
    xl: { body: 'text-2xl', h2: 'text-3xl sm:text-4xl', quote: 'text-2xl sm:text-3xl' },
  };

  const widthClasses: Record<string, string> = {
    compact: 'max-w-[560px]',
    optimal: 'max-w-[680px]',
    wide: 'max-w-[800px]',
  };

  const leadingClasses: Record<string, string> = {
    tight: 'leading-[1.55]',
    normal: 'leading-[1.8]',
    relaxed: 'leading-[2.05]',
  };

  const activeSize = sizeClasses[readerPreferences.fontSize];
  const activeWidth = widthClasses[readerPreferences.readingWidth];
  const activeLeading = leadingClasses[readerPreferences.lineSpacing];

  // Related stories
  const relatedStories = (story.relatedStoryIds || [])
    .map(id => allStories.find(s => s.id === id))
    .filter((s): s is Story => Boolean(s));

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200"
    >
      {/* 1. Subtle Reading Progress Bar (Fixed at top) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-[var(--border-subtle)]">
        <div
          className="h-full bg-[var(--foreground)] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Quiet Top Reader Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--border-subtle)] bg-[var(--background)]/95 backdrop-blur-md transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Back button + Topic kicker */}
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={closeStory}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--foreground-secondary)] hover:text-[var(--foreground)] p-1.5 -ml-1.5 rounded transition-colors cursor-pointer"
              aria-label="Back to feed"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
              <span className="hidden sm:inline">Feed</span>
            </motion.button>

            <span className="text-[var(--border)]">/</span>

            <span className="text-xs uppercase tracking-wider font-semibold text-[var(--foreground-secondary)]">
              {story.topic}
            </span>
          </div>

          {/* Reader Actions with modern line icons & tap animation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Reading progress badge */}
            <span className="text-[11px] font-mono text-[var(--foreground-muted)] mr-1.5 tabular-nums">
              {progress}%
            </span>

            {/* Typography Controls "Aa" */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowTypeModal(true)}
              aria-label="Typography and reader settings"
              title="Typography Settings"
              className="px-2.5 py-1 text-xs font-semibold rounded border border-[var(--border-subtle)] hover:bg-[var(--surface)] transition-colors text-[var(--foreground)] cursor-pointer"
            >
              Aa
            </motion.button>

            {/* Bookmark / Save */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSaveStory(story.id)}
              aria-label={saved ? 'Remove from saved' : 'Save story'}
              title={saved ? 'Story saved' : 'Save story'}
              className="p-1.5 rounded border border-[var(--border-subtle)] hover:bg-[var(--surface)] transition-colors text-[var(--foreground)] cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 transition-all duration-150 ${saved ? 'fill-current scale-105' : ''}`}
                strokeWidth={1.75}
              />
            </motion.button>

            {/* Share / Copy Link */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              aria-label="Copy story link"
              title="Copy link"
              className="p-1.5 rounded border border-[var(--border-subtle)] hover:bg-[var(--surface)] transition-colors text-[var(--foreground)] cursor-pointer"
            >
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-500" strokeWidth={2} />
              ) : (
                <Share2 className="w-4 h-4" strokeWidth={1.75} />
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* 3. Main Reading Container */}
      <main ref={articleContainerRef} className={`mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-28 ${activeWidth}`}>
        {/* Article Metadata & Header */}
        <header className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] mb-4">
            <span className="font-semibold uppercase tracking-wider text-[var(--foreground)]">
              {story.source}
            </span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{story.readTimeMinutes} min read</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>{story.publishedAt}</span>
          </div>

          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[var(--foreground)] balance-text leading-[1.18] ${fontClass}`}>
            {story.title}
          </h1>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[var(--foreground-secondary)] leading-relaxed font-editorial-sans">
            {story.subtitle}
          </p>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--foreground-muted)]">
            <div>
              <span className="font-medium text-[var(--foreground)]">Written by {story.author}</span>
              {story.authorRole && <span> — {story.authorRole}</span>}
            </div>
          </div>
        </header>

        {/* Lead Hero Image if available */}
        {story.heroImage && (
          <figure className="my-8 sm:my-12">
            <div className="overflow-hidden rounded-xl bg-[var(--surface-secondary)] border border-[var(--border-subtle)] shadow-xs">
              <img
                src={story.heroImage}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
            {story.imageCaption && (
              <figcaption className="mt-2.5 text-xs text-[var(--foreground-muted)] italic font-editorial-serif">
                {story.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Body Content */}
        <article className={`space-y-6 sm:space-y-8 ${fontClass} ${activeSize} ${activeLeading}`}>
          {story.content.map((sec, idx) => {
            if (sec.type === 'subheading') {
              return (
                <h2
                  key={idx}
                  className={`pt-6 pb-2 font-medium tracking-tight text-[var(--foreground)] ${activeSize.h2} font-serif`}
                >
                  {sec.text}
                </h2>
              );
            }

            if (sec.type === 'quote') {
              return (
                <blockquote
                  key={idx}
                  className="my-8 pl-5 sm:pl-6 border-l-2 border-[var(--foreground)] italic text-[var(--foreground)]"
                >
                  <p className={`${activeSize.quote} leading-relaxed`}>{sec.text}</p>
                </blockquote>
              );
            }

            // Paragraph (First paragraph gets elegant drop-cap)
            const isFirst = idx === 0;
            return (
              <p
                key={idx}
                className={`text-[var(--foreground)] ${isFirst ? 'drop-cap' : ''}`}
              >
                {sec.text}
              </p>
            );
          })}
        </article>

        {/* 4. Article Completion State */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-[var(--border-subtle)] text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] mb-3 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" strokeWidth={1.75} />
          </div>
          <h3 className="text-lg font-serif font-medium text-[var(--foreground)]">
            You have completed this story
          </h3>
          <p className="mt-1 text-xs text-[var(--foreground-secondary)]">
            Thank you for reading deeply with Minimal.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleSaveStory(story.id)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-md border border-[var(--border-subtle)] hover:bg-[var(--surface)] transition-colors text-[var(--foreground)] cursor-pointer"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`}
                strokeWidth={1.75}
              />
              <span>{saved ? 'Saved in library' : 'Save for later'}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={closeStory}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-opacity cursor-pointer"
            >
              Return to Feed
            </motion.button>
          </div>
        </div>

        {/* 5. Restrained Related Stories */}
        {relatedStories.length > 0 && (
          <section className="mt-16 pt-10 border-t border-[var(--border-subtle)]">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)] mb-4 font-editorial-sans">
              Related Readings
            </h4>
            <div className="divide-y divide-[var(--border-subtle)]">
              {relatedStories.map(rel => (
                <StoryCard key={rel.id} story={rel} variant="compact" />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Typography Configuration Modal */}
      <ReaderTypographyModal
        isOpen={showTypeModal}
        onClose={() => setShowTypeModal(false)}
      />
    </motion.div>
  );
};
