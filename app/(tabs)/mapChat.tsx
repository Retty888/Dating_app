import ChatSection from '@/components/ChatSection';
import mapAgent from '@/lib/mapAgent';
import MapView, { Marker } from 'react-native-maps';
import { sampleProfiles } from '../../lib/sample-data';

function MapExtra() {
  const first = sampleProfiles[0]?.coordinates ?? { lat: 0, lng: 0 };
  const initialRegion = {
    latitude: first.lat,
    longitude: first.lng,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  return (
    <MapView style={{ width: '100%', height: 200 }} initialRegion={initialRegion}>
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
  );
}

export default function MapChat() {
  return <ChatSection section="map" agent={mapAgent} extra={<MapExtra />} />;
}

