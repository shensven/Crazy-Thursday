import React from 'react';
import {Text} from 'react-native-paper';
import Fade from 'react-native-fade';
import {useAtom} from 'jotai';
import color from 'color';
import {atomHasToast, atomToastMsg} from '../../atoms/appAtom';

const Toast: React.FC = () => {
  const [hasToast] = useAtom(atomHasToast);
  const [toastMsg] = useAtom(atomToastMsg);

  return (
    <Fade
      visible={hasToast}
      duration={200}
      direction="up"
      style={{
        backgroundColor: toastMsg ? '#fff' : 'transparent',
        height: 40,
        paddingHorizontal: 16,
        borderRadius: 20,
        position: 'absolute',
        bottom: '20%',
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 16,
        elevation: 8,
      }}>
      <Text style={{color: color('#000').alpha(0.8).toString(), fontSize: 13}}>
        {toastMsg} {toastMsg && '🎉'}
      </Text>
    </Fade>
  );
};

export default Toast;
