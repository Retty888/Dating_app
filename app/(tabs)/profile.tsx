import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, useWindowDimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import supabase from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { sampleProfiles } from '../../lib/sample-data';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function Profile() {
  const { session } = useAuth();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme() ?? 'light';

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

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('name, bio')
        .eq('id', session.user.id)
        .maybeSingle();
      if (error) {
        console.error(error);
        return;
      }
      if (data) {
        setName(data.name ?? '');
        setBio(data.bio ?? '');
      } else {
        const sample = sampleProfiles[0];
        setName(sample.name);
        setBio(sample.bio ?? '');
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            name: sample.name,
            bio: sample.bio,
          });
        if (insertError) {
          console.error(insertError);
        }
      }
    };

    loadProfile();
  }, [session]);

  const pickImage = async () => {
    if (!session?.user) return;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission required',
        'Please allow access to your media library to upload a photo.',
      );
      return;
    }
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

  const deletePhoto = async () => {
    if (!session?.user || !photoUrl) return;
    const path = photoUrl.split('/profile-photos/')[1];
    if (path) {
      await supabase.storage.from('profile-photos').remove([path]);
    }
    await supabase.from('photos').delete().eq('user_id', session.user.id);
    setPhotoUrl(null);
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
      {photoUrl && (
        <Button title="Удалить фото" color={Colors[colorScheme].danger} onPress={deletePhoto} />
      )}
      <TextInput
        placeholder="Имя"
        value={name}
        onChangeText={setName}
        style={{ backgroundColor: Colors[colorScheme].inputBackground, padding: 12, borderRadius: 12 }}
      />
      <TextInput
        placeholder="О себе"
        value={bio}
        onChangeText={setBio}
        multiline
        style={{ backgroundColor: Colors[colorScheme].inputBackground, padding: 12, borderRadius: 12, minHeight: 100 }}
      />
      <Button title="Сохранить" onPress={async () => {
        if (!session?.user) return;
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: session.user.id,
            name,
            bio,
          });
        if (error) {
          console.error(error);
          Alert.alert('Error', 'Не удалось сохранить профиль');
        } else {
          Alert.alert('Success', 'Профиль сохранён');
        }
      }} />
      <Button title="Выйти из профиля" color={Colors[colorScheme].danger} onPress={() => supabase.auth.signOut()} />
    </View>
  );
}

