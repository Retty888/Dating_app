import { Pressable, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { Text, View } from './Themed';

const items = [
  { href: '/', label: 'Discover' },
  { href: '/matches', label: 'Matches' },
  { href: '/inbox', label: 'Chats' },
  { href: '/profile', label: 'Profile' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].sidebarBackground }]}> 
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} asChild>
            <Pressable
              style={[styles.item, active && { backgroundColor: Colors[colorScheme].sidebarActive }]}
            >
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
    paddingTop: 24,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
  },
});
