import {FlatList} from 'react-native';
import React from 'react';

import {Box, Text, Container, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/core';
type Props = {
  item: any;
};
const Item: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate('Order')}
      my={2}
      borderRadius={10}
      mx={1}
      bg="white"
      p={3}
      py={4}
      px={5}
      shadow={2}>
      <Box flexDirection={'row'} width="100%" justifyContent={'space-between'}>
        <Box width="70%">
          <Box my={1} flexDir={'row'} alignItems={'center'}>
            <Text fontFamily={'Cairo'} color="gray.400">
              رقم الطلب:
            </Text>
            <Text fontFamily={'Cairo'}>{item.id} </Text>
          </Box>

          <Box my={1} flexDir={'row'} alignItems={'center'}>
            <Text fontFamily={'Cairo'} color="gray.400">
              المبلغ الكلي:
            </Text>
            <Text fontFamily={'Cairo'}>₪33 </Text>
          </Box>
          <Text my={1} textAlign={'left'} fontFamily={'Cairo'} color="gray.400">
            حالة الطلب:
          </Text>
        </Box>
        <Box>
          <Text my={1} fontFamily={'Cairo'} color="gray.400">
            {item.date}
          </Text>
        </Box>
        <Box />
      </Box>

      <Box position={'relative'} marginTop={2}>
        <Box flexDir={'row'}>
          <Box
            bg="primary.500"
            width={'33.33333%'}
            borderRadius={6}
            height={2}
          />
          <Box
            bg="primary.500"
            width={'33.33333%'}
            borderRadius={6}
            height={2}
          />
          <Box
            bg="primary.500"
            width={'33.33333%'}
            borderRadius={6}
            height={2}
          />
        </Box>
        <Box
          position={'absolute'}
          top={-5}
          flexDir={'row'}
          width="100%"
          justifyContent={'space-between'}>
          <Box bg="primary.500" width={4} borderRadius={100} height={4} />
          <Box bg="primary.500" width={4} borderRadius={100} height={4} />
          <Box bg="primary.500" width={4} borderRadius={100} height={4} />
          <Box bg="primary.500" width={4} borderRadius={100} height={4} />
        </Box>
      </Box>
    </Pressable>
  );
};
const AllOrders = () => {
  const orders = [
    {
      id: 123122222223,
      price: 33,
      status: 1,
      date: '20/04/2022',
    },
    {
      id: 1234122222223,
      price: 33,
      status: 1,
      date: '20/04/2022',
    },
  ];
  return (
    <Container marginTop={4} flex="1" width="100%" mx="auto">
      <Box flex="1" width="100%">
        <FlatList
          style={{width: '100%', flex: 1}}
          data={orders}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({item}) => <Item item={item} />}
        />
      </Box>
    </Container>
  );
};

export default AllOrders;
