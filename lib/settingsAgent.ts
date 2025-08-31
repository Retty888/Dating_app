import { AgentResponse } from './localAgents';

export default async function settingsAgent(
  msg: string,
  state: { notifications: boolean } = { notifications: true }
): Promise<AgentResponse<typeof state>> {
  const lower = msg.toLowerCase();
  if (lower.includes('off') || lower.includes('disable') || lower.includes('выкл')) {
    state.notifications = false;
    return { reply: 'Notifications disabled.', state };
  }
  if (lower.includes('on') || lower.includes('enable') || lower.includes('вкл')) {
    state.notifications = true;
    return { reply: 'Notifications enabled.', state };
  }
  return {
    reply: `Notifications are ${state.notifications ? 'on' : 'off'}.`,
    state,
  };
}
