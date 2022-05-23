import React from 'react';
import {Box, Container, Text} from 'native-base';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
const Success = () => {
  const navigation = useNavigation<any>();
  return (
    <Box safeArea flex="1" paddingBottom={0}>
      <Header />
      <Container flex="1" mx="auto" width="100%">
        <Box width="100%">
          <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
            <BackButton />
            <Text
              marginLeft={0}
              fontFamily={'Cairo'}
              fontSize={22}
              fontWeight={800}>
              الدفع{' '}
            </Text>
          </Box>
        </Box>{' '}
        <Box flex="1" width="100%">
          <Box
            bg="white"
            shadow={2}
            borderRadius={12}
            width="88%"
            mx="auto"
            marginTop={10}
            p="4">
            <Box
              bg="primary.500"
              mx="auto"
              marginTop={-10}
              width={63}
              borderRadius={32}
              p={2}>
              <Svg
                style={{width: '100%'}}
                height="48"
                viewBox="0 0 48 48"
                fill="none">
                <Path
                  d="M8 24L20 36L40 12"
                  stroke="white"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </Box>
            <Box
              paddingTop={4}
              paddingBottom={3}
              borderRadius={2}
              borderBottomColor={'gray.400'}
              borderStyle={'solid'}
              borderBottomWidth={1}>
              <Text
                textAlign={'center'}
                fontWeight={600}
                fontFamily={'Cairo'}
                fontSize={20}>
                تم الدفع بنجاح
              </Text>
              <Text
                textAlign={'center'}
                fontFamily={'Cairo'}
                fontWeight={600}
                fontSize={12}
                marginTop={2}>
                {' '}
                رقم الفاتورة. 576345375
              </Text>
            </Box>
            <Box flexDir={'row'} width="100%" justifyContent={'space-between'}>
              <Box marginTop={4}>
                <Text textAlign={'left'} fontFamily={'Cairo'}>
                  التاريخ
                </Text>
                <Text textAlign={'left'} fontFamily={'Cairo'} fontWeight={700}>
                  17/4/2022
                </Text>
              </Box>

              <Box marginTop={4}>
                <Text textAlign={'left'} fontFamily={'Cairo'}>
                  الوقت
                </Text>
                <Text textAlign={'left'} fontFamily={'Cairo'} fontWeight={700}>
                  11:11:11 Am{' '}
                </Text>
              </Box>
            </Box>
            <Box marginTop={4}>
              <Text textAlign={'left'} fontFamily={'Cairo'}>
                المبلغ الكلي
              </Text>
              <Text
                textAlign={'left'}
                color="primary.500"
                fontSize={16}
                fontFamily={'Cairo'}
                fontWeight={700}>
                ₪661
              </Text>
            </Box>
          </Box>
        </Box>
        <Box width="80%" mx="auto">
          <TouchableOpacity onPress={() => navigation.replace('Orders')}>
            <Box
              bg="secondary.500"
              borderRadius={8}
              flexDir={'row-reverse'}
              alignItems={'center'}
              px={4}
              py={3}
              justifyContent={'space-between'}>
              <Box
                flexDir={'row'}
                width="100%"
                justifyContent={'center'}
                alignItems={'center'}>
                <Text
                  fontWeight={600}
                  fontFamily={'Cairo'}
                  color="white"
                  marginRight={2}>
                  تتبع الطلب{' '}
                </Text>

                <Svg width="17" height="8" viewBox="0 0 17 8" fill="none">
                  <Path
                    d="M16 4.5C16.2761 4.5 16.5 4.27614 16.5 4C16.5 3.72386 16.2761 3.5 16 3.5L16 4.5ZM0.646445 3.64645C0.451183 3.84171 0.451183 4.15829 0.646445 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.73079 0.976313 4.73079 0.65973 4.53553 0.464468C4.34027 0.269206 4.02369 0.269206 3.82843 0.464468L0.646445 3.64645ZM16 3.5L0.999999 3.5L0.999999 4.5L16 4.5L16 3.5Z"
                    fill="white"
                  />
                </Svg>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box width="94%" marginTop={6} mx="auto">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Box
              bg="primary.500"
              borderRadius={8}
              flexDir={'row-reverse'}
              alignItems={'center'}
              px={4}
              py={3}
              justifyContent={'space-between'}>
              <Box
                flexDir={'row'}
                width="100%"
                justifyContent={'center'}
                alignItems={'center'}>
                <Text
                  fontWeight={600}
                  fontFamily={'Cairo'}
                  color="white"
                  marginRight={2}>
                  اكمال التسوق{' '}
                </Text>

                <Svg width="17" height="8" viewBox="0 0 17 8" fill="none">
                  <Path
                    d="M16 4.5C16.2761 4.5 16.5 4.27614 16.5 4C16.5 3.72386 16.2761 3.5 16 3.5L16 4.5ZM0.646445 3.64645C0.451183 3.84171 0.451183 4.15829 0.646445 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.73079 0.976313 4.73079 0.65973 4.53553 0.464468C4.34027 0.269206 4.02369 0.269206 3.82843 0.464468L0.646445 3.64645ZM16 3.5L0.999999 3.5L0.999999 4.5L16 4.5L16 3.5Z"
                    fill="white"
                  />
                </Svg>
              </Box>
            </Box>
          </TouchableOpacity>
        </Box>
      </Container>
    </Box>
  );
};

export default Success;
