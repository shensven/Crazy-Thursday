import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native-bars';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import {MMKV} from 'react-native-mmkv';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import {useAtom} from 'jotai';
import {atomStatusBarStyle} from './src/atoms/appAtom';
import Home from './src/screens/Home';
import HomeHeaderRight from './src/screens/components/HomeHeaderRight';
import Detail from './src/screens/Detail';
import Settings from './src/screens/Settings';
import BrandEditer from './src/screens/BrandEditer';
import PrivacyPolicy from './src/screens/PrivacyPolicy';
import Toast from './src/screens/components/Toast';

export const storage = new MMKV();

if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}

const MainStack: React.FC = () => {
  const Stack = createStackNavigator();
  const [statusBarStyle, setStatusBarStyle] = useAtom(atomStatusBarStyle);

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <StatusBar animated={true} barStyle={statusBarStyle} />
      <Stack.Navigator
        screenOptions={{
          headerTintColor: '#E1352F',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: '疯狂星期四 🎉',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              color: '#000',
              fontSize: 18,
              fontWeight: 'bold',
            },
            headerRight: () => <HomeHeaderRight />,
            headerStyle: {
              elevation: 0, // Android
              shadowOpacity: 0, // iOS
            },
            cardStyle: {
              backgroundColor: '#fff',
            },
          }}
          listeners={{
            focus: () => setStatusBarStyle('dark-content'),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#fff',
            cardStyle: {backgroundColor: '#ede0de'},
            ...TransitionPresets.ModalPresentationIOS,
          }}
          listeners={{
            focus: () => setStatusBarStyle('light-content'),
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: '设置',
          }}
        />
        <Stack.Screen
          name="BrandEditer"
          component={BrandEditer}
          options={{
            title: '编辑品牌关键字',
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{
            title: '隐私政策',
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return <MainStack />;
};

export default App;
