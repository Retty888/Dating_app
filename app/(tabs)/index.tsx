import { View, Text, Pressable, Image, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import supabase from '../../lib/supabase';
import { fetchCandidates } from '../../lib/api';
import type { Profile } from '../../lib/types';

export default function Discover() {
  const [i, setI] = useState(0);
  const [candidates, setCandidates] = useState<Profile[]>([]);
  const [showMatch, setShowMatch] = useState(false);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    fetchCandidates().then(setCandidates).catch(() => setCandidates([]));
  }, []);

  const c = candidates[i];
  const photo = c?.photos?.[0];

  const handleLike = async () => {
    if (!c) return;
    try {
      const { data, error } = await supabase.rpc('like_user', {
        target_user_id: c.id,
      });
      if (error) {
        console.error(error);
      }
      if (data?.match_id) {
        setShowMatch(true);
        setTimeout(() => {
          setShowMatch(false);
          router.push(`/chat/${data.match_id}`);
        }, 1000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setI((x) => Math.min(x + 1, candidates.length));
    }
  };
  return (
    <View
      style={[
        {
          flex: 1,
          padding: 16,
          gap: 16,
          justifyContent: 'center',
          width: '100%',
        },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: '600' }}>Discover</Text>
        <Pressable onPress={() => router.push('/(tabs)/map')}>
          <Text style={{ color: '#5dbea3' }}>Map</Text>
        </Pressable>
      </View>
      {c ? (
        <View
          style={[
            { padding: 16, borderRadius: 16, backgroundColor: '#222', width: '100%' },
            isDesktop && { maxWidth: 600, alignSelf: 'center' },
          ]}
        >
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
          <Text style={{ opacity: 0.7 }}>{c.bio ?? 'Нет информации о себе'}</Text>
          {c.coordinates && (
            <Text style={{ opacity: 0.7 }}>
              {`Координаты: ${c.coordinates.lat}, ${c.coordinates.lng}`}
            </Text>
          )}
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
          onPress={handleLike}
          style={{ padding: 12, backgroundColor: '#5dbea3', borderRadius: 12 }}
        >
          <Text>Like</Text>
        </Pressable>
      </View>
      {showMatch && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#5dbea3',
            padding: 12,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: '600' }}>Новый матч</Text>
        </View>
      )}
    </View>
  );
}
