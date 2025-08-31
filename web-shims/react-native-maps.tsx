import React from 'react';
import { View, Text } from 'react-native';

export default function MapView(props: any) {
  return (
    <View style={[{ padding: 12, borderWidth: 1, borderColor: '#ccc' }, props.style]}> 
      <Text>react-native-maps is not available on web.</Text>
    </View>
  );
}

export function Marker(_props: any) {
  return null;
}

