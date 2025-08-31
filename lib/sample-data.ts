import type { Profile } from './types';

export const sampleProfiles: Profile[] = [
  {
    id: '1',
    name: 'Анна',
    bio: 'Люблю чтение и прогулки.',
    photos: ['https://example.com/photo1.jpg'],
    coordinates: { lat: 55.751244, lng: 37.618423 },
  },
  {
    id: '2',
    name: 'Борис',
    bio: 'Писатель и путешественник.',
    photos: ['https://example.com/photo2.jpg'],
    coordinates: { lat: 59.93428, lng: 30.335099 },
  },
  {
    id: '3',
    name: 'Катя',
    bio: 'Увлекаюсь спортом и искусством.',
    photos: ['https://example.com/photo3.jpg'],
    coordinates: { lat: 56.838926, lng: 60.605703 },
  },
  {
    id: '4',
    name: 'Дмитрий',
    bio: 'Занимаюсь программированием и музыкой.',
    photos: ['https://example.com/photo4.jpg'],
    coordinates: { lat: 55.008353, lng: 82.935733 },
  },
  {
    id: '5',
    name: 'Елена',
    bio: 'Люблю путешествовать и готовить.',
    photos: ['https://example.com/photo5.jpg'],
    coordinates: { lat: 55.796289, lng: 49.108795 },
  },
];
