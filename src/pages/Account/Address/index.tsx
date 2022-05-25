import React from 'react';
import Header from '../../../components/Header';
import {Box, Container, Pressable, Text} from 'native-base';
import BackButton from '../../../components/BackButton';
import Svg, {Path} from 'react-native-svg';
import List from './List';
import {useNavigation} from '@react-navigation/core';
import {useColorScheme} from 'react-native';

const Address = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Box safeArea flex="1">
      <Header />
      <Container mx="auto" width="100%">
        <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
          <BackButton />
          <Text
            color={isDarkMode ? '#FFF' : '#000'}
            marginLeft={3}
            fontFamily={'Cairo'}
            fontSize={22}
            fontWeight={800}>
            العناوين
          </Text>
        </Box>

        <Box marginTop={3}>
          <Pressable onPress={() => navigation.navigate('NewAddress')}>
            {({isPressed}) => {
              return (
                <Box
                  py="3"
                  borderRadius={6}
                  flexDirection="row"
                  justifyContent={'center'}
                  alignItems={'center'}
                  bg={isPressed ? 'primary.700' : 'primary.500'}
                  p="5"
                  px={9}
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}>
                  <Svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.93443 0.9375C4.5863 0.9375 5.11475 1.48315 5.11475 2.15625V3.78125H6.68852C7.3404 3.78125 7.86885 4.3269 7.86885 5C7.86885 5.6731 7.3404 6.21875 6.68852 6.21875H5.11475V7.84375C5.11475 8.51685 4.5863 9.0625 3.93443 9.0625C3.28255 9.0625 2.7541 8.51685 2.7541 7.84375V6.21875H1.18033C0.528451 6.21875 0 5.6731 0 5C0 4.3269 0.528451 3.78125 1.18033 3.78125H2.7541V2.15625C2.7541 1.48315 3.28255 0.9375 3.93443 0.9375Z"
                      fill={isDarkMode ? '#000' : '#FFF'}
                    />
                  </Svg>

                  <Text
                    color={isDarkMode ? '#000' : '#FFF'}
                    marginLeft={2}
                    fontFamily={'Cairo'}>
                    أضافة عنوان جديد
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        </Box>
      </Container>

      <Box flex="1">
        <List />
      </Box>
    </Box>
  );
};

export default Address;
