import { View, Text, Pressable, StyleSheet } from 'react-native';
import { usePathname, useRouter } from 'expo-router';

const items = [
  { href: '/', label: 'Discover' },
  { href: '/matches', label: 'Matches' },
  { href: '/inbox', label: 'Chats' },
  { href: '/profile', label: 'Profile' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Pressable
            key={item.href}
            onPress={() => router.push(item.href)}
            style={[styles.item, active && styles.activeItem]}
          >
            <Text style={styles.itemText}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#202123',
    paddingTop: 24,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  activeItem: {
    backgroundColor: '#343541',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});
