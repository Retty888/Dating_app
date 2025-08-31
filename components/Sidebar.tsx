import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';

const items = [
  { href: '/', label: 'Discover' },
  { href: '/matches', label: 'Matches' },
  { href: '/inbox', label: 'Chats' },
  { href: '/profile', label: 'Profile' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} asChild>
            <Pressable style={[styles.item, active && styles.activeItem]}>
              <Text style={styles.itemText}>{item.label}</Text>
            </Pressable>
          </Link>
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
