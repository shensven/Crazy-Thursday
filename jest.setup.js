import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockClipboard from '@react-native-clipboard/clipboard/jest/clipboard-mock.js';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

jest.useFakeTimers();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('@react-native-clipboard/clipboard', () => mockClipboard);
jest.mock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('./src/screens/Init');
jest.doMock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});
