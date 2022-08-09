import React from 'react';
import {Dimensions} from 'react-native';
import {Text} from 'react-native-paper';
import {useAtom} from 'jotai';
import BlurScrollView from './components/BlurScrollView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {atomDeviceType} from '../atoms/appAtom';

const PrivacyPolicy: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();

  const [deviceType] = useAtom(atomDeviceType);

  return (
    <BlurScrollView>
      <Text
        style={{
          paddingVertical: 16,
          paddingHorizontal: deviceType === 'Tablet' ? windowWidth / 6 : 16,
          marginBottom: 16 + insets.bottom,
          lineHeight: 14 * 1.7,
        }}>
        疯狂星期四（下称我们）十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，唯一的网络请求活动仅用于更新文案集。
      </Text>
    </BlurScrollView>
  );
};

export default PrivacyPolicy;
