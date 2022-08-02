import {useAtom} from 'jotai';
import {storage} from '../../App';
import {atomDetailFontSize} from '../atoms/appAtom';

const useDetailFontSize = () => {
  const [detailFontSize, setDetailFontSize] = useAtom(atomDetailFontSize);

  const updateDetailFontSize = (_detailFontSize: number) => {
    setDetailFontSize(_detailFontSize);
    storage.set('@detailFontSize', JSON.stringify(_detailFontSize));
  };

  return {detailFontSize, updateDetailFontSize};
};

export default useDetailFontSize;
