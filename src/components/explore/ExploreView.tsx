import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_TOPICS } from '../../data/mockStories';
import { StoryCard } from '../stories/StoryCard';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';

export const ExploreView: React.FC = () => {
  const {
    filteredExploreStories,
    exploreCategory,
    setExploreCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const categories = ['All', ...ALL_TOPICS];

  return (
    <div className="w-full">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-900 dark:text-[#F6F4EE]">
          Explore
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-300">
          Discover stories across all disciplines beyond your personal feed.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-300" strokeWidth={1.75} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, or keyword..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700/80 bg-stone-50/50 dark:bg-[#1E1E22] text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-400 focus:outline-hidden focus:border-stone-400 dark:focus:border-stone-500 transition-colors shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:text-stone-300 dark:hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Category Bar with Tactile Tap */}
      <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-1.5 min-w-max border-b border-stone-200/80 dark:border-stone-800 pb-3">
          {categories.map(cat => {
            const isSelected = exploreCategory.toLowerCase() === cat.toLowerCase();
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExploreCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800/60'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Stories Output */}
      {filteredExploreStories.length === 0 ? (
        <div className="py-20 text-center max-w-sm mx-auto">
          <p className="text-sm font-medium text-stone-800 dark:text-stone-200">
            No stories match "{searchQuery}" in {exploreCategory}
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Try adjusting your search query or selecting "All" categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setExploreCategory('All');
            }}
            className="mt-4 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="divide-y divide-transparent">
          {filteredExploreStories.map(story => (
            <StoryCard key={story.id} story={story} variant="standard" />
          ))}
        </div>
      )}
    </div>
  );
};
