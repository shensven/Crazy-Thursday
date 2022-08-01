import 'react-native-gesture-handler';
import React from 'react';
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
export const mmkvCopywritings = storage.getString('@copywritings');

if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}

const App: React.FC = () => {
  const {statusBarStyle, getPaperAppearance} = useDesignSystem();

  return (
    <PaperProvider theme={getPaperAppearance()}>
      <StatusBar animated={true} barStyle={statusBarStyle} />
      <MainStack />
      <Toast />
    </PaperProvider>
  );
};

export default App;
