import { View, Text, useWindowDimensions } from 'react-native';

export default function Inbox() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View
      style={[
        { flex: 1, padding: 16, width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Chats</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>Диалогов ещё нет</Text>
    </View>
  );
}
