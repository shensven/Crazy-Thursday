import {useColorScheme} from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';
import {DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme} from '@react-navigation/native';
import {useAtom} from 'jotai';
import {atomAppearance, atomStatusBarStyle, StatusBarStyle} from '../atoms/appAtom';
import type {Appearance} from '../atoms/appAtom';
import {storage} from '../../App';
import {useEffect} from 'react';

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
  const colorScheme = useColorScheme();
  const [statusBarStyle, setStatusBarStyle] = useAtom(atomStatusBarStyle);
  const [appearance, setAppearance] = useAtom(atomAppearance);

  const updateStatusBarStyle = (_statusBarStyle?: StatusBarStyle) => {
    if (_statusBarStyle && ['light-content', 'dark-content'].includes(_statusBarStyle)) {
      return setStatusBarStyle(_statusBarStyle);
    } else {
      if (appearance === 'light') {
        setStatusBarStyle('dark-content');
      } else if (appearance === 'dark') {
        setStatusBarStyle('light-content');
      } else {
        return colorScheme === 'dark' ? setStatusBarStyle('light-content') : setStatusBarStyle('dark-content');
      }
    }
  };

  const updateAppearance = (_appearance: Appearance) => {
    if (_appearance === 'light') {
      setStatusBarStyle('dark-content');
    } else if (_appearance === 'dark') {
      setStatusBarStyle('light-content');
    } else {
      setStatusBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content');
    }
    setAppearance(_appearance);
    storage.set('@appearance', JSON.stringify(_appearance));
  };

  const getPaperAppearance = () => {
    if (appearance === 'light') {
      return paperLightTheme;
    } else if (appearance === 'dark') {
      return paperDarkTheme;
    } else {
      return colorScheme === 'dark' ? paperDarkTheme : paperLightTheme;
    }
  };

  const getNavigationAppearance = () => {
    if (appearance === 'light') {
      return navigationLightTheme;
    } else if (appearance === 'dark') {
      return navigationDarkTheme;
    } else {
      return colorScheme === 'dark' ? navigationDarkTheme : navigationLightTheme;
    }
  };

  useEffect(() => {
    updateStatusBarStyle();
  }, [colorScheme]);

  return {
    statusBarStyle,
    appearance,
    getPaperAppearance,
    getNavigationAppearance,
    updateAppearance,
    updateStatusBarStyle,
  };
};

export default useDesignSystem;
