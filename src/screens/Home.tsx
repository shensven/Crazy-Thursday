import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Image, RefreshControl, useWindowDimensions, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {type GestureEvent, ScrollView, TapGestureHandler} from 'react-native-gesture-handler';
import {Button, Text} from 'react-native-paper';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {random} from 'lodash';
import mockWait from '../utils/mockWait';
import useCopywriter from '../utils/useCopywriter';
import useBrandKeywords from '../utils/useBrandKeywords';
import useClipboard from '../utils/useClipboard';

export const imageSets = [
  require('./assets/images/0.jpg'),
  require('./assets/images/1.jpg'),
  require('./assets/images/2.jpg'),
  require('./assets/images/3.jpg'),
  require('./assets/images/4.jpg'),
  require('./assets/images/5.jpg'),
  require('./assets/images/6.jpg'),
  require('./assets/images/7.jpg'),
  require('./assets/images/8.jpg'),
  require('./assets/images/9.jpg'),
];

export interface MainIndex {
  image: number;
  text: number;
}

type StackParamList = {
  Detail: {
    mainIndex: MainIndex;
    currentCopywriter: string;
  };
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Home: React.FC = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<ScreenNavigationProp>();

  const pressed = useSharedValue(false);

  const {brandKeywords} = useBrandKeywords();
  const {copywriter, updateCopywriter} = useCopywriter();

  const {copyToClipboard} = useClipboard();

  const [mainIndex, setMainIndex] = useState<MainIndex>({
    image: 0,
    text: 0,
  });
  const [currentCopywriter, setCurrentCopywriter] = useState('');

  const uas = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(pressed.value ? 0.95 : 1, {
            overshootClamping: true,
            stiffness: 300,
          }),
        },
      ],
    };
  });

  const eventHandler = useAnimatedGestureHandler<GestureEvent>({
    onStart: () => (pressed.value = true),
    onEnd: () => (pressed.value = false),
    onFail: () => (pressed.value = false),
    onFinish: () => (pressed.value = false),
  });

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    mockWait(random(30, 200)).then(() => {
      setRefreshing(false);
      setMainIndex({
        image: random(0, 9),
        text: random(0, copywriter.bundle.length - 1),
      });
      pressed.value = false;
    });
  }, [copywriter.version]);

  const onFailed = useCallback(() => {
    pressed.value = false;
  }, [copywriter.version]);

  useEffect(() => {
    if (copywriter.bundle.length === 1) {
      setCurrentCopywriter(
        copywriter.bundle[0].text
          .replace('${brand-zh-CN}', brandKeywords.Chinese)
          .replace('${brand-en-US}', brandKeywords.English),
      );
    } else {
      setCurrentCopywriter(
        copywriter.bundle[mainIndex.text].text
          .replace('${brand-zh-CN}', brandKeywords.Chinese)
          .replace('${brand-en-US}', brandKeywords.English),
      );
    }
  }, [mainIndex.text]);

  useLayoutEffect(() => {
    setMainIndex({
      image: random(0, 9),
      text: random(0, copywriter.bundle.length - 1),
    });
    updateCopywriter();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <TapGestureHandler
          onGestureEvent={eventHandler}
          onActivated={() => navigation.navigate('Detail', {mainIndex, currentCopywriter})}
          onFailed={() => onFailed()}>
          <Animated.View style={[{margin: 16}, uas]}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: windowHeight / 2,
                borderRadius: 12,
                backgroundColor: '#E1352F',
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 4},
                shadowRadius: 8,
                elevation: 8,
              }}>
              <MaskedView
                maskElement={
                  <LinearGradient colors={['#fff', 'transparent']} locations={[0.45, 1]} style={{flex: 1}} />
                }
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={imageSets[mainIndex.image]}
                  style={{width: windowWidth - 32 - 12, height: windowHeight / 2 - 12, borderRadius: 8}}
                />
              </MaskedView>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                  position: 'absolute',
                  top: 20,
                  left: 12,
                  paddingVertical: 4,
                  paddingLeft: 8,
                  paddingRight: 4,
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  overflow: 'hidden',
                }}>
                现已推出 🌟
              </Text>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  marginHorizontal: 16,
                  marginBottom: 12,
                }}>
                <Text
                  numberOfLines={5}
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    lineHeight: 18 * 1.7,
                    textAlign: 'justify',
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowOffset: {width: 0, height: 0},
                    shadowRadius: 6,
                    elevation: 4,
                  }}>
                  {currentCopywriter}
                </Text>
                <View style={{height: 1, backgroundColor: 'rgba(255,255,255,0.7)', marginTop: 16}} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                  <Text style={{fontSize: 12, color: 'rgba(255,255,255,0.7)'}}>仅供娱乐</Text>
                  <Text style={{fontSize: 12, color: 'rgba(255,255,255,0.7)'}}>轻点以查看详情</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </TapGestureHandler>
      </ScrollView>
      <Button
        theme={{
          roundness: 12,
          colors: {primary: '#E1352F'},
        }}
        mode="contained"
        style={{marginHorizontal: 16, marginTop: 16, marginBottom: 32 + insets.bottom}}
        labelStyle={{fontSize: 15, lineHeight: 32}}
        onPress={() => copyToClipboard(currentCopywriter)}>
        拷贝文案
      </Button>
    </View>
  );
};

export default Home;
