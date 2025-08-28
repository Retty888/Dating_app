# AI Dating Mediator

MVP: онбординг, дискавери, лайк/скип, чаты, ИИ‑медиатор (ледоколы), пуши.

## Запуск
1. `pnpm dlx create-expo-app ai-dating-mediator` (или npm/yarn)
2. Скопировать папку `app/`, `lib/`, `components/` и конфиги из этого каркаса
3. Заполнить `.env`
4. `pnpm start`

## Дальше
- Подключить Supabase Auth (email OTP / magic link)
- Реализовать таблицы: `profiles`, `likes`, `matches`, `messages`
- Edge Functions: `/ai/icebreaker`, `/ai/compromise`, `/match/candidates`
- Пуши (Expo Notifications)
