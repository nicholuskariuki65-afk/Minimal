import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Normalizes and sanitizes the user-provided Supabase URL.
 * Handles:
 * - Bare project reference IDs (e.g. "kjrmepakeqdgplmrchyd" -> "https://kjrmepakeqdgplmrchyd.supabase.co")
 * - Hostnames without protocol (e.g. "kjrmepakeqdgplmrchyd.supabase.co" -> "https://kjrmepakeqdgplmrchyd.supabase.co")
 * - Surrounding quotes or whitespace
 * - Standard https:// URLs
 */
export function normalizeSupabaseUrl(rawUrl: string | undefined): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim().replace(/^["']|["']$/g, '').trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.includes('.supabase.co')) {
    return `https://${trimmed}`;
  }

  // Bare project ID/reference string (alphanumeric with hyphens/underscores)
  if (/^[a-z0-9_-]+$/i.test(trimmed)) {
    return `https://${trimmed}.supabase.co`;
  }

  return `https://${trimmed}`;
}

/**
 * Normalizes and sanitizes the Supabase publishable/anon key.
 */
export function normalizeSupabaseKey(rawKey: string | undefined): string {
  if (!rawKey) return '';
  return rawKey.trim().replace(/^["']|["']$/g, '').trim();
}

/**
 * Validates that a string is a well-formed HTTP/HTTPS URL.
 */
export function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

// Environment variables for Supabase (Vite requires VITE_ prefix for client-side access)
const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const normalizedSupabaseUrl = normalizeSupabaseUrl(rawUrl);
export const normalizedSupabaseAnonKey = normalizeSupabaseKey(rawKey);

// Validate that credentials are non-empty, well-formed, and not dummy placeholders
export const isSupabaseConfigured: boolean = Boolean(
  normalizedSupabaseUrl &&
    normalizedSupabaseAnonKey &&
    isValidHttpUrl(normalizedSupabaseUrl) &&
    !normalizedSupabaseUrl.includes('your-project-id') &&
    !normalizedSupabaseAnonKey.includes('your-anon-publishable-key')
);

// Initialize Supabase client safely with defensive error handling
function initSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }
  try {
    return createClient(normalizedSupabaseUrl, normalizedSupabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
    return null;
  }
}

export const supabase: SupabaseClient | null = initSupabaseClient();

export interface SupabaseVerificationResult {
  connected: boolean;
  message: string;
  tablesAccessible?: {
    articles: boolean;
    topics: boolean;
    sources: boolean;
  };
  error?: string;
}

/**
 * Verifies Supabase connection and tests database access for:
 * - topics
 * - sources
 * - articles
 */
export async function verifySupabaseConnection(): Promise<SupabaseVerificationResult> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      connected: false,
      message: 'Supabase credentials are not configured yet. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.',
    };
  }

  const result: SupabaseVerificationResult = {
    connected: false,
    message: '',
    tablesAccessible: {
      articles: false,
      topics: false,
      sources: false,
    },
  };

  try {
    // 1. Test articles table access
    const { error: articlesError } = await supabase
      .from('articles')
      .select('id')
      .limit(1);

    if (!articlesError) {
      result.tablesAccessible!.articles = true;
    }

    // 2. Test topics table access
    const { error: topicsError } = await supabase
      .from('topics')
      .select('id, name')
      .limit(1);

    if (!topicsError) {
      result.tablesAccessible!.topics = true;
    }

    // 3. Test sources table access
    const { error: sourcesError } = await supabase
      .from('sources')
      .select('id, name')
      .limit(1);

    if (!sourcesError) {
      result.tablesAccessible!.sources = true;
    }

    // Determine connection status
    const anyTableAccessible =
      result.tablesAccessible!.articles ||
      result.tablesAccessible!.topics ||
      result.tablesAccessible!.sources;

    if (anyTableAccessible) {
      result.connected = true;
      const accessibleList = Object.entries(result.tablesAccessible!)
        .filter(([, ok]) => ok)
        .map(([name]) => name)
        .join(', ');
      result.message = `Successfully connected to Supabase and verified database access (${accessibleList}).`;
    } else {
      // If tables don't exist yet, but client connected
      result.connected = true;
      result.message =
        'Connected to Supabase endpoint, but tables (articles, topics, sources) were not found or need RLS policies configured.';
      result.error =
        articlesError?.message || topicsError?.message || sourcesError?.message;
    }

    return result;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      message: `Failed to connect to Supabase: ${errorMsg}`,
      error: errorMsg,
    };
  }
}
