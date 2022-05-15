import React from 'react';
import Header from '../../../components/Header';
import {Box, Container, Text} from 'native-base';
import BackButton from '../../../components/BackButton';
import OrderTabs from './OrderTabs';

const Orders = () => {
  return (
    <Box safeArea flex="1">
      <Header />

      <Container mx="auto" width="100%">
        <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
          <BackButton />
          <Text
            marginLeft={3}
            fontFamily={'Cairo'}
            fontSize={22}
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
