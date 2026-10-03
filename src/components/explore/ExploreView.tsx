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
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[var(--foreground)]">
          Explore
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[var(--foreground-secondary)]">
          Discover stories across all disciplines beyond your personal feed.
        </p>
      </div>

      {/* Search Bar with Semantic Input Tokens */}
      <div className="relative mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-muted)]" strokeWidth={1.75} />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by title, author, or keyword..."
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] text-sm text-[var(--foreground)] placeholder-[var(--input-placeholder)] focus:outline-hidden focus:border-[var(--foreground-secondary)] transition-colors shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] p-1 rounded cursor-pointer"
          >
            <X className="w-3.5 h-3.5" strokeWidth={1.75} />
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Category Bar with Tactile Tap */}
      <div className="mb-8 overflow-x-auto no-scrollbar pb-2">
        <div className="flex items-center gap-1.5 min-w-max border-b border-[var(--border)] pb-3">
          {categories.map(cat => {
            const isSelected = exploreCategory.toLowerCase() === cat.toLowerCase();
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExploreCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--foreground)] text-[var(--background)] shadow-xs font-semibold'
                    : 'text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]'
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
          <p className="text-sm font-medium text-[var(--foreground)]">
            No stories match "{searchQuery}" in {exploreCategory}
          </p>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">
            Try adjusting your search query or selecting "All" categories.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setExploreCategory('All');
            }}
            className="mt-4 px-3 py-1.5 text-xs font-medium text-[var(--foreground)] border border-[var(--border)] rounded-lg hover:bg-[var(--surface)] transition cursor-pointer"
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
