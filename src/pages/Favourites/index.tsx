import {FlatList} from 'react-native';
import React from 'react';
import {Box, Text, Container} from 'native-base';
import Header from '../../components/Header';
import Item from './item';

const Favourites = () => {
  const products: any = [
    {
      id: 1,
      name: 'لوز',
      categories: 'المكسرات والبسكويت، المكسرات المحمصة',
      image: require('../../../assets/images/product.jpg'),
    },
    {
      id: 2,
      name: 'لوز',
      categories: 'المكسرات والبسكويت، المكسرات المحمصة',
      image: require('../../../assets/images/product.jpg'),
    },
  ];
  return (
    <Box safeArea flex="1">
      <Header />
      <Container flex="1" marginTop={3} mx="auto" width="100%">
        <Text fontSize={24} fontWeight={800} fontFamily={'Cairo'}>
          المفضلة
        </Text>

        <FlatList
          style={{width: '100%', flex: 1}}
          data={products}
          keyExtractor={(item, index) => `${item.item}-${index}`}
          renderItem={({item}) => <Item item={item} />}
        />
      </Container>
    </Box>
  );
};

export default Favourites;
