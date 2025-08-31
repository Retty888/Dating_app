import { View, useWindowDimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { sampleProfiles } from '../../lib/sample-data';

export default function MapScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const first = sampleProfiles[0]?.coordinates ?? { lat: 0, lng: 0 };
  const initialRegion = {
    latitude: first.lat,
    longitude: first.lng,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  return (
    <View
      style={[
        { flex: 1, width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
        {sampleProfiles.map((p) =>
          p.coordinates ? (
            <Marker
              key={p.id}
              coordinate={{
                latitude: p.coordinates.lat,
                longitude: p.coordinates.lng,
              }}
              title={p.name}
              description={p.bio}
            />
          ) : null
        )}
      </MapView>
    </View>
  );
}
