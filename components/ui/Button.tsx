import { Pressable, ViewStyle, useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '../useColorScheme';
import { Text } from '../Themed';

export default function Button({ title, onPress, style }: { title: string; onPress?: () => void; style?: ViewStyle }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          padding: 12,
          borderRadius: 12,
          backgroundColor: Colors[colorScheme].primary,
          alignItems: 'center',
          alignSelf: 'flex-start',
          opacity: pressed ? 0.8 : 1,
        },
        isDesktop && { alignSelf: 'center', width: '100%', maxWidth: 200 },
        style,
      ]}
    >
      <Text style={{ fontWeight: '600' }}>{title}</Text>
    </Pressable>
  );
}
