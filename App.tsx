import 'react-native-gesture-handler';
import React from 'react';
// import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {MMKV} from 'react-native-mmkv';
import {StatusBar} from 'react-native-bars';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import useDesignSystem from './src/utils/useDesignSystem';
import MainStack from './src/MainStack';
import Toast from './src/screens/components/Toast';

export const storage = new MMKV();
export const mmkvAppearance = storage.getString('@appearance');
export const mmkvBrandKeywords = storage.getString('@brandKeywords');
export const mmkvCopywriter = storage.getString('@copywriter');

if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}

const App: React.FC = () => {
  const {getPaperAppearance, getStatusBarStyle} = useDesignSystem();

  return (
    <PaperProvider theme={getPaperAppearance()}>
      <StatusBar animated={true} barStyle={getStatusBarStyle()} />
      <MainStack />
      <Toast />
    </PaperProvider>
  );
};

export default App;
