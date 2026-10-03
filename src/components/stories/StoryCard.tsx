import React from 'react';
import { Story } from '../../types';
import { useApp } from '../../context/AppContext';
import { Bookmark, CheckCircle2 } from 'lucide-react';

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
        className="group cursor-pointer pb-8 border-b border-stone-200 dark:border-stone-800/80 transition-colors"
      >
        <div className="flex flex-col md:grid md:grid-cols-12 md:gap-8 items-start">
          <div className={`${story.heroImage ? 'md:col-span-7' : 'md:col-span-12'} flex flex-col justify-between`}>
            <div>
              {/* Unboxed Metadata Header (Zero-Pill discipline) */}
              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2.5">
                <span className="font-semibold text-stone-800 dark:text-stone-200 tracking-wide uppercase text-[11px]">
                  {story.topic}
                </span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
                <span>{story.source}</span>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
                <span>{story.readTimeMinutes} min read</span>
                {isCompleted && (
                  <>
                    <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Read
                    </span>
                  </>
                )}
              </div>

              {/* Dominant Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-white transition-colors balance-text leading-snug">
                {story.title}
              </h2>

              {/* Subtitle / Deck */}
              <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-400 leading-relaxed font-editorial-sans line-clamp-3">
                {story.subtitle}
              </p>
            </div>

            {/* Bottom Meta & Save Button */}
            <div className="mt-5 flex items-center justify-between pt-3 text-xs text-stone-400 dark:text-stone-500 border-t border-stone-100 dark:border-stone-800/40">
              <div className="flex items-center gap-2">
                <span>By {story.author}</span>
                <span aria-hidden="true">·</span>
                <span>{story.publishedAt}</span>
              </div>

              <button
                onClick={handleSaveClick}
                aria-label={saved ? 'Remove from saved' : 'Save story'}
                title={saved ? 'Saved' : 'Save for later'}
                className="min-h-[36px] min-w-[36px] flex items-center justify-center -mr-2 text-stone-400 hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-200 transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-stone-900 text-stone-900 dark:fill-stone-100 dark:text-stone-100' : ''}`} />
              </button>
            </div>
          </div>

          {/* Lead Image if present */}
          {story.heroImage && (
            <div className="mt-4 md:mt-0 md:col-span-5 w-full aspect-16/10 sm:aspect-16/9 md:aspect-4/3 overflow-hidden rounded-md bg-stone-100 dark:bg-stone-900">
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
        className="group cursor-pointer py-4 border-b border-stone-200/80 dark:border-stone-800/60 flex items-start justify-between gap-4 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span className="font-medium text-stone-700 dark:text-stone-300">{story.topic}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
            <span>{story.readTimeMinutes} min</span>
            {isCompleted && (
              <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">· Read</span>
            )}
          </div>
          <h4 className="text-base font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-white transition-colors leading-snug line-clamp-2">
            {story.title}
          </h4>
        </div>

        <button
          onClick={handleSaveClick}
          aria-label={saved ? 'Remove from saved' : 'Save story'}
          className="min-h-[40px] min-w-[40px] flex items-center justify-center text-stone-400 hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-200 transition-colors shrink-0"
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-stone-900 text-stone-900 dark:fill-stone-100 dark:text-stone-100' : ''}`} />
        </button>
      </article>
    );
  }

  // Standard Editorial Row Variant
  return (
    <article
      onClick={() => openStory(story.id)}
      className="group cursor-pointer py-6 border-b border-stone-200/80 dark:border-stone-800/80 transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
            <span className="font-semibold text-stone-800 dark:text-stone-200 tracking-wide uppercase text-[11px]">
              {story.topic}
            </span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
            <span>{story.source}</span>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
            <span>{story.readTimeMinutes} min read</span>
            {isCompleted && (
              <>
                <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">·</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Read
                </span>
              </>
            )}
          </div>

          {/* Headline */}
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-white transition-colors leading-snug balance-text">
            {story.title}
          </h3>

          {/* Subtitle / summary */}
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {story.subtitle}
          </p>

          {/* Author & Published Time */}
          <div className="mt-3 flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
            <div className="flex items-center gap-1.5">
              <span>{story.author}</span>
              <span aria-hidden="true">·</span>
              <span>{story.publishedAt}</span>
            </div>

            <button
              onClick={handleSaveClick}
              aria-label={saved ? 'Remove from saved' : 'Save story'}
              title={saved ? 'Saved' : 'Save for later'}
              className="sm:hidden min-h-[36px] min-w-[36px] flex items-center justify-center -mr-2 text-stone-400 hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-200 transition-colors"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-stone-900 text-stone-900 dark:fill-stone-100 dark:text-stone-100' : ''}`} />
            </button>
          </div>
        </div>

        {/* Thumbnail or desktop bookmark */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-3 shrink-0">
          {story.heroImage && (
            <div className="w-24 h-20 sm:w-28 sm:h-20 rounded overflow-hidden bg-stone-100 dark:bg-stone-900 shrink-0">
              <img
                src={story.heroImage}
                alt={story.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <button
            onClick={handleSaveClick}
            aria-label={saved ? 'Remove from saved' : 'Save story'}
            title={saved ? 'Saved' : 'Save for later'}
            className="hidden sm:flex min-h-[36px] min-w-[36px] items-center justify-center text-stone-400 hover:text-stone-800 dark:text-stone-500 dark:hover:text-stone-200 transition-colors -mr-2"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-stone-900 text-stone-900 dark:fill-stone-100 dark:text-stone-100' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
};
