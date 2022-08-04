import {useAtom} from 'jotai';
import {atomWelcome} from '../atoms/appAtom';
import {storage} from '../../App';

const useWelcome = () => {
  const [welcome, setWelcome] = useAtom(atomWelcome);

  const trueWelcome = () => {
    setWelcome(true);
    storage.set('@welcome', JSON.stringify(true));
  };

  return {welcome, trueWelcome};
};

export default useWelcome;
