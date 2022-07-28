import {atom} from 'jotai';
import {storage} from '../../App';

export const atomStatusBarStyle = atom<'dark-content' | 'light-content'>('dark-content');
export const atomHasToast = atom<boolean>(false);

export interface BrandKeywords {
  Chinese: string;
  English: string;
}
export interface Copywriter {
  version: number;
  bundle: {text: string}[];
}

const mmkvBrandKeywords = storage.getString('@brandKeywords');
const mmkvCopywriter = storage.getString('@copywriter');

let initBrandKeywords: BrandKeywords | undefined;
if (mmkvBrandKeywords) {
  initBrandKeywords = JSON.parse(mmkvBrandKeywords);
} else {
  initBrandKeywords = {Chinese: '小申的店', English: 'SvenFE'};
}
export const atomBrandKeywords = atom<BrandKeywords>(initBrandKeywords!);

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
