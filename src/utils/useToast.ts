import {useEffect} from 'react';
import {Platform, ToastAndroid} from 'react-native';
import {useAtom} from 'jotai';
import {atomHasToast, atomToastMsg} from '../atoms/appAtom';

const useToast = () => {
  const [hasToast, setHasToast] = useAtom(atomHasToast);
  const [, setToastMsg] = useAtom(atomToastMsg);

  const showToast = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
    if (Platform.OS === 'ios') {
      setHasToast(true);
      setToastMsg(msg);
    }
  };

  useEffect(() => {
    const delay = 1600;
    const timer1 = setInterval(() => {
      setHasToast(false);
    }, delay);
    const timer2 = setInterval(() => {
      setToastMsg('');
    }, delay + 210);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, [hasToast]);

  return {showToast};
};

export default useToast;
