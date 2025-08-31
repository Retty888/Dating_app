import { useState } from 'react';
import { TextInput, Pressable, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import supabase from '../../lib/supabase';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Вход по email</Text>
      <TextInput
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: Colors[colorScheme].inputBackground, padding: 12, borderRadius: 12 }}
      />
      <Pressable
        onPress={async () => {
          const redirectTo = Linking.createURL('/auth');
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: redirectTo },
          });
          if (error) {
            Alert.alert('Ошибка', error.message);
          } else {
            Alert.alert('Проверьте почту', 'Мы отправили вам ссылку для входа.');
          }
        }}
        style={{ padding: 12, borderRadius: 12, backgroundColor: Colors[colorScheme].primary }}
      >
        <Text>Отправить код</Text>
      </Pressable>
    </View>
  );
}
