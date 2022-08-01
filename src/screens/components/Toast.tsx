import React from 'react';
import {Text} from 'react-native-paper';
import Fade from 'react-native-fade';
import {useAtom} from 'jotai';
import color from 'color';
import {atomHasToast} from '../../atoms/appAtom';

const Toast: React.FC = () => {
  const [hasToast] = useAtom(atomHasToast);

  return (
    <Fade
      visible={hasToast}
      duration={200}
      style={{
        backgroundColor: '#fff',
        width: 144,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: '75%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 16,
        elevation: 8,
      }}>
      <Text style={{color: color('#000').alpha(0.8).toString(), fontSize: 13}}>已拷贝到剪贴板 🎉</Text>
    </Fade>
  );
};

export default Toast;
