import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';

const MOCK = [
  { id: 'u1', name: 'Anna, 24', about: 'Кино, кошки, кофе' },
  { id: 'u2', name: 'Mia, 23', about: 'Йога, море, вино' },
];

export default function Discover() {
  const [i, setI] = useState(0);
  const c = MOCK[i];
  return (
    <View style={{ flex: 1, padding: 16, gap: 16, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Discover</Text>
      {c ? (
        <View style={{ padding: 16, borderRadius: 16, backgroundColor: '#222' }}>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>{c.name}</Text>
          <Text style={{ opacity: 0.7 }}>{c.about}</Text>
        </View>
      ) : (
        <Text>Больше кандидатов нет</Text>
      )}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable onPress={() => setI((x) => Math.min(x + 1, MOCK.length))} style={{ padding: 12, backgroundColor: '#444', borderRadius: 12 }}>
          <Text>Skip</Text>
        </Pressable>
        <Pressable onPress={() => setI((x) => Math.min(x + 1, MOCK.length))} style={{ padding: 12, backgroundColor: '#5dbea3', borderRadius: 12 }}>
          <Text>Like</Text>
        </Pressable>
      </View>
    </View>
  );
}