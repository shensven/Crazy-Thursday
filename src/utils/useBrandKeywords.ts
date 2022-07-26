import {useAtom} from 'jotai';
import {atomWithStorageBrandKeywords} from '../atoms/appAtom';

const useBrandKeywords = () => {
  const [brandKeywords, setBrandKeywords] = useAtom(atomWithStorageBrandKeywords);
  return {brandKeywords, setBrandKeywords};
};

export default useBrandKeywords;
