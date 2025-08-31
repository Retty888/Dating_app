const tintColorLight = '#FFC0CB';
const tintColorDark = '#FFB6C1';
const dangerColorLight = '#FF8FA3';
const dangerColorDark = '#FF748C';
const sidebarLight = '#F2F2F7';
const sidebarDark = '#202123';
const sidebarActiveLight = '#E5E5EA';
const sidebarActiveDark = '#343541';
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
    sidebar: sidebarLight,
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
    sidebar: sidebarDark,
    sidebarActive: sidebarActiveDark,
    inputBackground: inputBackgroundDark,
  },
};
