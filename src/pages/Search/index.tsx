import {Image, TouchableOpacity, useColorScheme} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {
  Box,
  Text,
  Container,
  Input,
  ScrollView,
  useTheme,
  Spinner,
  Pressable,
  Button,
  useToast,
} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {categories_request} from '../../api/categories_request';
import {useQuery} from 'react-query';
import SvgUri from 'react-native-svg-uri-updated';
import {tags_request} from '../../api/tags_request';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';
import {API_URL} from '../../../consts';
import Item from './item';
const Search: React.FC<any> = ({route}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {searchQuery} = route.params;
  const navigation = useNavigation();
  const [selectedCategories, setSelectedCategories] = React.useState<
    Array<any>
  >([]);
  const toast = useToast();
  const [selectedTags, setSelectedTags] = React.useState<Array<any>>([]);
  const [query, setQuery] = React.useState<string>(searchQuery);
  const [products, setProducts] = React.useState<any>(undefined);
  const [isLoader, setLoader] = React.useState<boolean>(false);
  React.useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  const {colors} = useTheme();

  const {data: categories} = useQuery('categories', categories_request);
  const {data: tags} = useQuery('tags', tags_request);

  const toggleCategory = (id: number) => {
    const find = selectedCategories.findIndex((cat: number) => cat === id);
    if (find !== -1) {
      setSelectedCategories(prevState =>
        prevState.filter(prevItem => prevItem !== id),
      );
      return;
    }

    setSelectedCategories((prevState: Array<any>[]) => [...prevState, id]);
  };
  const toggleTags = (id: number) => {
    const find = selectedTags.findIndex((tag: number) => tag === id);
    if (find !== -1) {
      setSelectedTags(prevState =>
        prevState.filter(prevItem => prevItem !== id),
      );
      return;
    }
    setSelectedTags((prevState: Array<any>[]) => [...prevState, id]);
  };

  const checkBGCatColor = (id: number) => {
    if (selectedCategories.find((cat: number) => cat === id)) {
      return 'primary.500';
    } else {
      return isDarkMode ? '#333' : 'white';
    }
  };
  const checkFGCatColor = (id: number) => {
    if (selectedCategories.find((cat: number) => cat === id)) {
      return 'white';
    } else {
      return colors.primary['500'];
    }
  };

  const checkBGTagColor = (id: number) => {
    if (selectedTags.find((cat: number) => cat === id)) {
      return 'primary.500';
    } else {
      return isDarkMode ? '#333' : 'white';
    }
  };
  const checkFGTagColor = (id: number) => {
    if (selectedTags.find((cat: number) => cat === id)) {
      return 'white';
    } else {
      return colors.primary['500'];
    }
  };

  const search = () => {
    setLoader(true);

    const catLength = selectedCategories.length;
    let url = `${API_URL}/api/products?filters[$and]`;
    if (selectedCategories.length > 0) {
      selectedCategories.forEach((cat: number, index: number) => {
        if (index > 0) {
          url += `&filters[$and][${index}][categories][id][$in]=${cat}`;
        } else {
          url += `[${index}][categories][id][$in]=${cat}`;
        }
      });
    }
    if (selectedTags.length > 0) {
      selectedTags.forEach((tag: number, index: number) => {
        if (selectedCategories.length > 0) {
          url += `&filters[$and][${index + catLength}][tags][id][$in]=${tag}`;
        } else {
          if (index > 0) {
            url += `&filters[$and][${index + catLength}][tags][id][$in]=${tag}`;
          } else {
            url += `[${index + catLength}][tags][id][$in]=${tag}`;
          }
        }
      });
    }
    const totalLengths = selectedCategories.length + selectedTags.length;
    if (query !== '') {
      if (totalLengths > 0) {
        url += `&filters[$and][${totalLengths}][name][$contains]=${query}`;
      } else {
        url += `[${totalLengths}][name][$contains]=${query}`;
      }
    }
    url += '&populate=*';
    if (totalLengths === 0 && query === '') {
      toast.show({
        bg: 'danger.500',
        title: 'No Search Option Selected',
        placement: 'top',
      });
      setLoader(false);
      return;
    }
    console.log(url);
    axios
      .get(url)
      .then(res => {
        setLoader(false);
        setProducts(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      <Box safeArea marginBottom={24}>
        <Header />
        <Container marginTop={2} width="100%" mx="auto">
          <Box width="100%">
            <Box>
              <Box flexDir={'row'} width="100%" alignItems={'center'}>
                <BackButton />
                <Text
                  fontSize={24}
                  marginTop={2}
                  fontWeight={800}
                  color={isDarkMode ? '#FFF' : '#000'}
                  fontFamily={'Cairo'}>
                  ??????????
                </Text>
              </Box>
              <Box marginTop={2}>
                <Input
                  p={2}
                  width="100%"
                  fontFamily={'Cairo'}
                  bg={isDarkMode ? '#333' : '#FFF'}
                  color={isDarkMode ? '#FFF' : '#000'}
                  borderColor={isDarkMode ? '#333' : 'gray.400'}
                  fontSize={12}
                  paddingRight="6"
                  type={'text'}
                  value={query}
                  onChangeText={value => setQuery(value)}
                  textAlign="right"
                  placeholder="???????? ?????? ???????? ???????? ???????????? ???? ?????? "
                  InputRightElement={
                    <>
                      {isLoader ? (
                        <Spinner marginRight="14" />
                      ) : (
                        <TouchableOpacity
                          style={{padding: 4}}
                          onPress={() => search()}>
                          <Svg
                            width="16"
                            height="17"
                            style={{marginRight: 14}}
                            viewBox="0 0 16 17"
                            fill="none">
                            <Path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11.4601 10.8188L15.7639 15.1227C15.9151 15.2741 16.0001 15.4793 16 15.6933C15.9999 15.9074 15.9148 16.1126 15.7635 16.2639C15.6121 16.4151 15.4068 16.5001 15.1928 16.5C14.9788 16.4999 14.7736 16.4148 14.6223 16.2635L10.3185 11.9595C9.03194 12.9561 7.41407 13.425 5.79403 13.271C4.17398 13.117 2.67346 12.3516 1.59771 11.1305C0.521957 9.90935 -0.0482098 8.32428 0.00319691 6.6977C0.0546036 5.07112 0.723722 3.52522 1.87443 2.37448C3.02514 1.22374 4.57101 0.554605 6.19754 0.503197C7.82408 0.451789 9.40911 1.02197 10.6302 2.09775C11.8513 3.17352 12.6167 4.67409 12.7707 6.29417C12.9247 7.91426 12.4558 9.53217 11.4593 10.8188H11.4601ZM6.4003 11.6996C7.67328 11.6996 8.89412 11.1939 9.79425 10.2937C10.6944 9.39354 11.2001 8.17267 11.2001 6.89966C11.2001 5.62665 10.6944 4.40577 9.79425 3.50562C8.89412 2.60546 7.67328 2.09976 6.4003 2.09976C5.12732 2.09976 3.90648 2.60546 3.00634 3.50562C2.10621 4.40577 1.60052 5.62665 1.60052 6.89966C1.60052 8.17267 2.10621 9.39354 3.00634 10.2937C3.90648 11.1939 5.12732 11.6996 6.4003 11.6996Z"
                              fill="#3F636E"
                            />
                          </Svg>
                        </TouchableOpacity>
                      )}
                    </>
                  }
                />
              </Box>
              <Box marginTop={7}>
                <Text
                  fontFamily={'Cairo'}
                  fontSize={20}
                  fontWeight={600}
                  color={isDarkMode ? '#FFF' : '#000'}
                  textAlign={'left'}>
                  ?????????????????? ????????????????
                </Text>
                <Box flexDir={'row'} flexWrap={'wrap'}>
                  {categories?.data.data.map((item: any, index: number) => {
                    return (
                      <TouchableOpacity
                        key={`item-${index}`}
                        onPress={() => toggleCategory(item.id)}
                        style={{marginTop: 14, marginLeft: 6}}>
                        <Box
                          shadow={3}
                          borderRadius={24}
                          bg={checkBGCatColor(item.id)}>
                          <Box
                            py={2}
                            px={3}
                            flexDir={'row'}
                            alignItems={'center'}>
                            <SvgUri
                              width={16}
                              height={16}
                              fill={checkFGCatColor(item.id)}
                              source={{
                                uri: `${item.attributes.icon.data.attributes.url}`,
                              }}
                            />

                            <Text
                              marginLeft={3}
                              fontFamily={'Cairo'}
                              fontSize={12}
                              color={checkFGCatColor(item.id)}
                              fontWeight={600}>
                              {item.attributes.name}
                            </Text>
                          </Box>
                        </Box>
                      </TouchableOpacity>
                    );
                  })}
                </Box>
              </Box>

              <Box marginTop={7}>
                <Text
                  fontFamily={'Cairo'}
                  fontSize={20}
                  fontWeight={600}
                  color={isDarkMode ? '#FFF' : '#000'}
                  textAlign={'left'}>
                  ????????????{' '}
                </Text>

                <Box flexDir={'row'} flexWrap={'wrap'}>
                  {tags?.data.data.map((item: any, index: number) => {
                    return (
                      <TouchableOpacity
                        key={`item-${index}`}
                        onPress={() => toggleTags(item.id)}
                        style={{marginTop: 14, marginLeft: 8}}>
                        <Box
                          shadow={2}
                          borderColor="primary.500"
                          borderWidth={1}
                          borderRadius={8}
                          bg={checkBGTagColor(item.id)}>
                          <Box
                            py={2}
                            px={3}
                            flexDir={'row'}
                            alignItems={'center'}>
                            <Text
                              fontFamily={'Cairo'}
                              fontSize={12}
                              color={checkFGTagColor(item.id)}
                              fontWeight={600}>
                              {item.attributes.name}
                            </Text>
                          </Box>
                        </Box>
                      </TouchableOpacity>
                    );
                  })}
                </Box>
              </Box>
            </Box>
            {/* </Animated.View> */}
          </Box>
        </Container>

        {/* Products */}
        {products !== undefined && (
          <Text px="4" fontFamily={'Cairo'} marginTop={6} fontWeight={600}>
            Results Found: {products?.data.meta.pagination.total}
          </Text>
        )}
        <Box
          marginTop={6}
          px="4"
          my={2}
          flexDir={'row'}
          justifyContent={'space-between'}
          width="100%"
          mx="auto">
          {products?.data.data.map((item: any, index: number) => {
            return (
              <Item key={item.attributes.slug} item={item} index={index} />
            );
          })}
        </Box>

        {/* Old Products Code Can be added here */}
      </Box>
    </ScrollView>
  );
};

export default Search;
