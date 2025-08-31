import { useEffect, useState } from 'react';
import { View, Text, Switch, Button, useWindowDimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { loadPreferences, savePreferences, resetPreferences, Preferences } from '../../lib/preferences';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function Settings() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const colorScheme = useColorScheme() ?? 'light';

  const [prefs, setPrefs] = useState<Preferences>({
    radius: 10,
    goal: 'serious',
    notifications: true,
  });

  useEffect(() => {
    loadPreferences().then(setPrefs);
  }, []);

  return (
    <View
      style={[
        { flex: 1, padding: 16, gap: 12, width: '100%' },
        isDesktop && { maxWidth: 600, alignSelf: 'center' },
      ]}
    >
      <Text style={{ fontSize: 24, fontWeight: '600' }}>Settings</Text>

      <Text>Search radius</Text>
      <Picker
        selectedValue={prefs.radius}
        onValueChange={(value) => setPrefs({ ...prefs, radius: value })}
        style={{ backgroundColor: Colors[colorScheme].inputBackground, borderRadius: 12 }}
      >
        <Picker.Item label="5 km" value={5} />
        <Picker.Item label="10 km" value={10} />
        <Picker.Item label="20 km" value={20} />
        <Picker.Item label="50 km" value={50} />
      </Picker>

      <Text>Dating goal</Text>
      <Picker
        selectedValue={prefs.goal}
        onValueChange={(value) => setPrefs({ ...prefs, goal: value })}
        style={{ backgroundColor: Colors[colorScheme].inputBackground, borderRadius: 12 }}
      >
        <Picker.Item label="Serious relationship" value="serious" />
        <Picker.Item label="Casual dating" value="casual" />
        <Picker.Item label="Friendship" value="friendship" />
      </Picker>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text>Notifications</Text>
        <Switch
          value={prefs.notifications}
          onValueChange={(value) => setPrefs({ ...prefs, notifications: value })}
        />
      </View>

      <Button
        title="Save"
        onPress={async () => {
          await savePreferences(prefs);
        }}
      />
      <Button
        title="Reset"
        onPress={async () => {
          const defaults = await resetPreferences();
          setPrefs(defaults);
        }}
      />
    </View>
  );
}
