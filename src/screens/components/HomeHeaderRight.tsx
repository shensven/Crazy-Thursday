import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {type StackScreenProps} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import {Platform} from 'react-native';
import IcRoundMoreHoriz from '../assets/icons/IcRoundMoreHoriz';
import IcRoundMoreVert from '../assets/icons/IcRoundMoreVert';

type StackParamList = {
  Settings: undefined;
};
type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const HomeHeaderRight: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <IconButton
      icon={() => (Platform.OS === 'ios' ? <IcRoundMoreHoriz /> : <IcRoundMoreVert />)}
      onPress={() => navigation.navigate('Settings')}
    />
  );
};

export default HomeHeaderRight;
