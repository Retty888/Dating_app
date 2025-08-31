const tintColorLight = '#FFB3C6';
const tintColorDark = '#FF8DAA';
const dangerColorLight = '#FF9AA2';
const dangerColorDark = '#FF8090';
const sidebarBackgroundLight = '#FFF5F7';
const sidebarBackgroundDark = '#2B1C23';
const sidebarActiveLight = tintColorLight;
const sidebarActiveDark = tintColorDark;
const inputBackgroundLight = '#FDE4EC';
const inputBackgroundDark = '#4A2C3A';
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
