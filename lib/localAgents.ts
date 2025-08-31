export type AgentResponse<S = any> = {
  reply: string;
  state?: S;
};

export async function greetingAgent(
  msg: string,
  state: { greeted?: boolean } = {}
): Promise<AgentResponse<typeof state>> {
  if (!state.greeted) {
    state.greeted = true;
    return { reply: 'Привет! Я локальный агент. Как твои дела?', state };
  }
  // TODO: заменить на вызов облачного ИИ для генерации ответа
  return { reply: `Ты сказал: ${msg}. Чем ещё могу помочь?`, state };
}

export async function hobbyAgent(
  msg: string,
  state: { asked?: boolean } = {}
): Promise<AgentResponse<typeof state>> {
  if (!state.asked) {
    state.asked = true;
    return { reply: 'Чем ты любишь заниматься в свободное время?', state };
  }
  // TODO: задействовать облачный ИИ для анализа интересов
  return { reply: `Звучит интересно! ${msg} — это круто.`, state };
}

export async function planAgent(
  msg: string,
  state: { stage?: number } = {}
): Promise<AgentResponse<typeof state>> {
  if (!state.stage) {
    state.stage = 1;
    return { reply: 'Хотел бы встретиться на кофе?', state };
  }
  // TODO: использовать облачный ИИ для планирования встречи
  return { reply: `Отлично, договорились: ${msg}.`, state };
}

export async function farewellAgent(
  msg: string,
  state: { confirmed?: boolean } = {}
): Promise<AgentResponse<typeof state>> {
  if (!state.confirmed) {
    state.confirmed = true;
    return { reply: 'Было приятно пообщаться. До встречи!', state };
  }
  // TODO: подключить облачный ИИ для персонализации прощания
  return { reply: `Пока! Ты сказал: ${msg}.`, state };
}
