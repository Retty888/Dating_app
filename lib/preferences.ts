import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Preferences {
  radius: number;
  goal: string;
  notifications: boolean;
}

const DEFAULT_PREFERENCES: Preferences = {
  radius: 10,
  goal: 'serious',
  notifications: true,
};

const STORAGE_KEY = 'preferences';

export async function loadPreferences(): Promise<Preferences> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load preferences', e);
  }
  return DEFAULT_PREFERENCES;
}

export async function savePreferences(prefs: Preferences): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Failed to save preferences', e);
  }
}

export async function resetPreferences(): Promise<Preferences> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset preferences', e);
  }
  return DEFAULT_PREFERENCES;
}
