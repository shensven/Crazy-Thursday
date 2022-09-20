import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IcRoundCheck: React.FC<Props> = props => {
  const {size, color} = props;
  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 24 24" {...props}>
      <Path
        fill={color}
        d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z"
      />
    </Svg>
  );
};

IcRoundCheck.defaultProps = {
  size: 24,
  color: '#000',
};

export default IcRoundCheck;
