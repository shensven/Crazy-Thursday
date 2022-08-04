import React from 'react';
import {Text} from 'react-native-paper';
import BlurScrollView from './components/BlurScrollView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const PrivacyPolicy: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <BlurScrollView>
      <Text
        style={{
          padding: 16,
          marginBottom: 16 + insets.bottom,
          lineHeight: 14 * 1.7,
        }}>
        疯狂星期四（下称我们）十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，唯一的网络请求活动仅用于更新文案数据库。
      </Text>
    </BlurScrollView>
  );
};

export default PrivacyPolicy;
