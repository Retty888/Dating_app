import { Stack } from 'expo-router';
import { AuthProvider } from '../lib/auth';
import { View, useWindowDimensions } from 'react-native';
import Sidebar from '../components/Sidebar';

export default function RootLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <AuthProvider>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {isDesktop && <Sidebar />}
        <View style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)/onboarding" options={{ presentation: 'modal' }} />
            <Stack.Screen name="(auth)/sign-in" options={{ presentation: 'modal' }} />
            <Stack.Screen name="chat/[id]" options={{ headerShown: true, title: 'Chat' }} />
          </Stack>
        </View>
      </View>
    </AuthProvider>
  );
}
