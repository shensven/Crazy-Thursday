import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const IcRoundChevronRight: React.FC<Props> = props => {
  const {size, color} = props;
  return (
    <Svg width={size} height={size} color={color} viewBox="0 0 24 24" {...props}>
      <Path
        d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"
        fill="currentColor"
      />
    </Svg>
  );
};
IcRoundChevronRight.defaultProps = {
  size: 24,
  color: '#000',
};

export default IcRoundChevronRight;
