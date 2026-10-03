/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/navigation/TopBar';
import { BottomNav } from './components/navigation/BottomNav';
import { WelcomeView } from './components/onboarding/WelcomeView';
import { TopicSelectionView } from './components/onboarding/TopicSelectionView';
import { StoryFeed } from './components/stories/StoryFeed';
import { ArticleReader } from './components/reader/ArticleReader';
import { ExploreView } from './components/explore/ExploreView';
import { SavedView } from './components/saved/SavedView';
import { SettingsView } from './components/settings/SettingsView';
import { OfflineIndicator } from './components/common/OfflineIndicator';
import { motion, AnimatePresence } from 'motion/react';

const MainLayout: React.FC = () => {
  const { activeView, activeStory, forYouStories } = useApp();

  // 1. Article Reader (Full immersion mode)
  if (activeView === 'reader' && activeStory) {
    return (
      <AnimatePresence mode="wait">
        <ArticleReader key={activeStory.id} story={activeStory} />
        <OfflineIndicator />
      </AnimatePresence>
    );
  }

  // 2. Onboarding Flow
  if (activeView === 'welcome') {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <WelcomeView />
        <OfflineIndicator />
      </main>
    );
  }

  if (activeView === 'topics') {
    return (
      <main className="min-h-screen">
        <TopBar />
        <TopicSelectionView />
        <OfflineIndicator />
      </main>
    );
  }

  // 3. Primary App Shell
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-200">
      <TopBar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-36 sm:pb-36">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeView === 'for-you' && (
              <StoryFeed
                stories={forYouStories}
                title="For You"
                subtitle="Curated stories tailored to the topics you follow."
                showTopicControls={true}
              />
            )}

            {activeView === 'explore' && <ExploreView />}

            {activeView === 'saved' && <SavedView />}

            {activeView === 'settings' && <SettingsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Floating Frosted-Glass Bottom Navigation Dock */}
      <BottomNav />

      {/* Offline Toast */}
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
