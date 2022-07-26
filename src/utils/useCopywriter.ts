import axios from 'axios';
import {useAtom} from 'jotai';
import {atomWithStorageCopywriter, type Copywriter} from '../atoms/appAtom';

const useCopywriter = () => {
  const [copywriter, setCopywriter] = useAtom(atomWithStorageCopywriter);

  const updateCopywriter = async () => {
    try {
      const resp = await axios.get<Copywriter>('https://crazy-thursday.shensven.com/latest.json');
      if (resp.status === 200) {
        if (resp.data.version > copywriter.version) {
          setCopywriter(resp.data);
        }
      }
    } catch {}
  };

  return {copywriter, setCopywriter, updateCopywriter};
};

export default useCopywriter;
