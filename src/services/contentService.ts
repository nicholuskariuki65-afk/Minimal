import { Story, Topic } from '../types';
import { ALL_TOPICS, MOCK_STORIES } from '../data/mockStories';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface SourceRecord {
  id: string;
  name: string;
  url?: string;
  description?: string;
}

/**
 * Service handling Topics, Sources, and Articles from Supabase.
 * Automatically falls back to high-quality local data if Supabase is unconfigured,
 * unreachable, or empty, ensuring the app remains 100% operational offline.
 */
export const contentService = {
  /**
   * Fetch all topics from Supabase, or fallback to default topics.
   */
  async getTopics(): Promise<Topic[]> {
    if (!supabase || !isSupabaseConfigured) {
      return ALL_TOPICS;
    }

    try {
      const { data, error } = await supabase
        .from('topics')
        .select('name')
        .order('created_at', { ascending: true });

      if (error || !data || data.length === 0) {
        return ALL_TOPICS;
      }

      const fetchedTopics = data
        .map(t => t.name as Topic)
        .filter(name => Boolean(name));

      return fetchedTopics.length > 0 ? fetchedTopics : ALL_TOPICS;
    } catch (err) {
      console.warn('Supabase topics fetch failed, using local topics:', err);
      return ALL_TOPICS;
    }
  },

  /**
   * Fetch sources from Supabase.
   */
  async getSources(): Promise<SourceRecord[]> {
    if (!supabase || !isSupabaseConfigured) {
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('sources')
        .select('id, name, url, description')
        .order('name');

      if (error || !data) {
        return [];
      }

      return data as SourceRecord[];
    } catch (err) {
      console.warn('Supabase sources fetch failed:', err);
      return [];
    }
  },

  /**
   * Fetch articles/stories from Supabase.
   * Flexibly normalizes columns (snake_case and camelCase) into the Story format.
   */
  async getArticles(): Promise<Story[]> {
    if (!supabase || !isSupabaseConfigured) {
      return MOCK_STORIES;
    }

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return MOCK_STORIES;
      }

      const formattedStories: Story[] = data.map(row => {
        // Parse content safely if stored as JSON or string
        let content = row.content;
        if (typeof content === 'string') {
          try {
            content = JSON.parse(content);
          } catch {
            content = [{ type: 'paragraph', text: row.content }];
          }
        }
        if (!Array.isArray(content)) {
          content = [{ type: 'paragraph', text: String(row.content || row.subtitle || '') }];
        }

        return {
          id: String(row.id),
          title: row.title || 'Untitled',
          slug: row.slug || String(row.id),
          subtitle: row.subtitle || '',
          topic: (row.topic || row.topic_name || 'Technology') as Topic,
          source: row.source || row.source_name || 'Minimal Curated',
          author: row.author || 'Editorial Staff',
          authorRole: row.author_role || row.authorRole || undefined,
          readTimeMinutes: Number(row.read_time_minutes || row.readTimeMinutes || 4),
          publishedAt: row.published_at || row.publishedAt || 'Recently',
          heroImage: row.hero_image || row.heroImage || undefined,
          imageCaption: row.image_caption || row.imageCaption || undefined,
          leadStory: Boolean(row.lead_story ?? row.leadStory ?? false),
          pullQuote: row.pull_quote || row.pullQuote || undefined,
          content,
          relatedStoryIds: Array.isArray(row.related_story_ids || row.relatedStoryIds)
            ? row.related_story_ids || row.relatedStoryIds
            : undefined,
        };
      });

      return formattedStories.length > 0 ? formattedStories : MOCK_STORIES;
    } catch (err) {
      console.warn('Supabase articles fetch failed, using local stories:', err);
      return MOCK_STORIES;
    }
  },
};
