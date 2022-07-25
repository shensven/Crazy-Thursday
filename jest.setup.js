import {jest} from '@jest/globals';
import 'react-native-gesture-handler/jestSetup';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
