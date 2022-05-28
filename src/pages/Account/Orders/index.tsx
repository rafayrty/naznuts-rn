import React from 'react';
import Header from '../../../components/Header';
import {Box, Container, Text} from 'native-base';
// import BackButton from '../../../components/BackButton';
import OrderTabs from './OrderTabs';
import {useColorScheme} from 'react-native';
import BackButton from '../../../components/BackButton';

const Orders = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const navigation = useNavigation();
  return (
    <Box safeArea flex="1">
      <Header />

      <Container mx="auto" width="100%">
        <Box
          marginTop={4}
          marginBottom={4}
          flexDir={'row'}
          alignItems={'center'}>
          <BackButton />
          <Text
            marginLeft={0}
            fontFamily={'Cairo'}
            fontSize={22}
            color={isDarkMode ? '#FFF' : '#000'}
            fontWeight={800}>
            طلباتي
          </Text>
        </Box>
      </Container>

      <OrderTabs />
    </Box>
  );
};

export default Orders;
