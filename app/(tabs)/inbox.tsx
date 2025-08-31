import {
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import { Text, View } from '@/components/Themed';
import { sampleMatches } from '@/lib/sample-matches';
import { sampleMessages, Message } from '@/lib/sample-messages';
import { useRouter } from 'expo-router';

export default function Inbox() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();

  const chats = Object.values(
    sampleMessages.reduce<Record<string, Message>>((acc, msg) => {
      const existing = acc[msg.match_id];
      if (!existing || new Date(msg.created_at) > new Date(existing.created_at)) {
        acc[msg.match_id] = msg;
      }
      return acc;
    }, {})
  )
    .map((msg) => ({
      match: sampleMatches.find((m) => m.id === msg.match_id),
      lastMessage: msg,
    }))
    .filter((item) => item.match)
    .sort(
      (a, b) =>
        new Date(b.lastMessage.created_at).getTime() -
        new Date(a.lastMessage.created_at).getTime()
    );

  return (
    <View
      style={[
        { flex: 1, padding: 16, width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Chats</Text>
      {chats.length === 0 ? (
        <Text style={{ marginTop: 8, opacity: 0.7 }}>Диалогов ещё нет</Text>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.match!.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/chat/${item.match!.id}`)}
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}
            >
              <Image
                source={{ uri: item.match!.photo }}
                style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>{item.match!.name}</Text>
                <Text style={{ marginTop: 4, opacity: 0.7 }} numberOfLines={1}>
                  {item.lastMessage.content}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
