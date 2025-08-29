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
}

export async function aiIcebreaker(matchId: string) {
  // TODO: серверная функция, генерирующая "ледокол" от ИИ‑медиатора
  return 'Кажется, вы оба любите вечерние прогулки и кино. Что смотрели недавно?';
}
