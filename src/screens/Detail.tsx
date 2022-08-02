import React, {useEffect, useState} from 'react';
import {View, Image, Platform, Dimensions} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import DeviceInfo from 'react-native-device-info';
import {Button, Text, useTheme} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import Fade from 'react-native-fade';
import {useUpdateEffect} from 'ahooks';
import color from 'color';
import {imageSets} from './Home';
import type {Index} from './Home';
import useClipboard from '../utils/useClipboard';
import useDetailFontSize from '../utils/useDetailFontSize';

type StackParamList = {
  Params: {
    index: Index;
    currentCopywriterWithBrand: string;
  };
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

const majarSystemVersion = Platform.OS === 'ios' ? Number(DeviceInfo.getSystemVersion().split('.')[0]) : 0;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Detail: React.FC = () => {
  const headerHeight = useHeaderHeight();

  const {colors} = useTheme();

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

  const {copyToClipboard} = useClipboard();
  const {detailFontSize, updateDetailFontSize} = useDetailFontSize();

  const {index, currentCopywriterWithBrand} = route.params;

  const [hasTooltip, setHasTooltip] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          theme={{
            roundness: 6,
          }}
          mode="contained"
          style={{marginRight: 8}}
          labelStyle={{fontSize: 12, fontWeight: 'bold'}}
          onPress={() => copyToClipboard(currentCopywriterWithBrand)}>
          拷贝文案
        </Button>
      ),
    });
  }, []);

  useUpdateEffect(() => {
    const timer = setInterval(() => {
      setHasTooltip(false);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasTooltip]);

  return (
    <View style={{flex: 1}}>
      <ScrollView scrollIndicatorInsets={{top: headerHeight}}>
        <Image source={imageSets[index.image]} style={{width: screenWidth, height: screenHeight / 3 + headerHeight}} />
        <View style={{position: 'relative'}}>
          <Fade
            visible={hasTooltip}
            duration={200}
            direction="up"
            style={{
              backgroundColor: color('#fff').alpha(0.9).toString(),
              height: 32,
              width: 56,
              borderRadius: 12,
              position: 'absolute',
              bottom: 8,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 16,
              elevation: 8,
            }}>
            <Text style={{color: color('#000').alpha(0.8).toString(), fontSize: 12, includeFontPadding: false}}>
              {detailFontSize + 'pt'}
            </Text>
          </Fade>
        </View>
        <View
          style={{
            backgroundColor: color(colors.secondary).alpha(0.05).toString(),
            margin: 16,
            paddingHorizontal: 16,
            borderRadius: 8,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: colors.text, fontSize: 14, includeFontPadding: false}}>A</Text>
          <Slider
            value={detailFontSize}
            minimumValue={14}
            maximumValue={22}
            step={1}
            tapToSeek
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.disabled}
            thumbTintColor={colors.onPrimary}
            style={{flex: 1, marginHorizontal: 16}}
            onValueChange={num => {
              // https://github.com/callstack/react-native-slider/issues/395
              // Workaround for onValueChange to be called automatically in Android after this screen was initialized
              num !== detailFontSize && setHasTooltip(true);
              updateDetailFontSize(num);
            }}
          />
          <Text style={{color: colors.text, fontSize: 22, includeFontPadding: false}}>A</Text>
        </View>
        <View style={{marginHorizontal: 20, marginBottom: 16 + insets.bottom, flexGrow: 1}}>
          <Text
            style={{
              color: colors.onBackground,
              fontSize: detailFontSize,
              fontWeight: 'bold',
              lineHeight: detailFontSize * 2,
              textAlign: Platform.OS === 'ios' ? 'justify' : 'left',
            }}>
            {currentCopywriterWithBrand}
          </Text>
        </View>
      </ScrollView>
      {Platform.OS === 'ios' && (
        <BlurView
          blurType={majarSystemVersion >= 13 ? 'thinMaterialDark' : 'regular'}
          blurAmount={16}
          style={{width: '100%', height: headerHeight, position: 'absolute', top: 0}}
        />
      )}
      {Platform.OS === 'android' && (
        <View
          style={{
            width: '100%',
            height: headerHeight,
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        />
      )}
    </View>
  );
};

export default Detail;
