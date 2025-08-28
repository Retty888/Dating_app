import { View, ViewStyle } from 'react-native';
export default function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <View style={[{ padding: 16, borderRadius: 16, backgroundColor: '#222' }, style]}>{children}</View>
  );
}
