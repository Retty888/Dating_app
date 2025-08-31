import React from 'react';
import { FlatList, TextInput, Pressable, View, Text, StyleSheet } from 'react-native';

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
          style={styles.input}
          value={state.input}
          onChangeText={(text) => setState((prev) => ({ ...prev, input: text }))}
          placeholder="Type a message"
        />
        <Pressable style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
        </Pressable>
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
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

