import { View, Text, Pressable, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchCandidates } from '../../lib/api';

export default function Discover() {
  const [i, setI] = useState(0);
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    fetchCandidates().then(setCandidates).catch(() => setCandidates([]));
  }, []);

  const c = candidates[i];
  const photo = c?.photo ?? c?.photos?.[0];
  return (
    <View style={{ flex: 1, padding: 16, gap: 16, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Discover</Text>
      {c ? (
        <View style={{ padding: 16, borderRadius: 16, backgroundColor: '#222' }}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: '100%', height: 300, borderRadius: 16, marginBottom: 8 }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: '100%',
                height: 300,
                borderRadius: 16,
                marginBottom: 8,
                backgroundColor: '#333',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ opacity: 0.7 }}>Фото отсутствует</Text>
            </View>
          )}
          <Text style={{ fontSize: 20, marginBottom: 8 }}>{c.name ?? 'Без имени'}</Text>
          <Text style={{ opacity: 0.7 }}>{c.about ?? c.bio ?? 'Нет информации о себе'}</Text>
        </View>
      ) : (
        <Text>Больше кандидатов нет</Text>
      )}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Pressable
          onPress={() => setI((x) => Math.min(x + 1, candidates.length))}
          style={{ padding: 12, backgroundColor: '#444', borderRadius: 12 }}
        >
          <Text>Skip</Text>
        </Pressable>
        <Pressable
          onPress={() => setI((x) => Math.min(x + 1, candidates.length))}
          style={{ padding: 12, backgroundColor: '#5dbea3', borderRadius: 12 }}
        >
          <Text>Like</Text>
        </Pressable>
      </View>
    </View>
  );
}