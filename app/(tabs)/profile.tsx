import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, useWindowDimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import supabase from '../../lib/supabase';
import { useAuth } from '../../lib/auth';

export default function Profile() {
  const { session } = useAuth();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    if (!session?.user) return;
    supabase
      .from('photos')
      .select('url')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setPhotoUrl(data[0].url);
        }
      });
  }, [session]);

  const pickImage = async () => {
    if (!session?.user) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (result.canceled) return;
    const asset = result.assets[0];
    const response = await fetch(asset.uri);
    const blob = await response.blob();
    const ext = asset.uri.split('.').pop() || 'jpg';
    const filePath = `${session.user.id}/${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase
      .storage
      .from('profile-photos')
      .upload(filePath, blob, { contentType: blob.type });
    if (uploadError) {
      console.error(uploadError);
      return;
    }
    const { data: { publicUrl } } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath);
    const { error: insertError } = await supabase
      .from('photos')
      .insert({ user_id: session.user.id, url: publicUrl });
    if (insertError) {
      console.error(insertError);
      return;
    }
    setPhotoUrl(publicUrl);
  };

  return (
    <View
      style={[
        { flex: 1, padding: 16, gap: 12, width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Your profile</Text>
      {photoUrl && (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: 120, height: 120, borderRadius: 60 }}
        />
      )}
      <Button title="Upload photo" onPress={pickImage} />
      <TextInput
        placeholder="Имя"
        style={{ backgroundColor: '#111', padding: 12, borderRadius: 12 }}
      />
      <TextInput
        placeholder="О себе"
        multiline
        style={{ backgroundColor: '#111', padding: 12, borderRadius: 12, minHeight: 100 }}
      />
    </View>
  );
}

