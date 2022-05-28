import {FlatList, useColorScheme} from 'react-native';
import React from 'react';

import {Box, Container, Text} from 'native-base';
import {useQuery} from 'react-query';
import {all_orders_request} from '../../../api/orders_request';
import Item from './Item';
const AllOrders = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {data: orders} = useQuery('all_orders', all_orders_request);

  if (orders?.data.data.length === 0) {
    return (
      <Container marginTop={4} flex="1" width="100%" mx="auto">
        <Text color={isDarkMode ? '#FFF' : '#000'}>
          لم يتم العثور على أية طلبات
        </Text>
      </Container>
    );
  }
  return (
    <Container marginTop={4} flex="1" width="100%" mx="auto">
      <Box flex="1" width="100%">
        <FlatList
          style={{width: '100%', flex: 1}}
          data={orders?.data.data}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => <Item item={item} />}
        />
      </Box>
    </Container>
  );
};

export default AllOrders;
