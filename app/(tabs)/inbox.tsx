import { View, Text } from 'react-native';
export default function Inbox() {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Chats</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>Диалогов ещё нет</Text>
    </View>
  );
}
