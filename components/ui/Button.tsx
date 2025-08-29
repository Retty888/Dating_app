import { Pressable, Text, ViewStyle, useWindowDimensions } from 'react-native';

export default function Button({ title, onPress, style }: { title: string; onPress?: () => void; style?: ViewStyle }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <Pressable
      onPress={onPress}
      style={[
        { padding: 12, borderRadius: 12, backgroundColor: '#5dbea3', alignItems: 'center', alignSelf: 'flex-start' },
        isDesktop && { alignSelf: 'center', width: '100%', maxWidth: 200 },
        style,
      ]}
    >
      <Text style={{ fontWeight: '600' }}>{title}</Text>
    </Pressable>
  );
}
