import axios from 'axios';
import {useAtom} from 'jotai';
import {atomCopywriter} from '../atoms/appAtom';
import type {Copywriter} from '../atoms/appAtom';
import {storage} from '../../App';

const useCopywriter = () => {
  const [copywriter, setCopywriter] = useAtom(atomCopywriter);

  const updateCopywriter = async () => {
    try {
      const resp = await axios.get<Copywriter>('https://crazy-thursday.shensven.com/latest.json', {
        params: {
          timestamp: Date.now().toString(),
        },
      });
      if (resp.status === 200) {
        if (resp.data.version > copywriter.version) {
          setCopywriter(resp.data);
          storage.set('@copywriter', JSON.stringify(resp.data));
        }
      }
    } catch {}
  };

  return {copywriter, updateCopywriter};
};

export default useCopywriter;
