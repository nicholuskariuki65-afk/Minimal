import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_TOPICS } from '../../data/mockStories';
import { Topic } from '../../types';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const TopicSelectionView: React.FC = () => {
  const {
    selectedTopics,
    toggleTopic,
    completeOnboarding,
    hasCompletedOnboarding,
    setActiveView,
    availableTopics,
  } = useApp();

  const topicsList = availableTopics && availableTopics.length > 0 ? availableTopics : ALL_TOPICS;

  const handleContinue = () => {
    if (!hasCompletedOnboarding) {
      completeOnboarding();
    } else {
      setActiveView('for-you');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-[var(--foreground-muted)] font-semibold block mb-2 font-editorial-sans">
          Curate Your Library
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-[var(--foreground)] balance-text">
          What are you interested in?
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed font-editorial-sans">
          Choose the topics you want to see in your reading feed. You can change these anytime.
        </p>
      </div>

      {/* Topics Grid with Tactile Motion Feedback */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 my-8">
        {topicsList.map(topic => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <motion.button
              key={topic}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleTopic(topic as Topic)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-colors duration-200 flex items-center justify-between min-h-[52px] cursor-pointer ${
                isSelected
                  ? 'border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)] shadow-xs font-semibold'
                  : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--foreground-secondary)]'
              }`}
            >
              <span className="text-sm font-medium">{topic}</span>
              {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[2.2]" />}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Action */}
      <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-[var(--foreground-muted)]">
          {selectedTopics.length} {selectedTopics.length === 1 ? 'topic' : 'topics'} selected
        </span>

        <motion.button
          whileTap={{ scale: selectedTopics.length > 0 ? 0.97 : 1 }}
          onClick={handleContinue}
          disabled={selectedTopics.length === 0}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
            selectedTopics.length > 0
              ? 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 shadow-sm'
              : 'bg-[var(--surface-secondary)] text-[var(--foreground-muted)] cursor-not-allowed'
          }`}
        >
          <span>{hasCompletedOnboarding ? 'Save & Return to Feed' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </motion.button>
      </div>
    </div>
  );
};
