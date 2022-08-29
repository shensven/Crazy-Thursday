import {useAtom} from 'jotai';
import {atomBrandKeywords} from '../atoms/appAtom';
import type {BrandKeywords} from '../atoms/appAtom';

const useBrandKeywords = () => {
  const [brandKeywords, setBrandKeywords] = useAtom(atomBrandKeywords);

  const updateBrandKeywords = (props: BrandKeywords) => {
    setBrandKeywords(props);
    return Promise.resolve();
  };

  return {brandKeywords, updateBrandKeywords};
};

export default useBrandKeywords;
