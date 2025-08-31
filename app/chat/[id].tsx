import { useEffect, useState } from 'react';
import { FlatList, TextInput, Pressable, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import supabase from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { aiIcebreaker, aiChatResponse } from '../../lib/api';
import { sampleMessages, Message } from '../../lib/sample-messages';
import { sampleProfiles } from '../../lib/sample-data';
import type { Profile } from '../../lib/types';
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
  const [profile, setProfile] = useState<Profile | null>(null);
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

  useEffect(() => {
    if (!matchId) return;
    const p = sampleProfiles.find((pr) => pr.id === matchId);
    setProfile(p || null);
  }, [matchId]);

  const send = async () => {
    if (!text.trim() || !session?.user?.id || !matchId) return;
    const userMessage = text;

    if (demoMode) {
      const newMsg: Message = {
        id: Date.now().toString(),
        match_id: matchId,
        sender: session.user.id,
        content: userMessage,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMsg]);
      setText('');
      try {
        const reply = await aiChatResponse(matchId, userMessage);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            match_id: matchId,
            sender: 'ai',
            content: reply,
            created_at: new Date().toISOString(),
          },
        ]);
      } catch (e) {
        console.error(e);
      }
      return;
    }

    await supabase.from('messages').insert({
      match_id: matchId,
      sender: session.user.id,
      content: userMessage,
    });
    setText('');
    try {
      const reply = await aiChatResponse(matchId, userMessage);
      await supabase.from('messages').insert({
        match_id: matchId,
        sender: 'ai',
        content: reply,
      });
    } catch (e) {
      console.error(e);
    }
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
      {profile && (
        <View style={{ marginBottom: 16 }}>
          <FlatList
            data={profile.photos}
            horizontal
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={{ width: 200, height: 200, borderRadius: 12, marginRight: 8 }}
              />
            )}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 8 }}
          />
          <Text style={{ fontSize: 20, fontWeight: '600' }}>{profile.name}</Text>
          {profile.bio && (
            <Text style={{ color: Colors[colorScheme].muted, marginTop: 4 }}>
              {profile.bio}
            </Text>
          )}
        </View>
      )}
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
