import {atom} from 'jotai';
import {mmkvWelcome, mmkvAppearance, mmkvBrandKeywords, mmkvCopywritings, mmkvDetailFontSize} from '../../App';

export type StatusBarStyle = 'light-content' | 'dark-content';
export const atomStatusBarStyle = atom<StatusBarStyle>('dark-content');

export type HeaderBlurType = 'light' | 'dark';
export const atomHeaderBlurType = atom<HeaderBlurType>('light');

export const atomHasToast = atom<boolean>(false);
export const atomToastMsg = atom<string>('');

// -----------------------------------------------------------------------------

let initWelcome: boolean | undefined;
if (mmkvWelcome) {
  initWelcome = JSON.parse(mmkvWelcome);
} else {
  initWelcome = false;
}
export const atomWelcome = atom<boolean>(initWelcome!);

// -----------------------------------------------------------------------------

let initDetailFontSize: number | undefined;
if (mmkvDetailFontSize) {
  initDetailFontSize = JSON.parse(mmkvDetailFontSize);
} else {
  initDetailFontSize = 18;
}
export const atomDetailFontSize = atom<number>(initDetailFontSize!);

// -----------------------------------------------------------------------------

export type Appearance = 'light' | 'dark' | 'followSystem';

let initAppearance: Appearance | undefined;
if (mmkvAppearance) {
  initAppearance = JSON.parse(mmkvAppearance);
} else {
  initAppearance = 'followSystem';
}
export const atomAppearance = atom<Appearance>(initAppearance!);

// -----------------------------------------------------------------------------

export interface BrandKeywords {
  Chinese: string;
  English: string;
}
let initBrandKeywords: BrandKeywords | undefined;
if (mmkvBrandKeywords) {
  initBrandKeywords = JSON.parse(mmkvBrandKeywords);
} else {
  initBrandKeywords = {Chinese: '小申的店', English: 'SvenFE'};
}
export const atomBrandKeywords = atom<BrandKeywords>(initBrandKeywords!);

// -----------------------------------------------------------------------------

export interface Copywriter {
  version: number;
  bundle: {text: string}[];
}
let initCopywritings: Copywriter | undefined;
if (mmkvCopywritings) {
  initCopywritings = JSON.parse(mmkvCopywritings);
} else {
  initCopywritings = {
    version: 2022000000,
    bundle: [
      {text: '我开始留短发、减肥、换风格、开始往前冲，不好意思啊，这一次，${brand-zh-CN}疯狂星期四，我一定要吃。'},
    ],
  };
}
export const atomCopywritings = atom<Copywriter>(initCopywritings!);
