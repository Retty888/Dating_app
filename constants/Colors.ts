const tintColorLight = '#FFC0CB';
const tintColorDark = '#FFB6C1';
const dangerColorLight = '#FF8FA3';
const dangerColorDark = '#FF748C';
const sidebarBackgroundLight = '#FFF5F7';
const sidebarBackgroundDark = '#2B1C23';
const sidebarActiveLight = tintColorLight;
const sidebarActiveDark = tintColorDark;
const inputBackgroundLight = '#F0F0F0';
const inputBackgroundDark = '#111';
const mutedColor = '#888';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    primary: tintColorLight,
    danger: dangerColorLight,
    muted: mutedColor,
    sidebarBackground: sidebarBackgroundLight,
    sidebarActive: sidebarActiveLight,
    inputBackground: inputBackgroundLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    primary: tintColorDark,
    danger: dangerColorDark,
    muted: mutedColor,
    sidebarBackground: sidebarBackgroundDark,
    sidebarActive: sidebarActiveDark,
    inputBackground: inputBackgroundDark,
  },
};
