import React from 'react';
import Svg, {Path} from 'react-native-svg';
const Minus = ({color}) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M15 9H9H3"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Minus;
