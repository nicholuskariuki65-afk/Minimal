import React from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../stories/StoryCard';
import { Bookmark, Compass } from 'lucide-react';

export const SavedView: React.FC = () => {
  const { savedStories, setActiveView } = useApp();

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-8 pb-3 border-b border-stone-200 dark:border-stone-800 flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-900 dark:text-stone-100">
            Saved
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Your personal archive of stories kept for quiet, deliberate reading.
          </p>
        </div>

        {savedStories.length > 0 && (
          <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">
            {savedStories.length} {savedStories.length === 1 ? 'story' : 'stories'}
          </span>
        )}
      </div>

      {/* Empty State */}
      {savedStories.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto">
          <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 flex items-center justify-center mx-auto mb-4">
            <Bookmark className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-serif font-medium text-stone-800 dark:text-stone-200">
            Stories you save will appear here.
          </h3>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
            Tap the bookmark icon on any story in your feed or while reading to save it for later.
          </p>
          <button
            onClick={() => setActiveView('for-you')}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Discover stories</span>
          </button>
        </div>
      ) : (
        <div className="divide-y divide-transparent">
          {savedStories.map(story => (
            <StoryCard key={story.id} story={story} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
};
