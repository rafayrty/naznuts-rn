import React from 'react';
import {Box, Text, Container, ScrollView, Stack, Pressable} from 'native-base';
import Header from '../../components/Header';
import {Shadow} from 'react-native-shadow-2';
import {categories_request} from '../../api/categories_request';
import {useQuery} from 'react-query';
import SvgUri from 'react-native-svg-uri-updated';
import {useNavigation} from '@react-navigation/native';
import {useColorScheme} from 'react-native';

const Categories: React.FC = () => {
  const {data} = useQuery('categories', categories_request);
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ScrollView>
      <Box safeArea paddingBottom={32}>
        <Header />

        <Container marginTop={6} width="100%" mx="auto">
          <Text
            fontFamily={'Cairo'}
            color={isDarkMode ? '#FFF' : '#000'}
            fontSize={'xl'}
            fontWeight={800}>
            التصنيفات
          </Text>

          <Box width="100%">
            <Stack
              direction={'row'}
              justifyContent="space-between"
              flexWrap={'wrap'}>
              {data?.data.data.map((item: any): React.ReactNode => {
                return (
                  <Box
                    key={item.attributes.slug}
                    width="48%"
                    height="40"
                    marginTop={3}>
                    <Shadow
                      distance={4}
                      viewStyle={{width: '100%', borderRadius: 12}}>
                      <Pressable
                        onPress={() =>
                          navigation.navigate('CategoryView', {
                            slug: item.attributes.slug,
                          })
                        }>
                        {({isPressed}) => {
                          return (
                            <Box
                              width="100%"
                              borderRadius={12}
                              height="100%"
                              background={isDarkMode ? '#333' : '#FFF'}
                              justifyContent={'center'}
                              alignItems={'center'}
                              style={{
                                transform: [
                                  {
                                    scale: isPressed ? 0.96 : 1,
                                  },
                                ],
                              }}>
                              <SvgUri
                                width="25"
                                height="25"
                                source={{
                                  uri: `${item.attributes.icon.data.attributes.url}`,
                                }}
                              />
                              <Text
                                fontFamily={'Cairo'}
                                color={isDarkMode ? '#FFF' : '#000'}
                                marginTop={2}>
                                {' '}
                                {item.attributes.name}
                              </Text>
                            </Box>
                          );
                        }}
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
