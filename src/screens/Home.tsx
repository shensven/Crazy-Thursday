import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions, Image, Platform, View} from 'react-native';
import {Button, Text, TouchableRipple, useTheme} from 'react-native-paper';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BlurView} from '@react-native-community/blur';
import {useUpdateEffect} from 'ahooks';
import {random} from 'lodash';
import color from 'color';
import {useAtom} from 'jotai';
import useWelcome from '../utils/useWelcome';
import useCopywritings from '../utils/useCopywritings';
import useBrandKeywords from '../utils/useBrandKeywords';
import useClipboard from '../utils/useClipboard';
import useColorSystem from '../utils/useColorSystem';
import BlurScrollView from './components/BlurScrollView';
import {atomDeviceType} from '../atoms/appAtom';

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

export interface Index {
  image: number;
  text: number;
}

type StackParamList = {
  Welcome: undefined;
  Detail: {
    index: Index;
    currentCopywriterWithBrand: string;
  };
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Home: React.FC = () => {
  const windowWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('screen').height;

  const insets = useSafeAreaInsets();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {colors} = useTheme();
  const {headerBlurType} = useColorSystem();

  const {welcome} = useWelcome();
  const {copyToClipboard} = useClipboard();

  const {copywritings, updateCopywritings} = useCopywritings();
  const {brandKeywords} = useBrandKeywords();

  const [deviceType] = useAtom(atomDeviceType);

  const [index, setIndex] = useState<Index>({
    image: random(0, 9),
    text: copywritings.bundle.length > 1 ? random(0, copywritings.bundle.length - 1) : 0,
  });

  const [currentCopywriter, setCurrentCopywriter] = useState({
    origin: '',
    withBrand: '',
  });

  const refresh = () => {
    setIndex({
      image: random(0, 9),
      text: random(0, copywritings.bundle.length - 1),
    });
  };

  useLayoutEffect(() => {
    if (!welcome) {
      navigation.navigate('Welcome');
    }
  }, []);

  useEffect(() => {
    setCurrentCopywriter({
      origin: copywritings.bundle[index.text].text,
      withBrand: copywritings.bundle[index.text].text
        .replace(/\${brand-zh-CN}/g, brandKeywords.Chinese)
        .replace(/\${brand-en-US}/g, brandKeywords.English),
    });
  }, [index]);

  useUpdateEffect(() => {
    setCurrentCopywriter({
      ...currentCopywriter,
      withBrand: currentCopywriter.origin
        .replace(/\${brand-zh-CN}/g, brandKeywords.Chinese)
        .replace(/\${brand-en-US}/g, brandKeywords.English),
    });
  }, [brandKeywords]);

  useEffect(() => {
    updateCopywritings();
  }, []);

  return (
    <View style={{flex: 1}}>
      <BlurScrollView>
        <View
          style={{
            marginVertical: 16,
            marginHorizontal: deviceType === 'Tablet' ? windowWidth / 6 : 16,
            padding: 6,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: {width: 0, height: 4},
            shadowRadius: 8,
            elevation: 8,
            backgroundColor: colors.primary,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableRipple
            borderless
            style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
            onPress={() =>
              navigation.navigate('Detail', {index, currentCopywriterWithBrand: currentCopywriter.withBrand})
            }>
            <View>
              <MaskedView
                maskElement={
                  <LinearGradient colors={['#fff', 'transparent']} locations={[0.45, 0.95]} style={{flex: 1}} />
                }
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={imageSets[index.image]}
                  style={{
                    width: deviceType === 'Tablet' ? windowWidth - windowWidth / 3 - 12 : windowWidth - 32 - 12,
                    height: screenHeight / 2 - 48,
                  }}
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
                  backgroundColor: color('#000').alpha(0.6).toString(),
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
                  marginBottom: 16,
                }}>
                <Text
                  numberOfLines={5}
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                    lineHeight: 18 * 1.7,
                    textAlign: Platform.OS === 'ios' ? 'justify' : 'left',
                    shadowColor: '#000',
                    shadowOpacity: 0.3,
                    shadowOffset: {width: 0, height: 0},
                    shadowRadius: 6,
                    elevation: 4,
                  }}>
                  {currentCopywriter.withBrand}
                </Text>
                <View style={{height: 1, backgroundColor: color('#fff').alpha(0.7).toString(), marginTop: 16}} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8}}>
                  <Text style={{fontSize: 12, color: color('#fff').alpha(0.7).toString()}}>仅供娱乐</Text>
                  <Text style={{fontSize: 12, color: color('#fff').alpha(0.7).toString()}}>轻点以查看详情</Text>
                </View>
              </View>
            </View>
          </TouchableRipple>

          <TouchableRipple
            borderless
            style={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: color(colors.onSecondary).alpha(0.3).toString(),
              width: '100%',
              height: 48,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => copyToClipboard(currentCopywriter.withBrand)}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 15}}>拷贝文案</Text>
          </TouchableRipple>
        </View>
      </BlurScrollView>
      {Platform.OS === 'ios' && (
        <BlurView blurType={headerBlurType} blurAmount={16} style={{width: '100%', position: 'absolute', bottom: 0}}>
          <Button
            mode="contained"
            style={{
              marginHorizontal: deviceType === 'Tablet' ? windowWidth / 6 : 16,
              marginTop: 16,
              marginBottom: 32 + insets.bottom,
            }}
            labelStyle={{fontSize: 15, fontWeight: 'bold', lineHeight: 32}}
            onPress={() => refresh()}>
            刷新文案
          </Button>
        </BlurView>
      )}
      {Platform.OS === 'android' && (
        <Button
          mode="contained"
          style={{
            marginHorizontal: deviceType === 'Tablet' ? windowWidth / 6 : 16,
            marginTop: 16,
            marginBottom: 32 + insets.bottom,
          }}
          labelStyle={{fontSize: 15, fontWeight: 'bold', lineHeight: 32}}
          onPress={() => refresh()}>
          刷新文案
        </Button>
      )}
    </View>
  );
};

export default Home;
