import React from 'react';
import {View} from 'react-native';

type Props = {
  hasMask: boolean;
};

const Mask: React.FC<Props> = props => {
  const {hasMask} = props;

  return (
    <View
      pointerEvents="none"
      style={{
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: hasMask ? 'rgba(0,0,0,0.5)' : 'transparent',
      }}
    />
  );
};

Mask.defaultProps = {
  hasMask: false,
};

export default Mask;
