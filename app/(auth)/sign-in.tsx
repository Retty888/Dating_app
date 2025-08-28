import { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import * as Linking from 'expo-linking';
import supabase from '../../lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');

  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Вход по email</Text>
      <TextInput
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: '#111', padding: 12, borderRadius: 12 }}
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
        style={{ padding: 12, borderRadius: 12, backgroundColor: '#5dbea3' }}
      >
        <Text>Отправить код</Text>
      </Pressable>
    </View>
  );
}
