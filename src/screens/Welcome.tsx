import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Image, Platform, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button, Text, useTheme} from 'react-native-paper';
import PagerView from 'react-native-pager-view';
import color from 'color';
import useWelcome from '../utils/useWelcome';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const Welcome: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {colors} = useTheme();

  const {trueWelcome} = useWelcome();

  const pageRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (currentIndex === 0) {
      pageRef.current?.setPage(1);
    } else {
      navigation.goBack();
      trueWelcome();
    }
  };

  useEffect(() => {
    navigation.setOptions({});
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <PagerView
        ref={pageRef}
        initialPage={0}
        style={{height: screenHeight / 2, marginTop: screenHeight / 8}}
        onPageSelected={evt => setCurrentIndex(evt.nativeEvent.position)}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={{fontSize: 32, fontWeight: 'bold'}}>疯狂星期四 🎉</Text>
          <Text style={{fontSize: 15, lineHeight: 15 * 1.7, marginTop: 20, marginHorizontal: 2, textAlign: 'justify'}}>
            是一个由社区驱动的 App，所有的数据托管在 GitHub 平台，唯一的网络请求活动仅用于更新文案数据库。
          </Text>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={{fontSize: 32, fontWeight: 'bold'}}>让我们开始吧！</Text>
          <Text style={{fontSize: 15, lineHeight: 15 * 1.7, marginTop: 20, marginHorizontal: 2, textAlign: 'justify'}}>
            你还可随时前往【设置】页面
          </Text>
          <Text style={{fontSize: 15, lineHeight: 15 * 1.7, marginHorizontal: 2, textAlign: 'justify'}}>
            轻点【更新文案数据库】以手动获取最新文案集
          </Text>
          {Platform.OS === 'ios' && (
            <Image
              source={require('./assets/guide/guide-ios.png')}
              style={{width: screenWidth - 32, height: (screenWidth - 32) * 0.75, marginTop: 8}}
            />
          )}
          {Platform.OS === 'android' && (
            <Image
              source={require('./assets/guide/guide-android.png')}
              style={{width: screenWidth - 32, height: (screenWidth - 32) * 0.75, marginTop: 8}}
            />
          )}
        </View>
      </PagerView>
      <View style={{marginHorizontal: 16, marginTop: 16, marginBottom: screenHeight / 16 + insets.bottom}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: 16,
              height: 4,
              backgroundColor: currentIndex === 0 ? colors.primary : color(colors.onBackground).alpha(0.12).toString(),
              borderRadius: 2,
              marginHorizontal: 4,
            }}
          />
          <View
            style={{
              width: 16,
              height: 4,
              backgroundColor: currentIndex === 1 ? colors.primary : color(colors.onBackground).alpha(0.12).toString(),
              borderRadius: 2,
              marginHorizontal: 4,
            }}
          />
        </View>
        <Button
          mode="contained"
          labelStyle={{fontSize: 15, fontWeight: 'bold', lineHeight: 32}}
          style={{marginTop: 16}}
          onPress={() => next()}>
          {currentIndex === 0 ? '下一步' : '好'}
        </Button>
      </View>
    </View>
  );
};

export default Welcome;
