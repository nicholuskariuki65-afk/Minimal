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
  } = useApp();

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
        <span className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-300 font-semibold block mb-2 font-editorial-sans">
          Curate Your Library
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-stone-900 dark:text-[#F6F4EE] balance-text">
          What are you interested in?
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-editorial-sans">
          Choose the topics you want to see in your reading feed. You can change these anytime.
        </p>
      </div>

      {/* Topics Grid with Tactile Motion Feedback */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 my-8">
        {ALL_TOPICS.map(topic => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <motion.button
              key={topic}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleTopic(topic as Topic)}
              className={`p-3.5 sm:p-4 rounded-xl border text-left transition-colors duration-200 flex items-center justify-between min-h-[52px] cursor-pointer ${
                isSelected
                  ? 'border-stone-900 dark:border-stone-100 bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 shadow-xs font-semibold'
                  : 'border-stone-200 dark:border-stone-700/80 bg-stone-50/60 dark:bg-[#1E1E22] text-stone-800 dark:text-stone-200 hover:border-stone-400 dark:hover:border-stone-500'
              }`}
            >
              <span className="text-sm font-medium">{topic}</span>
              {isSelected && <Check className="w-4 h-4 shrink-0 stroke-[2.2]" />}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Action */}
      <div className="mt-10 pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-stone-500 dark:text-stone-300">
          {selectedTopics.length} {selectedTopics.length === 1 ? 'topic' : 'topics'} selected
        </span>

        <motion.button
          whileTap={{ scale: selectedTopics.length > 0 ? 0.97 : 1 }}
          onClick={handleContinue}
          disabled={selectedTopics.length === 0}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
            selectedTopics.length > 0
              ? 'bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 hover:opacity-90 shadow-sm'
              : 'bg-stone-200 text-stone-400 dark:bg-stone-800 dark:text-stone-500 cursor-not-allowed'
          }`}
        >
          <span>{hasCompletedOnboarding ? 'Save & Return to Feed' : 'Continue'}</span>
          <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
        </motion.button>
      </div>
    </div>
  );
};
