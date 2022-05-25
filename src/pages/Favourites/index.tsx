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
import FavouritesEmpty from '../../icons/FavouritesEmpty';
import {API_URL} from '../../../consts';

const Favourites = () => {
  const [user, setUser] = React.useState<any>(undefined);

  useEffect(() => {
    GetData('user').then(res => {
      if (res !== undefined && res !== null) {
        setUser(JSON.parse(res));
      }
    });
  }, []);

  const {data: products, refetch} = useQuery(
    ['favourite_products', user],
    favourites_request,
    {
      enabled: user !== undefined,
    },
  );

  // For Refetching
  const mutation = useMutation(async (id: number) => {
    axios.delete(`${API_URL}/api/favourites/${id}`);
    refetch();
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => refetch();
    }, [refetch]),
  );

  const deleteFav = (id: number) => {
    mutation.mutate(id);
  };

  return (
    <Box safeArea flex="1">
      <Header />
      <Container flex="1" marginTop={3} mx="auto" width="100%">
        <Text fontSize={24} fontWeight={800} fontFamily={'Cairo'}>
          المفضلة
        </Text>

        {products?.data.data.length === 0 ? (
          <Box width="100%" marginTop={8} mx="auto">
            <FavouritesEmpty />
            <Box marginTop={6}>
              <Text
                textAlign={'center'}
                fontFamily={'Cairo'}
                fontWeight={800}
                fontSize={28}>
                القائمة فارغة
              </Text>
              <Text textAlign={'center'} fontFamily={'Cairo'} fontSize={20}>
                لم يتم اضافة عناوين لحسابك
              </Text>
            </Box>
          </Box>
        ) : (
          <FlatList
            style={{width: '100%', flex: 1}}
            data={products?.data.data}
            keyExtractor={(item, index) => `${item.item}-${index}`}
            renderItem={({item}) => <Item item={item} deleteItem={deleteFav} />}
          />
        )}
      </Container>
    </Box>
  );
};

export default Favourites;
