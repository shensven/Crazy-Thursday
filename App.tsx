import 'react-native-gesture-handler';
import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {MMKV} from 'react-native-mmkv';
import {StatusBar} from 'react-native-bars';
import {initializeMMKVFlipper} from 'react-native-mmkv-flipper-plugin';
import useColorSystem from './src/utils/useColorSystem';
import MainStack from './src/MainStack';
import Toast from './src/screens/components/Toast';
// import Mask from './src/screens/components/Mask';

export const storage = new MMKV();
export const mmkvWelcome = storage.getString('@welcome');
export const mmkvAppearance = storage.getString('@appearance');
export const mmkvBrandKeywords = storage.getString('@brandKeywords');
export const mmkvCopywritings = storage.getString('@copywritings');
export const mmkvDetailFontSize = storage.getString('@detailFontSize');

if (__DEV__) {
  initializeMMKVFlipper({default: storage});
}

const App: React.FC = () => {
  const {statusBarStyle, getPaperAppearance} = useColorSystem();

  return (
    <PaperProvider theme={getPaperAppearance()}>
      <StatusBar animated={true} barStyle={statusBarStyle} />
      <MainStack />
      <Toast />
      {/* <Mask hasMask={true} /> */}
    </PaperProvider>
  );
};

export default App;
