import React from 'react';
import Swiper from 'react-native-swiper';
import {Box} from 'native-base';
import {Image} from 'react-native';
import slider_request from '../../api/slider_request';
import {useQuery} from 'react-query';

const Slider = () => {
  const {data} = useQuery('slider', slider_request);
  return (
    <Box mx="auto" px="4">
      {data?.data.data.map((item: any): React.ReactNode => {
        return (
          <Swiper activeDotColor={'#79C143'} showsButtons={false} height={300}>
            <Box alignItems={'center'} borderColor="#FFF" borderWidth="2">
              <Image
                accessibilityLabel={item.attributes.name}
                source={{
                  uri: `http://localhost:1337${item.attributes.image.data.attributes.url}`,
                }}
                style={{width: '100%', height: 250}}
              />
            </Box>
          </Swiper>
        );
      })}

      {/* <Box alignItems={'center'} borderColor="#FFF" borderWidth="2">
          <Image source={img} style={{width: '100%', height: 250}} />
        </Box>
      </Swiper> */}
    </Box>
  );
};

export default Slider;
