import { View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function Onboarding() {
  const colorScheme = useColorScheme() ?? 'light';
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 16 }}>
      <Text style={{ fontSize: 28, fontWeight: '700' }}>AI Dating Mediator</Text>
      <Text style={{ opacity: 0.7 }}>Короткий онбординг и загрузка фото — далее лента кандидатов и ИИ‑медиатор в чате.</Text>
      <Link href="/(auth)/sign-in" asChild>
        <Pressable
          style={{ padding: 12, borderRadius: 12, backgroundColor: Colors[colorScheme].primary }}
        >
          <Text style={{ color: Colors[colorScheme].text }}>Продолжить</Text>
        </Pressable>
      </Link>
    </View>
  );
}
