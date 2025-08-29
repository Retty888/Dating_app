import { View, ViewStyle, useWindowDimensions } from 'react-native';

export default function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View
      style={[
        { padding: 16, borderRadius: 16, backgroundColor: '#222', width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
        style,
      ]}
    >
      {children}
    </View>
  );
}
