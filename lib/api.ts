import supabase from './supabase';
import type { Profile } from './types';

export type CandidateFilters = {
  location?: string;
  goals?: string[];
  time?: string;
};

export async function fetchCandidates(
  filters: CandidateFilters = {}
): Promise<Profile[]> {
  const { data, error } = await supabase.functions.invoke('fetch-candidates', {
    body: filters,
  });
  if (error) {
    console.error('fetchCandidates error', error);
    return [];
  }
  return (data as Profile[]) ?? [];

export interface CandidateFilters {
  /**
   * Geolocation information used to scope the search.
   * `radiusKm` is optional and defaults to server-side settings.
   */
  location?: { lat: number; lng: number; radiusKm?: number };
  /**
   * Preferred meeting goals such as "coffee" or "walk".
   */
  goals?: string[];
  /**
   * Time slots when the user is available.
   */
  availability?: { day: string; from: string; to: string }[];
}

/**
 * Fetch potential matches from the backend.
 *
 * @throws {Error} When the request fails or the backend returns an error.
 */
export async function fetchCandidates(filters: CandidateFilters = {}) {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-candidates', {
      body: filters,
    });

    if (error) {
      throw new Error(error.message || 'Unknown error');
    }

    return data as any[];
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to fetch candidates: ${message}`);
  }
}

export async function aiIcebreaker(matchId: string) {
  const { data, error } = await supabase.functions.invoke('ai/icebreaker', {
    body: { matchId },
  });
  if (error) throw error;
  return (data as { icebreaker: string }).icebreaker;
}
