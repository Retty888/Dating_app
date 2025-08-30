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

export async function fetchCandidates() {
  // TODO: заменить на вызов Edge Function с фильтрами по локации/целям/времени
  return [
    { id: 'u1', name: 'Anna, 24', about: 'Кино, кошки, кофе' },
  ];
}

export async function aiIcebreaker(matchId: string) {
  const { data, error } = await supabase.functions.invoke('ai/icebreaker', {
    body: { matchId },
  });
  if (error) throw error;
  return (data as { icebreaker: string }).icebreaker;
}
