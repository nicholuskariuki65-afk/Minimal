import React from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../stories/StoryCard';
import { Bookmark, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export const SavedView: React.FC = () => {
  const { savedStories, setActiveView } = useApp();

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-8 pb-3 border-b border-stone-200 dark:border-stone-800 flex items-baseline justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-900 dark:text-[#F6F4EE]">
            Saved
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-300">
            Your personal archive of stories kept for quiet, deliberate reading.
          </p>
        </div>

        {savedStories.length > 0 && (
          <span className="text-xs text-stone-400 dark:text-stone-300 font-mono">
            {savedStories.length} {savedStories.length === 1 ? 'story' : 'stories'}
          </span>
        )}
      </div>

      {/* Empty State */}
      {savedStories.length === 0 ? (
        <div className="py-24 text-center max-w-sm mx-auto">
          <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/80 text-stone-500 dark:text-stone-300 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Bookmark className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <h3 className="text-base font-serif font-medium text-stone-900 dark:text-[#F6F4EE]">
            Stories you save will appear here.
          </h3>
          <p className="mt-1 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            Tap the bookmark icon on any story in your feed or while reading to save it for later.
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setActiveView('for-you')}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition shadow-xs cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Discover stories</span>
          </motion.button>
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
