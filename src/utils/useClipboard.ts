import {Platform, ToastAndroid} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAtom} from 'jotai';
import {atomHasToast} from '../atoms/appAtom';
import {useEffect} from 'react';

const useClipboard = () => {
  const [hasToast, setHasToast] = useAtom(atomHasToast);

  const copyToClipboard = (copywriter: string) => {
    Clipboard.setString(copywriter);
    if (Platform.OS === 'android') {
      ToastAndroid.show('已拷贝到剪贴板', ToastAndroid.SHORT);
    }
    if (Platform.OS === 'ios') {
      setHasToast(true);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setHasToast(false);
    }, 1600);
    return () => clearInterval(timer);
  }, [hasToast]);

  return {copyToClipboard};
};

export default useClipboard;
