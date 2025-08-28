export async function fetchCandidates() {
  // TODO: заменить на вызов Edge Function с фильтрами по локации/целям/времени
  return [
    { id: 'u1', name: 'Anna, 24', about: 'Кино, кошки, кофе' },
  ];
}

export async function aiIcebreaker(matchId: string) {
  // TODO: серверная функция, генерирующая "ледокол" от ИИ‑медиатора
  return 'Кажется, вы оба любите вечерние прогулки и кино. Что смотрели недавно?';
}
