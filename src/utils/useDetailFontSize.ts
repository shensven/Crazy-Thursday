import {useAtom} from 'jotai';
import {atomDetailFontSize} from '../atoms/appAtom';

const useDetailFontSize = () => {
  const [detailFontSize, setDetailFontSize] = useAtom(atomDetailFontSize);

  const updateDetailFontSize = (_detailFontSize: number) => {
    setDetailFontSize(_detailFontSize);
  };

  return {detailFontSize, updateDetailFontSize};
};

export default useDetailFontSize;
