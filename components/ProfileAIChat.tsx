import React, { useEffect, useState } from 'react';
import ChatSection, { ChatState } from './ChatSection';
import { View } from './Themed';
import Button from './ui/Button';

interface ProfileAIChatProps {
  onNameChange: (name: string) => void;
  onBioChange: (bio: string) => void;
  onFactsChange?: (facts: string[]) => void;
}

export default function ProfileAIChat({ onNameChange, onBioChange, onFactsChange }: ProfileAIChatProps) {
  const [state, setState] = useState<ChatState>({ messages: [], input: '' });
  const [facts, setFacts] = useState<string[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [asking, setAsking] = useState(false);
  const [awaitingAnswer, setAwaitingAnswer] = useState(false);

  const questions = [
    'Как тебя зовут?',
    'Сколько тебе лет?',
    'Чем ты увлекаешься?'
  ];

  useEffect(() => {
    if (!asking || awaitingAnswer || questionIndex >= questions.length) return;
    const question = questions[questionIndex];
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, { id: Date.now().toString(), text: `AI: ${question}` }],
    }));
    setAwaitingAnswer(true);
  }, [asking, awaitingAnswer, questionIndex, questions]);

  useEffect(() => {
    if (!asking || !awaitingAnswer || !state.messages.length) return;
    const last = state.messages[state.messages.length - 1].text;
    if (last.startsWith('AI:')) return;
    const answer = last.trim();
    const newFacts = [...facts, answer];
    setFacts(newFacts);
    onFactsChange?.(newFacts);
    setAwaitingAnswer(false);
    setQuestionIndex((prev) => prev + 1);
  }, [state.messages, asking, awaitingAnswer, facts, onFactsChange]);

  useEffect(() => {
    if (asking && !awaitingAnswer && questionIndex >= questions.length) {
      setAsking(false);
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, { id: Date.now().toString(), text: 'AI: Спасибо за ответы!' }],
      }));
    }
  }, [asking, awaitingAnswer, questionIndex, questions.length]);

  const startAsking = () => {
    setFacts([]);
    onFactsChange?.([]);
    setQuestionIndex(0);
    setAsking(true);
  };

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
      <ChatSection
        state={state}
        setState={setState}
        extra={!asking ? <Button title="Разрешить ИИ порасспрашивать" onPress={startAsking} /> : undefined}
      />
    </View>
  );
}

