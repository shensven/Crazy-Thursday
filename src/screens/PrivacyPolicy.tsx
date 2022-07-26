import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

const PrivacyPolicy: React.FC = () => {
  return (
    <ScrollView>
      <Text style={{padding: 16, backgroundColor: '#fff', lineHeight: 14 * 1.5}}>
        疯狂星期四（下称我们）十分尊重您的隐私，无论您身处何方，居于何处，是何国籍，我们承诺不会采集和上传您的任何数据，唯一的网络请求活动仅用于更新文案数据库。
      </Text>
    </ScrollView>
  );
};

export default PrivacyPolicy;
