export interface Match {
  id: string;
  name: string;
  photo: string;
  description: string;
}

export const sampleMatches: Match[] = [
  {
    id: '1',
    name: 'Анна',
    photo: 'https://example.com/match1.jpg',
    description: 'Любит путешествия и кофе.',
  },
  {
    id: '2',
    name: 'Борис',
    photo: 'https://example.com/match2.jpg',
    description: 'Фанат музыки и кулинарии.',
  },
  {
    id: '3',
    name: 'Мария',
    photo: 'https://example.com/match3.jpg',
    description: 'Занимается спортом и фотографией.',
  },
];
