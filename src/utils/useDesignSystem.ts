import {useColorScheme} from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {atomAppearance, atomStatusBarStyle} from '../atoms/appAtom';
import type {Appearance} from '../atoms/appAtom';
import {storage} from '../../App';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      onPrimary: string;
      secondary: string;
      tertiary: string;
      onSecondary: string;
      onBackground: string;
      surfaceVariant: string;
      onSurfaceVariant: string;
    }
  }
}

const paperLightTheme = {
  ...PaperDefaultTheme,
  roundness: 12,
  version: 2,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#E1352F',
    onPrimary: '#ffffff',
    secondary: '#775652',
    onSecondary: '#ffffff',
    tertiary: '#715b2e',
    background: '#fffbff',
    onBackground: '#201a19',
    surface: '#fffbff',
    onSurferface: '#201a19',
    surfaceVariant: '#f5ddda',
    onSurfaceVariant: '#534341',
  },
};

const paperDarkTheme = {
  ...PaperDarkTheme,
  roundness: 12,
  version: 2,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#ffb4ab',
    onPrimary: '#690005',
    secondary: '#e7bdb8',
    onSecondary: '#442926',
    tertiary: '#e0c38c',
    background: '#201a19',
    onBackground: '#ede0de',
    surface: '#201a19',
    onSurferface: '#ede0de',
    surfaceVariant: '#534341',
    onSurfaceVariant: '#d8c2bf',
  },
};

const navigationLightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
  },
};

const navigationDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
  },
};

const useDesignSystem = () => {
  const scheme = useColorScheme();
  const [, setStatusBarStyle] = useAtom(atomStatusBarStyle);
  const [appearance, setAppearance] = useAtom(atomAppearance);

  const getStatusBarStyle = () => {
    if (appearance === 'light') {
      return 'dark-content';
    } else if (appearance === 'dark') {
      return 'light-content';
    } else {
      return scheme === 'dark' ? 'light-content' : 'dark-content';
    }
  };

  const getPaperAppearance = () => {
    if (appearance === 'light') {
      return paperLightTheme;
    } else if (appearance === 'dark') {
      return paperDarkTheme;
    } else {
      return scheme === 'dark' ? paperDarkTheme : paperLightTheme;
    }
  };

  const getNavigationAppearance = () => {
    if (appearance === 'light') {
      return navigationLightTheme;
    } else if (appearance === 'dark') {
      return navigationDarkTheme;
    } else {
      return scheme === 'dark' ? navigationDarkTheme : navigationLightTheme;
    }
  };

  const updateAppearance = (prop: Appearance) => {
    setStatusBarStyle(() => {
      if (appearance === 'light') {
        return 'dark-content';
      } else if (appearance === 'dark') {
        return 'light-content';
      } else {
        return scheme === 'dark' ? 'light-content' : 'dark-content';
      }
    });
    setAppearance(prop);
    storage.set('@appearance', JSON.stringify(prop));
  };

  return {appearance, updateAppearance, getPaperAppearance, getNavigationAppearance, getStatusBarStyle};
};

export default useDesignSystem;
