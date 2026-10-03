export type Topic =
  | 'Kenya'
  | 'Technology'
  | 'Startups'
  | 'Business'
  | 'Finance'
  | 'Science'
  | 'World'
  | 'Sports'
  | 'Gaming'
  | 'Health'
  | 'Culture'
  | 'Environment'
  | 'AI'
  | (string & {});

export interface ArticleSection {
  type: 'paragraph' | 'subheading' | 'quote' | 'callout';
  text: string;
  kicker?: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  topic: Topic;
  source: string;
  author: string;
  authorRole?: string;
  readTimeMinutes: number;
  publishedAt: string;
  heroImage?: string;
  imageCaption?: string;
  leadStory?: boolean;
  pullQuote?: string;
  content: ArticleSection[];
  relatedStoryIds?: string[];
}

export type ReaderFontFamily = 'serif' | 'sans' | 'mono';
export type ReaderFontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReaderWidth = 'compact' | 'optimal' | 'wide';
export type ReaderLineSpacing = 'tight' | 'normal' | 'relaxed';
export type ReaderTheme = 'alabaster' | 'sepia' | 'charcoal' | 'black';

export interface ReaderPreferences {
  fontFamily: ReaderFontFamily;
  fontSize: ReaderFontSize;
  readingWidth: ReaderWidth;
  lineSpacing: ReaderLineSpacing;
  readerTheme: ReaderTheme;
}

export type AppTheme = 'light' | 'dark' | 'system';
export type ActiveView = 'for-you' | 'explore' | 'saved' | 'settings' | 'reader' | 'welcome' | 'topics';

export interface ReadingProgressRecord {
  storyId: string;
  progressPercent: number;
  lastReadAt: string;
  completed: boolean;
}
