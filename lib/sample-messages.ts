export interface Message {
  id: string;
  match_id: string;
  sender: string;
  content: string;
  created_at: string;
}

export const sampleMessages: Message[] = [
  {
    id: '1',
    match_id: '1',
    sender: 'user1',
    content: 'Привет! Как твой день?',
    created_at: '2024-01-01T10:00:00Z',
  },
  {
    id: '2',
    match_id: '1',
    sender: 'user2',
    content: 'Отлично, а у тебя?',
    created_at: '2024-01-01T10:05:00Z',
  },
  {
    id: '3',
    match_id: '2',
    sender: 'user1',
    content: 'Любишь ли ты путешествовать?',
    created_at: '2024-01-02T09:00:00Z',
  },
  {
    id: '4',
    match_id: '2',
    sender: 'user3',
    content: 'Да, очень!',
    created_at: '2024-01-02T09:10:00Z',
  },
];
