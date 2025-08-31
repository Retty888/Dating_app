import { View, Text, useWindowDimensions } from 'react-native';

export default function MapScreenWeb() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  return (
    <View
      style={[
        { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', padding: 16 },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <Text>Карта недоступна в веб-версии. Откройте на iOS/Android.</Text>
    </View>
  );
}

