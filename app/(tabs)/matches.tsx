import { useWindowDimensions, FlatList, Image, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { sampleMatches } from '@/lib/sample-matches';
import { useRouter } from 'expo-router';

export default function Matches() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const router = useRouter();

  return (
    <View
      style={[
        { flex: 1, padding: 16, width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Matches</Text>
      <FlatList
        data={sampleMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/chat/${item.id}`)}
            style={{ width: '48%', marginBottom: 16 }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{ width: '100%', aspectRatio: 1, borderRadius: 12 }}
            />
            <Text style={{ marginTop: 8 }}>{item.name}</Text>
          </Pressable>
        )}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: 16,
        }}
      />
    </View>
  );
}

