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
import { contentService } from '../services/contentService';
import { isSupabaseConfigured, verifySupabaseConnection, SupabaseVerificationResult } from '../lib/supabase';

interface AppContextType {
  // Navigation & View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeStoryId: string | null;
  activeStory: Story | null;
  openStory: (storyId: string) => void;
  closeStory: () => void;

  // Onboarding & Topics (User's followed topics remain strictly local on device)
  hasCompletedOnboarding: boolean;
  selectedTopics: Topic[];
  toggleTopic: (topic: Topic) => void;
  setSelectedTopics: (topics: Topic[]) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  availableTopics: Topic[];

  // Saved Stories (Kept strictly local on device)
  savedStoryIds: string[];
  toggleSaveStory: (storyId: string) => void;
  isStorySaved: (storyId: string) => boolean;

  // Reading Preferences (Kept strictly local on device)
  readerPreferences: ReaderPreferences;
  updateReaderPreferences: (prefs: Partial<ReaderPreferences>) => void;

  // App Theme (Kept strictly local on device)
  appTheme: AppTheme;
  setAppTheme: (theme: AppTheme) => void;
  isEffectiveDark: boolean;

  // Explore & Search
  exploreCategory: string;
  setExploreCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Reading History & Progress (Kept strictly local on device)
  readingProgress: Record<string, ReadingProgressRecord>;
  recordProgress: (storyId: string, percent: number, isDone?: boolean) => void;

  // Stories & Feeds
  forYouStories: Story[];
  savedStories: Story[];
  filteredExploreStories: Story[];
  allStories: Story[];

  // Supabase Status
  supabaseStatus: {
    isConfigured: boolean;
    isConnected: boolean;
    message: string;
  };
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
  // 1. Onboarding check (Stored locally on device)
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem('minimal_onboarded');
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // 2. Selected/followed topics (Stored strictly locally on device)
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

  // 3. Saved stories (Stored strictly locally on device)
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('minimal_saved');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['story-tech-compact-ai'];
  });

  // 4. Reader Preferences (Stored strictly locally on device)
  const [readerPreferences, setReaderPreferences] = useState<ReaderPreferences>(() => {
    try {
      const stored = localStorage.getItem('minimal_reader_prefs');
      if (stored) return { ...DEFAULT_READER_PREFS, ...JSON.parse(stored) };
    } catch {
      // fallback
    }
    return DEFAULT_READER_PREFS;
  });

  // 5. App Theme (Stored strictly locally on device)
  const [appTheme, setAppThemeState] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem('minimal_app_theme') as AppTheme;
      if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    } catch {
      // fallback
    }
    return 'system';
  });

  // 6. Active View & Navigation
  const [activeView, setActiveView] = useState<ActiveView>(() => {
    return hasCompletedOnboarding ? 'for-you' : 'welcome';
  });

  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [exploreCategory, setExploreCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 7. Reading progress & history (Stored strictly locally on device)
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgressRecord>>(() => {
    try {
      const stored = localStorage.getItem('minimal_reading_progress');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return {};
  });

  // 8. Available Topics (from Supabase or local fallback)
  const [availableTopics, setAvailableTopics] = useState<Topic[]>(() => {
    try {
      const cached = localStorage.getItem('minimal_cached_topics');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return ALL_TOPICS;
  });

  // 9. All Articles/Stories (from Supabase, cached locally for offline reading)
  const [allStories, setAllStories] = useState<Story[]>(() => {
    try {
      const cached = localStorage.getItem('minimal_cached_articles');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return MOCK_STORIES;
  });

  // 10. Supabase Connection Status
  const [supabaseStatus, setSupabaseStatus] = useState<{
    isConfigured: boolean;
    isConnected: boolean;
    message: string;
  }>({
    isConfigured: isSupabaseConfigured,
    isConnected: false,
    message: isSupabaseConfigured ? 'Verifying Supabase connection...' : 'Supabase credentials pending in environment.',
  });

  // Load content from Supabase on mount
  useEffect(() => {
    let isMounted = true;

    async function loadSupabaseContent() {
      if (isSupabaseConfigured) {
        // First verify connection and database access
        const verification: SupabaseVerificationResult = await verifySupabaseConnection();
        if (isMounted) {
          setSupabaseStatus({
            isConfigured: true,
            isConnected: verification.connected,
            message: verification.message,
          });
        }

        // Fetch topics and articles from Supabase
        try {
          const [topics, articles] = await Promise.all([
            contentService.getTopics(),
            contentService.getArticles(),
          ]);

          if (isMounted) {
            if (topics && topics.length > 0) {
              setAvailableTopics(topics);
              try {
                localStorage.setItem('minimal_cached_topics', JSON.stringify(topics));
              } catch {
                // Ignore storage limits
              }
            }
            if (articles && articles.length > 0) {
              setAllStories(articles);
              try {
                localStorage.setItem('minimal_cached_articles', JSON.stringify(articles));
              } catch {
                // Ignore storage limits
              }
            }
          }
        } catch (err) {
          console.warn('Failed to load content from Supabase:', err);
        }
      }
    }

    loadSupabaseContent();

    return () => {
      isMounted = false;
    };
  }, []);

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
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeStory = () => {
    setActiveStoryId(null);
    setActiveView('for-you');
    window.scrollTo({ top: 0, behavior: 'instant' });
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
    setActiveView('for-you');
  };

  const resetOnboarding = () => {
    localStorage.removeItem('minimal_onboarded');
    setHasCompletedOnboarding(false);
    setActiveView('welcome');
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

  // Active Story (Computed from allStories)
  const activeStory = useMemo(() => {
    if (!activeStoryId) return null;
    return allStories.find(s => s.id === activeStoryId) || null;
  }, [activeStoryId, allStories]);

  // Feed Computation (Computed dynamically from allStories & user's local topic preferences)
  const forYouStories = useMemo(() => {
    const matched = allStories.filter(s => selectedTopics.includes(s.topic));
    if (matched.length === 0) return allStories; // fallback to show stories if no topics matched
    return matched;
  }, [selectedTopics, allStories]);

  const savedStories = useMemo(() => {
    return allStories.filter(s => savedStoryIds.includes(s.id));
  }, [savedStoryIds, allStories]);

  const filteredExploreStories = useMemo(() => {
    return allStories.filter(story => {
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
  }, [exploreCategory, searchQuery, allStories]);

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
        availableTopics,
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
        allStories,
        supabaseStatus,
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
