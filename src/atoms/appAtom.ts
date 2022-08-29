import {atom} from 'jotai';
import DeviceInfo from 'react-native-device-info';
// import {mmkvWelcome, mmkvAppearance, mmkvBrandKeywords, mmkvCopywritings, mmkvDetailFontSize} from '../../App';
import {storage} from '../mmkv/mmkv';

export type StatusBarStyle = 'light-content' | 'dark-content';
export const atomStatusBarStyle = atom<StatusBarStyle>('dark-content');

export type HeaderBlurType = 'light' | 'dark';
export const atomHeaderBlurType = atom<HeaderBlurType>('light');

export const atomHasToast = atom<boolean>(false);
export const atomToastMsg = atom<string>('');

// 'Handset' | 'Tablet' | 'Tv' | 'Desktop' | 'GamingConsole' | 'unknown'
export const atomDeviceType = atom(DeviceInfo.getDeviceType());

// -----------------------------------------------------------------------------

const mmkvWelcome = storage.getString('@welcome');
const atomInitWelcome = atom<boolean>(mmkvWelcome === undefined ? false : (JSON.parse(mmkvWelcome) as boolean));
export const atomWelcome = atom(
  get => get(atomInitWelcome),
  (_get, set, newBool: boolean) => {
    set(atomInitWelcome, newBool);
    storage.set('@welcome', JSON.stringify(newBool));
  },
);

// -----------------------------------------------------------------------------

const mmkvDetailFontSize = storage.getString('@detailFontSize');
const atomInitDetailFontSize = atom<number>(
  mmkvDetailFontSize === undefined ? 18 : (JSON.parse(mmkvDetailFontSize) as number),
);
export const atomDetailFontSize = atom(
  get => get(atomInitDetailFontSize),
  (_get, set, newNum: number) => {
    set(atomInitDetailFontSize, newNum);
    storage.set('@detailFontSize', JSON.stringify(newNum));
  },
);

// -----------------------------------------------------------------------------

export type Appearance = 'light' | 'dark' | 'followSystem';

const mmkvAppearance = storage.getString('@appearance');
const atomInitAppearance = atom<Appearance>(
  mmkvAppearance === undefined ? 'followSystem' : (JSON.parse(mmkvAppearance) as Appearance),
);
export const atomAppearance = atom(
  get => get(atomInitAppearance),
  (_get, set, newAppearance: Appearance) => {
    set(atomInitAppearance, newAppearance);
    storage.set('@appearance', JSON.stringify(newAppearance));
  },
);

// -----------------------------------------------------------------------------

export interface BrandKeywords {
  Chinese: string;
  English: string;
}
const mmkvBrandKeywords = storage.getString('@brandKeywords');
const atomInitBrandKeywords = atom<BrandKeywords>(
  mmkvBrandKeywords === undefined
    ? {Chinese: '小申的店', English: 'SvenFE'}
    : (JSON.parse(mmkvBrandKeywords) as BrandKeywords),
);
export const atomBrandKeywords = atom(
  get => get(atomInitBrandKeywords),
  (_get, set, newBrandKeywords: BrandKeywords) => {
    set(atomInitBrandKeywords, newBrandKeywords);
    storage.set('@brandKeywords', JSON.stringify(newBrandKeywords));
  },
);

// -----------------------------------------------------------------------------

export interface Copywriter {
  version: number;
  bundle: {text: string}[];
}
const mmkvCopywritings = storage.getString('@copywritings');
const atomInitCopywritings = atom<Copywriter>(
  mmkvCopywritings === undefined
    ? {
        version: 2022000000,
        bundle: [
          {text: '我开始留短发、减肥、换风格、开始往前冲，不好意思啊，这一次，${brand-zh-CN}疯狂星期四，我一定要吃。'},
        ],
      }
    : (JSON.parse(mmkvCopywritings) as Copywriter),
);
export const atomCopywritings = atom(
  get => get(atomInitCopywritings),
  (_get, set, newCopywriter: Copywriter) => {
    set(atomInitCopywritings, newCopywriter);
    storage.set('@copywritings', JSON.stringify(newCopywriter));
  },
);
