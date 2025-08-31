import React, { useEffect, useState } from 'react';
import ChatSection, { ChatState } from './ChatSection';
import { View } from './Themed';

interface ProfileAIChatProps {
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
}

export default function ProfileAIChat({ onNameChange, onBioChange }: ProfileAIChatProps) {
  const [state, setState] = useState<ChatState>({ messages: [], input: '' });

  useEffect(() => {
    if (!state.messages.length) return;
    const last = state.messages[state.messages.length - 1].text.trim();
    const lower = last.toLowerCase();

    if (lower.startsWith('name:')) {
      const value = last.slice(5).trim();
      onNameChange(value);
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { id: Date.now().toString(), text: `Имя обновлено на \"${value}\"` },
        ],
      }));
    } else if (lower.startsWith('bio:')) {
      const value = last.slice(4).trim();
      onBioChange(value);
      setState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { id: Date.now().toString(), text: 'Био обновлено.' },
        ],
      }));
    }
  }, [state.messages, onNameChange, onBioChange]);

  return (
    <View style={{ height: 200 }}>
      <ChatSection state={state} setState={setState} />
    </View>
  );
}

