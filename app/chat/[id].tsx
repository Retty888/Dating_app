import { View, Text } from 'react-native';
export default function Chat() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Диалог</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>Тут будет ИИ‑медиатор</Text>
    </View>
  );
}
