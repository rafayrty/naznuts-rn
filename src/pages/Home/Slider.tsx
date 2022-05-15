import React from 'react';
import Swiper from 'react-native-swiper';
import {Box} from 'native-base';
import {Image} from 'react-native';

const Slider = () => {
  const img = require('../../../assets/images/slider.jpg');

  return (
    <Box mx="auto" px="4">
      <Swiper activeDotColor={'#79C143'} showsButtons={false} height={300}>
        <Box alignItems={'center'} borderColor="#FFF" borderWidth="2">
          <Image source={img} style={{width: '100%', height: 250}} />
        </Box>
        <Box alignItems={'center'} borderColor="#FFF" borderWidth="2">
          <Image source={img} style={{width: '100%', height: 250}} />
        </Box>
      </Swiper>
    </Box>
  );
};

export default Slider;
