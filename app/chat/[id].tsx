import { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import supabase from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

interface Message {
  id: string;
  match_id: string;
  sender: string;
  content: string;
  created_at: string;
}

export default function Chat() {
  const { id } = useLocalSearchParams();
  const matchId = Array.isArray(id) ? id[0] : id;
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!matchId) return;

    supabase
      .from('messages')
      .select('*')
      .eq('match_id', matchId)
      .order('created_at')
      .then(({ data }) => {
        setMessages((data as Message[]) || []);
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

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 8 }}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
        <TextInput
          style={{ flex: 1, backgroundColor: '#111', padding: 12, borderRadius: 12 }}
          value={text}
          onChangeText={setText}
          placeholder="Сообщение"
        />
        <Pressable
          onPress={send}
          style={{ padding: 12, borderRadius: 12, backgroundColor: '#5dbea3' }}
        >
          <Text>Отправить</Text>
        </Pressable>
      </View>
    </View>
  );
}
