import React from 'react';
import { FlatList, TextInput, View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import Button from './ui/Button';

interface Message {
  id: string;
  text: string;
}

export interface ChatState {
  messages: Message[];
  input: string;
}

interface ChatSectionProps {
  state: ChatState;
  setState: React.Dispatch<React.SetStateAction<ChatState>>;
  extra?: React.ReactNode;
}

export default function ChatSection({ state, setState, extra }: ChatSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const handleSend = () => {
    const trimmed = state.input.trim();
    if (!trimmed) return;
    const newMessage: Message = { id: Date.now().toString(), text: trimmed };
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      input: '',
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        style={styles.list}
      />
      {extra}
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { borderColor: Colors[colorScheme].muted }]}
          value={state.input}
          onChangeText={(text) => setState((prev) => ({ ...prev, input: text }))}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  message: {
    padding: 8,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
});

