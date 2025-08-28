import { Pressable, Text, ViewStyle } from 'react-native';

export default function Button({ title, onPress, style }: { title: string; onPress?: () => void; style?: ViewStyle }) {
  return (
    <Pressable onPress={onPress} style={[{ padding: 12, borderRadius: 12, backgroundColor: '#5dbea3', alignItems: 'center' }, style]}>
      <Text style={{ fontWeight: '600' }}>{title}</Text>
    </Pressable>
  );
}
