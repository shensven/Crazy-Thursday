import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {createStackNavigator, HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import useColorSystem from './utils/useColorSystem';
import Home from './screens/Home';
import HomeHeaderRight from './screens/components/HomeHeaderRight';
import Detail from './screens/Detail';
import Settings from './screens/Settings';
import BrandEditer from './screens/BrandEditer';
import Appearance from './screens/Appearance';
import PrivacyPolicy from './screens/PrivacyPolicy';
import {Platform} from 'react-native';
import Welcome from './screens/Welcome';

const MainStack: React.FC = () => {
  const Stack = createStackNavigator();

  const {colors} = useTheme();
  const {getNavigationAppearance, updateStatusBarStyle} = useColorSystem();

  return (
    <NavigationContainer
      theme={getNavigationAppearance()}
      onReady={() => {
        RNBootSplash.hide({fade: true});
      }}>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          },
          headerStyle: {
            elevation: 0, // Android
            shadowOpacity: 0, // iOS
            backgroundColor: colors.background,
          },
          cardStyle: {
            backgroundColor: colors.background,
          },
          headerTransparent: Platform.OS === 'ios' ? true : false,
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
              color: colors.onBackground,
              fontSize: 18,
              fontWeight: 'bold',
            },

            headerRight: () => <HomeHeaderRight />,
          }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            title: '欢迎',
            header: () => undefined,
            gestureEnabled: false,
            ...TransitionPresets.ModalPresentationIOS,
          }}
          listeners={{
            focus: () => updateStatusBarStyle('light-content'),
            beforeRemove: () => updateStatusBarStyle(),
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: '',
            headerTransparent: true,
            headerTintColor: '#fff',
            ...TransitionPresets.ModalPresentationIOS,
          }}
          listeners={{
            focus: () => updateStatusBarStyle('light-content'),
            beforeRemove: () => updateStatusBarStyle(),
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
          name="Appearance"
          component={Appearance}
          options={{
            title: '外观',
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
    </NavigationContainer>
  );
};

export default MainStack;
