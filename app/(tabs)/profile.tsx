import { View, Text, TextInput } from 'react-native';
export default function Profile() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Your profile</Text>
      <TextInput placeholder="Имя" style={{ backgroundColor: '#111', padding: 12, borderRadius: 12 }} />
      <TextInput placeholder="О себе" multiline style={{ backgroundColor: '#111', padding: 12, borderRadius: 12, minHeight: 100 }} />
    </View>
  );
}
