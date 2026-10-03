import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  ActiveView,
  AppTheme,
  ReaderPreferences,
  ReadingProgressRecord,
  Story,
  Topic,
} from '../types';
import { ALL_TOPICS, MOCK_STORIES } from '../data/mockStories';

interface AppContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeStoryId: string | null;
  activeStory: Story | null;
  openStory: (storyId: string) => void;
  closeStory: () => void;

  // Onboarding & Topics
  hasCompletedOnboarding: boolean;
  selectedTopics: Topic[];
  toggleTopic: (topic: Topic) => void;
  setSelectedTopics: (topics: Topic[]) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Saved Stories
  savedStoryIds: string[];
  toggleSaveStory: (storyId: string) => void;
  isStorySaved: (storyId: string) => boolean;

  // Reading Preferences
  readerPreferences: ReaderPreferences;
  updateReaderPreferences: (prefs: Partial<ReaderPreferences>) => void;

  // App Theme
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;
  isEffectiveDark: boolean;

  // Explore & Search
  exploreCategory: string;
  setExploreCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Reading History & Progress
  readingProgress: Record<string, ReadingProgressRecord>;
  recordProgress: (storyId: string, percent: number, isDone?: boolean) => void;

  // Helper feeds
  forYouStories: Story[];
  savedStories: Story[];
  filteredExploreStories: Story[];
  allStories: Story[];
}

const AppContext = createContext<AppContextType | null>(null);

const DEFAULT_SELECTED_TOPICS: Topic[] = ['Technology', 'Kenya', 'Startups', 'Environment'];

