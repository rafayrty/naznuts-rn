import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Box, Text, Container} from 'native-base';
import Header from '../../components/Header';
import Item from './item';
import {useMutation, useQuery} from 'react-query';
import favourites_request from '../../api/favourites_request';
import {GetData} from '../../plugins/storage';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

const Favourites = () => {
  // const products: any = [
  //   {
  //     id: 1,
  //     name: 'لوز',
  //     categories: 'المكسرات والبسكويت، المكسرات المحمصة',
  //     image: require('../../../assets/images/product.jpg'),
  //   },
  //   {
  //     id: 2,
  //     name: 'لوز',
  //     categories: 'المكسرات والبسكويت، المكسرات المحمصة',
  //     image: require('../../../assets/images/product.jpg'),
  //   },
  // ];

  const [user, setUser] = React.useState<any>(undefined);

  useEffect(() => {
    GetData('user').then(res => {
      setUser(JSON.parse(res));
    });
  }, []);

  const {data: products, refetch} = useQuery(
    ['favourite_products', user],
    favourites_request,
    {
      enabled: user !== undefined,
    },
  );

  const mutation = useMutation(async id => {
    axios.delete(`http://localhost:1337/api/favourites/${id}`);
    // setRefresh(!refresh);

    refetch();
  });
  // const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      refetch();

      return () => refetch();
    }, [refetch]),
  );

  // if (isFocused) {
  //   refetch();
  // }

  const deleteFav = id => {
    mutation.mutate(id);
  };

  return (
    <Box safeArea flex="1">
      <Header />
      <Container flex="1" marginTop={3} mx="auto" width="100%">
        <Text fontSize={24} fontWeight={800} fontFamily={'Cairo'}>
          المفضلة
        </Text>
        {/* {JSON.stringify(products?.data.data[0].attributes.product.data)} */}
        {/* {JSON.stringify(products?.data)} */}
        <FlatList
          style={{width: '100%', flex: 1}}
          data={products?.data.data}
          keyExtractor={(item, index) => `${item.item}-${index}`}
          renderItem={({item}) => <Item item={item} deleteItem={deleteFav} />}
        />
      </Container>
    </Box>
  );
};

export default Favourites;
