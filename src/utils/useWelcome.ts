import {useAtom} from 'jotai';
import {atomWelcome} from '../atoms/appAtom';

const useWelcome = () => {
  const [welcome, setWelcome] = useAtom(atomWelcome);

  const trueWelcome = () => {
    setWelcome(true);
  };

  return {welcome, trueWelcome};
};

export default useWelcome;
