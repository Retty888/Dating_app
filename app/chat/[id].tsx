import { useEffect, useState } from 'react';
import { FlatList, TextInput, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import supabase from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { aiIcebreaker } from '../../lib/api';
import { sampleMessages, Message } from '../../lib/sample-messages';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const demoMode = process.env.EXPO_PUBLIC_DEMO_MODE === 'true';

export default function Chat() {
  const { id } = useLocalSearchParams();
  const matchId = Array.isArray(id) ? id[0] : id;
  const router = useRouter();
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [icebreaker, setIcebreaker] = useState<string | null>(null);
  const colorScheme = useColorScheme() ?? 'light';

  useEffect(() => {
    if (!matchId) return;

    if (demoMode) {
      setMessages(sampleMessages.filter((m) => m.match_id === matchId));
      return;
    }

    supabase
      .from('messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at')
      .then(({ data }) => {
        if (!data || data.length === 0) {
          setMessages(sampleMessages.filter((m) => m.match_id === matchId));
        } else {
          setMessages(data as Message[]);
        }
      });

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `match_id=eq.${matchId}` },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  const send = async () => {
    if (!text.trim() || !session?.user?.id || !matchId) return;
    await supabase.from('messages').insert({
      match_id: matchId,
      sender: session.user.id,
      content: text,
    });
    setText('');
  };

  const deleteChat = async () => {
    if (!matchId) return;
    if (demoMode) {
      setMessages([]);
      router.back();
      return;
    }
    await supabase.from('messages').delete().eq('match_id', matchId);
    router.back();
  };

  const exitChat = () => {
    router.back();
  };

  useEffect(() => {
    if (!matchId) return;
    aiIcebreaker(matchId).then(setIcebreaker).catch(console.error);
  }, [matchId]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
        <Pressable
          onPress={deleteChat}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            backgroundColor: Colors[colorScheme].danger,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Удалить сообщение</Text>
        </Pressable>
        <Pressable
          onPress={exitChat}
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 12,
            backgroundColor: Colors[colorScheme].primary,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Выход из чата</Text>
        </Pressable>
      </View>
      <FlatList
        data={
          icebreaker
            ? [
                {
                  id: 'ai-icebreaker',
                  match_id: matchId || '',
                  sender: 'ai',
                  content: icebreaker,
                  created_at: new Date().toISOString(),
                },
                ...messages,
              ]
            : messages
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            {item.id === 'ai-icebreaker' ? (
              <Text style={{ fontStyle: 'italic', color: Colors[colorScheme].muted }}>
                Пример: {item.content}
              </Text>
            ) : (
              <Text>{item.content}</Text>
            )}
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: Colors[colorScheme].inputBackground,
            padding: 12,
            borderRadius: 12,
          }}
          value={text}
          onChangeText={setText}
          placeholder="Сообщение"
          placeholderTextColor={Colors[colorScheme].muted}
        />
        <Pressable
          onPress={send}
          style={{ padding: 12, borderRadius: 12, backgroundColor: Colors[colorScheme].primary }}
        >
          <Text>Отправить</Text>
        </Pressable>
      </View>
    </View>
  );
}
