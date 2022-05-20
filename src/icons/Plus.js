import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Plus = ({color}) => {
  return (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M9 15V9M9 9V3M9 9H15M9 9H3"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
};

export default Plus;
