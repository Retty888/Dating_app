import { useState } from 'react';
import { Switch } from 'react-native';
import { Text, View } from '@/components/Themed';
import ChatSection from '@/components/ChatSection';
import settingsAgent from '@/lib/settingsAgent';

export default function SettingsChat() {
  const [notifications, setNotifications] = useState(true);

  const agent = async (msg: string) => {
    const res = await settingsAgent(msg, { notifications });
    if (typeof res.state?.notifications === 'boolean') {
      setNotifications(res.state.notifications);
    }
    return res;
  };

  return (
    <ChatSection
      section="settings"
      agent={agent}
      extra={
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 8 }}>
          <Text style={{ marginRight: 8 }}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
      }
    />
  );
}
