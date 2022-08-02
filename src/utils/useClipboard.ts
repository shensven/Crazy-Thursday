import Clipboard from '@react-native-clipboard/clipboard';
import useToast from './useToast';

const useClipboard = () => {
  const {showToast} = useToast();

  const copyToClipboard = (copywriter: string) => {
    Clipboard.setString(copywriter);
    showToast('已拷贝至剪贴板');
  };

  return {copyToClipboard};
};

export default useClipboard;
