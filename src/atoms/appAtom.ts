import {atom} from 'jotai';
import {mmkvAppearance, mmkvBrandKeywords, mmkvCopywriter} from '../../App';

export const atomStatusBarStyle = atom<'dark-content' | 'light-content'>('dark-content');
export const atomHasToast = atom<boolean>(false);

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
let initCopywriter: Copywriter | undefined;
if (mmkvCopywriter) {
  initCopywriter = JSON.parse(mmkvCopywriter);
} else {
  initCopywriter = {
    version: 2022000000,
    bundle: [
      {text: '我开始留短发、减肥、换风格、开始往前冲，不好意思啊，这一次，${brand-zh-CN}疯狂星期四，我一定要吃。'},
    ],
  };
}
export const atomCopywriter = atom<Copywriter>(initCopywriter!);