const DEFAULT_READER_PREFS: ReaderPreferences = {
  fontFamily: 'serif',
  fontSize: 'md',
  readingWidth: 'optimal',
  lineSpacing: 'normal',
  readerTheme: 'alabaster',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Onboarding check
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('minimal_onboarded');
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Selected topics
  const [selectedTopics, setSelectedTopicsState] = useState<Topic[]>(() => {
    try {
      const stored = localStorage.getItem('minimal_topics');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_SELECTED_TOPICS;
  });

  // Saved stories
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('minimal_saved');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['story-tech-compact-ai'];
  });

  // Reader Preferences
  const [readerPreferences, setReaderPreferences] = useState<ReaderPreferences>(() => {
    try {
      const stored = localStorage.getItem('minimal_reader_prefs');
      if (stored) return { ...DEFAULT_READER_PREFS, ...JSON.parse(stored) };
    } catch {
      // fallback
    }
    return DEFAULT_READER_PREFS;
  });

  // App Theme
  const [appTheme, setAppThemeState] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem('minimal_app_theme') as AppTheme;
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {
      // fallback
    }
    return 'system';
  });

  // Active View & Navigation
  const [activeView, setActiveViewState] = useState<ActiveView>(() => {
    return hasCompletedOnboarding ? 'for-you' : 'welcome';
  });

  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [exploreCategory, setExploreCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reading progress
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgressRecord>>(() => {
    try {
      const stored = localStorage.getItem('minimal_reading_progress');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {};
  });

  // System Dark Mode Detection
  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const isEffectiveDark = useMemo(() => {
    if (appTheme === 'dark') return true;
    if (appTheme === 'light') return false;
    return systemIsDark;
  }, [appTheme, systemIsDark]);

  // Synchronize dark class on document root
  useEffect(() => {
    const root = document.documentElement;
    if (isEffectiveDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isEffectiveDark]);

  // Synchronize reader theme data attribute on body
  useEffect(() => {
    if (activeView === 'reader') {
      document.body.setAttribute('data-reader-theme', readerPreferences.readerTheme);
    } else {
      document.body.removeAttribute('data-reader-theme');
    }
  }, [activeView, readerPreferences.readerTheme]);

  // Actions
  const openStory = (storyId: string) => {
    setActiveStoryId(storyId);
    setActiveViewState('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeStory = () => {
    setActiveStoryId(null);
    setActiveViewState('for-you');
  };

  const setActiveView = (view: ActiveView) => {
    if (view !== 'reader') {
      setActiveStoryId(null);
    }
    setActiveViewState(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTopic = (topic: Topic) => {
    setSelectedTopicsState(prev => {
      const exists = prev.includes(topic);
      const next = exists ? prev.filter(t => t !== topic) : [...prev, topic];
      localStorage.setItem('minimal_topics', JSON.stringify(next));
      return next;
    });
  };

  const setSelectedTopics = (topics: Topic[]) => {
    setSelectedTopicsState(topics);
    localStorage.setItem('minimal_topics', JSON.stringify(topics));
  };

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    localStorage.setItem('minimal_onboarded', 'true');
    setActiveViewState('for-you');
  };

  const resetOnboarding = () => {
    setHasCompletedOnboarding(false);
    localStorage.removeItem('minimal_onboarded');
    setActiveViewState('welcome');
  };

  const toggleSaveStory = (storyId: string) => {
    setSavedStoryIds(prev => {
      const exists = prev.includes(storyId);
      const next = exists ? prev.filter(id => id !== storyId) : [...prev, storyId];
      localStorage.setItem('minimal_saved', JSON.stringify(next));
      return next;
    });
  };

  const isStorySaved = (storyId: string) => savedStoryIds.includes(storyId);

  const updateReaderPreferences = (prefs: Partial<ReaderPreferences>) => {
    setReaderPreferences(prev => {
      const next = { ...prev, ...prefs };
      localStorage.setItem('minimal_reader_prefs', JSON.stringify(next));
      return next;
    });
  };

  const setAppTheme = (theme: AppTheme) => {
    setAppThemeState(theme);
    localStorage.setItem('minimal_app_theme', theme);
  };

  const recordProgress = (storyId: string, percent: number, isDone?: boolean) => {
    setReadingProgress(prev => {
      const existing = prev[storyId];
      const maxPercent = Math.max(percent, existing?.progressPercent || 0);
      const next = {
        ...prev,
        [storyId]: {
          storyId,
          progressPercent: maxPercent,
          lastReadAt: new Date().toISOString(),
          completed: isDone || maxPercent >= 92,
        },
      };
      localStorage.setItem('minimal_reading_progress', JSON.stringify(next));
      return next;
    });
  };

  // Active Story
  const activeStory = useMemo(() => {
    if (!activeStoryId) return null;
    return MOCK_STORIES.find(s => s.id === activeStoryId) || null;
  }, [activeStoryId]);

  // Feed Computation
  const forYouStories = useMemo(() => {
    // Return stories matching selected topics, sorted with lead story first
    const matched = MOCK_STORIES.filter(s => selectedTopics.includes(s.topic));
    if (matched.length === 0) return MOCK_STORIES; // fallback to show content if no topics matched
    return matched;
  }, [selectedTopics]);

  const savedStories = useMemo(() => {
    return MOCK_STORIES.filter(s => savedStoryIds.includes(s.id));
  }, [savedStoryIds]);

  const filteredExploreStories = useMemo(() => {
    return MOCK_STORIES.filter(story => {
      const matchesCategory =
        exploreCategory === 'All' || story.topic.toLowerCase() === exploreCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [exploreCategory, searchQuery]);

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        activeStoryId,
        activeStory,
        openStory,
        closeStory,
        hasCompletedOnboarding,
        selectedTopics,
        toggleTopic,
        setSelectedTopics,
        completeOnboarding,
        resetOnboarding,
        savedStoryIds,
        toggleSaveStory,
        isStorySaved,
        readerPreferences,
        updateReaderPreferences,
        appTheme,
        setAppTheme,
        isEffectiveDark,
        exploreCategory,
        setExploreCategory,
        searchQuery,
        setSearchQuery,
        readingProgress,
        recordProgress,
        forYouStories,
        savedStories,
        filteredExploreStories,
        allStories: MOCK_STORIES,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
