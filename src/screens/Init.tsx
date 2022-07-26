import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useBrandKeywords from '../utils/useBrandKeywords';
import useCopywriter from '../utils/useCopywriter';

type StackParamList = {
  Home: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Init: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {setBrandKeywords} = useBrandKeywords();
  const {setCopywriter} = useCopywriter();

  useEffect(() => {
    AsyncStorage.multiGet(['@brandKeywords', '@copywriter'])
      .then(resp => {
        if (resp[0][1]) {
          setBrandKeywords(JSON.parse(resp[0][1]));
        } else {
          setBrandKeywords({Chinese: '小申的店', English: 'SvenFE'});
        }
        if (resp[1][1]) {
          setCopywriter(JSON.parse(resp[1][1]));
        } else {
          setCopywriter({
            version: 2022000000,
            bundle: [
              {
                text: '我开始留头发，减重，换风格，开始往前冲，不好意思阿，这一次，${brand-zh-CN}疯狂星期四，我一定要吃。',
              },
            ],
          });
        }
      })
      .finally(() => {
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      });
  }, []);

  return <View />;
};

export default Init;
