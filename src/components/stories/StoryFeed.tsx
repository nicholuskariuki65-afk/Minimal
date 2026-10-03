import React from 'react';
import { Story } from '../../types';
import { StoryCard } from './StoryCard';
import { SlidersHorizontal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Props {
  stories: Story[];
  title: string;
  subtitle?: string;
  showTopicControls?: boolean;
}

export const StoryFeed: React.FC<Props> = ({
  stories,
  title,
  subtitle,
  showTopicControls = false,
}) => {
  const { setActiveView, selectedTopics } = useApp();

  if (stories.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <p className="text-base text-[var(--foreground-secondary)]">
          No stories found for the current selection.
        </p>
        {showTopicControls && (
          <button
            onClick={() => setActiveView('topics')}
            className="mt-4 px-4 py-2 text-xs font-medium text-[var(--foreground)] border border-[var(--border)] rounded-md hover:bg-[var(--surface)] transition cursor-pointer"
          >
            Adjust Your Topics
          </button>
        )}
      </div>
    );
  }

  // The first story with leadStory flag or the first story becomes the lead
  const leadStory = stories.find(s => s.leadStory) || stories[0];
  const remainingStories = stories.filter(s => s.id !== leadStory.id);

  return (
    <div className="w-full">
      {/* Feed Header */}
      <div className="flex items-baseline justify-between mb-8 pb-3 border-b border-[var(--border)]">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[var(--foreground)]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-[var(--foreground-secondary)]">
              {subtitle}
            </p>
          )}
        </div>

        {showTopicControls && (
          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-[var(--foreground-muted)]">
              {selectedTopics.length} topics followed
            </span>
            <button
              onClick={() => setActiveView('topics')}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors py-1 px-2.5 rounded hover:bg-[var(--surface)] cursor-pointer"
              title="Edit followed topics"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Customize</span>
            </button>
          </div>
        )}
      </div>

      {/* Salience Tier 1: Lead Story */}
      {leadStory && (
        <div className="mb-6">
          <StoryCard story={leadStory} variant="lead" />
        </div>
      )}

      {/* Salience Tier 2: Remaining Editorial Stories */}
      <div className="divide-y divide-transparent">
        {remainingStories.map(story => (
          <StoryCard key={story.id} story={story} variant="standard" />
        ))}
      </div>

      {/* Calm Footer / End of Feed */}
      <div className="pt-16 pb-8 text-center">
        <div className="inline-block w-8 h-[1px] bg-[var(--border)] mb-4" />
        <p className="text-xs text-[var(--foreground-muted)]">
          You are all caught up on your topics.
        </p>
      </div>
    </div>
  );
};
