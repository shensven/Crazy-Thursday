import {atom} from 'jotai';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const atomStatusBarStyle = atom<'dark-content' | 'light-content'>('dark-content');

export const atomHasToast = atom<boolean>(false);

export interface BrandKeywords {
  Chinese: string;
  English: string;
}

export const atomWithStorageBrandKeywords = atomWithStorage<BrandKeywords>(
  '@brandKeywords',
  {
    Chinese: '',
    English: '',
  },
  {
    ...createJSONStorage(() => AsyncStorage),
    delayInit: true,
  },
);

export interface Copywriter {
  version: number;
  bundle: {text: string}[];
}

export const atomWithStorageCopywriter = atomWithStorage<Copywriter>(
  '@copywriter',
  {
    version: 2022000000,
    bundle: [],
  },
  {
    ...createJSONStorage(() => AsyncStorage),
    delayInit: true,
  },
);
