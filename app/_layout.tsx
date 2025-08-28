import { Stack } from 'expo-router';
import { AuthProvider } from '../lib/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)/onboarding" options={{ presentation: 'modal' }} />
        <Stack.Screen name="(auth)/sign-in" options={{ presentation: 'modal' }} />
        <Stack.Screen name="chat/[id]" options={{ headerShown: true, title: 'Chat' }} />
      </Stack>
    </AuthProvider>
  );
}