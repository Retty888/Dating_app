import { View, Text, TextInput, Pressable } from 'react-native';
import supabase from '../../lib/supabase';

export default function SignIn() {
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: 'center', gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Вход по email</Text>
      <TextInput placeholder="email" keyboardType="email-address" autoCapitalize="none" style={{ backgroundColor: '#111', padding: 12, borderRadius: 12 }} />
      <Pressable onPress={async () => {
        // TODO: реализовать send magic link / OTP через supabase.auth
      }} style={{ padding: 12, borderRadius: 12, backgroundColor: '#5dbea3' }}>
        <Text>Отправить код</Text>
      </Pressable>
    </View>
  );
}
