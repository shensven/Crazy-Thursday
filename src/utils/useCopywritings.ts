import axios from 'axios';
import {useAtom} from 'jotai';
import {atomCopywritings} from '../atoms/appAtom';
import type {Copywriter} from '../atoms/appAtom';
import {storage} from '../../App';

const useCopywritings = () => {
  const [copywritings, setCopywritings] = useAtom(atomCopywritings);

  const updateCopywritings = async () => {
    try {
      const resp = await axios.get<Copywriter>('https://crazy-thursday.shensven.com/latest.json', {
        params: {
          timestamp: Date.now().toString(),
        },
      });
      if (resp.status === 200) {
        if (resp.data.version > copywritings.version) {
          setCopywritings(resp.data);
          storage.set('@copywriter', JSON.stringify(resp.data));
        }
      }
    } catch {}
  };

  return {copywritings, updateCopywritings};
};

export default useCopywritings;
