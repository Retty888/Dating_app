export interface Match {
  id: string;
  photo: string;
  description: string;
}

export const sampleMatches: Match[] = [
  {
    id: '1',
    photo: 'https://example.com/match1.jpg',
    description: 'Любит путешествия и кофе.',
  },
  {
    id: '2',
    photo: 'https://example.com/match2.jpg',
    description: 'Фанат музыки и кулинарии.',
  },
  {
    id: '3',
    photo: 'https://example.com/match3.jpg',
    description: 'Занимается спортом и фотографией.',
  },
];
