import { View, ViewStyle, useWindowDimensions } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '../useColorScheme';

export default function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View
      style={[
        {
          padding: 16,
          borderRadius: 16,
          backgroundColor: Colors[colorScheme].inputBackground,
          width: '100%',
        },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
        style,
      ]}
    >
      {children}
    </View>
  );
}
