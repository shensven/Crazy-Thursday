import React, {useEffect} from 'react';
import {View, Image, useWindowDimensions, Platform} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import {Button, Text} from 'react-native-paper';
import {imageSets, type MainIndex} from './Home';
import useClipboard from '../utils/useClipboard';

type StackParamList = {
  Params: {
    mainIndex: MainIndex;
    currentCopywriter: string;
  };
};
type ScreenRouteProp = RouteProp<StackParamList, 'Params'>;

const Detail: React.FC = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();

  const {copyToClipboard} = useClipboard();

  const {mainIndex, currentCopywriter} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          theme={{
            colors: {primary: '#E1352F'},
          }}
          mode="contained"
          style={{marginRight: 8}}
          labelStyle={{fontSize: 12, fontWeight: 'bold'}}
          onPress={() => copyToClipboard(currentCopywriter)}>
          拷贝文案
        </Button>
      ),
    });
  }, []);

  return (
    <>
      <ScrollView scrollIndicatorInsets={{top: headerHeight}}>
        <Image source={imageSets[mainIndex.image]} style={{width: windowWidth, height: windowHeight / 3}} />
        <View style={{paddingBottom: insets.bottom, marginTop: 16, flexGrow: 1}}>
          <Text
            style={{
              color: '#201a19',
              fontSize: 18,
              fontWeight: 'bold',
              lineHeight: 18 * 2,
              textAlign: 'justify',
              marginHorizontal: 16,
              marginVertical: 8,
              shadowColor: '#000',
              shadowOpacity: 0.2,
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 8,
              elevation: 2,
            }}>
            {currentCopywriter}
          </Text>
        </View>
      </ScrollView>
      {Platform.OS === 'ios' && (
        <BlurView
          blurType="regular"
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
    </>
  );
};

export default Detail;
