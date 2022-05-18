import React from 'react';
import {Box, Text, Container, ScrollView, Stack, Pressable} from 'native-base';
import Header from '../../components/Header';
import Svg, {Path} from 'react-native-svg';
import {Shadow} from 'react-native-shadow-2';
import {categories_request} from '../../api/categories_request';
import {useQuery} from 'react-query';
import SvgUri from 'react-native-svg-uri-updated';
import {useNavigation} from '@react-navigation/native';

const Categories: React.FC = () => {
  const {data} = useQuery('categories', categories_request);
  const navigation = useNavigation();
  return (
    <ScrollView>
      <Box safeArea paddingBottom={32}>
        <Header />

        <Container marginTop={6} width="100%" mx="auto">
          <Text fontFamily={'Cairo'} fontSize={'xl'} fontWeight={800}>
            التصنيفات
          </Text>

          <Box width="100%">
            <Stack
              direction={'row'}
              justifyContent="space-between"
              flexWrap={'wrap'}>
              {data?.data.data.map((item: any, index: number): ReactNode => {
                return (
                  <Box width="48%" height="40" marginTop={3}>
                    <Shadow
                      distance={6}
                      viewStyle={{width: '100%', borderRadius: 12}}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate('CategoryView', {
                            slug: item.attributes.slug,
                            id: item.id,
                          })
                        }
                        width="100%"
                        borderRadius={12}
                        height="100%"
                        background={'#FFF'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <SvgUri
                          width="25"
                          height="25"
                          source={{
                            uri: `http://localhost:1337${item.attributes.icon.data.attributes.url}`,
                          }}
                        />
                        <Text fontFamily={'Cairo'} marginTop={2}>
                          {' '}
                          {item.attributes.name}
                        </Text>
                      </Pressable>
                    </Shadow>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Container>
      </Box>
    </ScrollView>
  );
};

export default Categories;
