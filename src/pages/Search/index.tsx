import {
  Animated,
  Easing,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
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
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';
const Search = ({route}) => {
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
  // console.log(searchQuery);
  useEffect(() => {
    setQuery(searchQuery);
    // console.log(searchQuery);
  }, [searchQuery]);
  // const slideAnim = React.useRef(new Animated.Value(0)).current;
  // const fadeAnim = React.useRef(new Animated.Value(1)).current;

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 500,
  //     useNativeDriver: false,
  //     easing: Easing.ease,
  //   }).start();
  // };

  // const slideOut = () => {
  //   // Will change fadeAnim value to 0 in 3 seconds
  //   Animated.timing(slideAnim, {
  //     toValue: -200,
  //     duration: 500,
  //     useNativeDriver: false,
  //     easing: Easing.ease,
  //   }).start();
  // };

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
      return 'white';
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
      return 'white';
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
    let url = 'http://localhost:1337/api/products?filters[$and]';
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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     search();
  //     return () => search();
  //   }, []),
  // );
  return (
    <ScrollView>
      <Box safeArea marginBottom={24}>
        <Header />
        <Container marginTop={2} width="100%" mx="auto">
          <Box width="100%">
            {/* <Animated.View
              style={[
                {
                  // Bind opacity to animated value
                  transform: [{translateY: slideAnim}],
                  opacity: fadeAnim,
                },
              ]}> */}
            <Box>
              <Box flexDir={'row'} width="100%" alignItems={'center'}>
                <BackButton />
                <Text
                  fontSize={24}
                  marginTop={2}
                  fontWeight={800}
                  fontFamily={'Cairo'}>
                  البحث
                </Text>
              </Box>
              <Box marginTop={2}>
                <Input
                  p={2}
                  width="100%"
                  fontFamily={'Cairo'}
                  fontSize={12}
                  paddingRight="6"
                  type={'text'}
                  bg="#FFF"
                  value={query}
                  onChangeText={value => setQuery(value)}
                  textAlign="right"
                  placeholder="ابحث هنا مثال قرفة مطحونة او لوز "
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
                  textAlign={'left'}>
                  التصنيفات الرئيسية
                </Text>
                <Box flexDir={'row'} flexWrap={'wrap'}>
                  {categories?.data.data.map((item: any) => {
                    return (
                      <TouchableOpacity
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
                                uri: `http://localhost:1337${item.attributes.icon.data.attributes.url}`,
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
                  textAlign={'left'}>
                  الوسوم{' '}
                </Text>

                <Box flexDir={'row'} flexWrap={'wrap'}>
                  {tags?.data.data.map((item: any) => {
                    return (
                      <TouchableOpacity
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
          marginTop={3}
          px="4"
          flexDir={'row'}
          justifyContent={'space-between'}
          width="100%"
          mx="auto">
          {products?.data.data.map(item => {
            return (
              <Box
                width="48%"
                borderRadius="md"
                bg="#FFF"
                shadow={2}
                borderTopRadius={6}>
                <Image
                  style={{
                    height: 120,
                    width: '100%',
                    resizeMode: 'cover',
                    borderTopRightRadius: 6,
                    borderTopLeftRadius: 6,
                  }}
                  source={{
                    uri: `http://localhost:1337${item.attributes.image.data.attributes.url}`,
                  }}
                />
                <Box py={2} px={3}>
                  {item.attributes.categories.data.map((cat, index) => {
                    return (
                      <Text
                        color="gray.400"
                        fontFamily={'Cairo'}
                        fontSize="10"
                        fontWeight={500}>
                        {cat.attributes.name}{' '}
                        {index !== item.attributes.categories.data.length - 1
                          ? ','
                          : ''}
                      </Text>
                    );
                  })}
                  <Text
                    color="black"
                    fontFamily={'Cairo'}
                    fontSize="16"
                    marginTop={2}
                    fontWeight={700}>
                    {item.attributes.name}
                  </Text>

                  <Text
                    marginTop="3"
                    fontFamily={'Cairo'}
                    fontSize={10}
                    color="gray.400">
                    كمية
                  </Text>
                  <Box
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems="center">
                    <Box
                      flexDirection={'row'}
                      marginTop={2}
                      alignItems="center">
                      <Button height="6" bg="primary.500" width="6" p="0">
                        <Plus color="white" />
                      </Button>
                      <Text px="3" fontSize={12} fontWeight={500}>
                        x1
                      </Text>

                      <Button height="6" variant="outline" width="6" p="0">
                        <Minus color="black" />
                      </Button>
                    </Box>
                    <Box flexDirection="row" justifyContent={'flex-end'}>
                      <Text fontWeight={700} fontSize={17}>
                        {item.attributes.price}
                      </Text>
                      <Text fontSize={10} fontWeight={700} marginTop={2}>
                        ₪
                      </Text>
                    </Box>
                  </Box>

                  <Box marginTop="4">
                    <Pressable
                      onPress={() =>
                        navigation.navigate('Product', {
                          slug: item.attributes.slug,
                        })
                      }>
                      {({isPressed}) => {
                        return (
                          <Box
                            py="3"
                            borderRadius={6}
                            flexDirection="row"
                            justifyContent={'center'}
                            alignItems={'center'}
                            bg={isPressed ? 'primary.700' : 'primary.500'}
                            p="5"
                            rounded="8"
                            style={{
                              transform: [
                                {
                                  scale: isPressed ? 0.96 : 1,
                                },
                              ],
                            }}>
                            <Svg
                              width="25"
                              height="14"
                              viewBox="0 0 25 14"
                              fill="none">
                              <Path
                                d="M14.2377 11.9884C14.2377 12.8232 13.5683 13.5 12.7426 13.5C11.9169 13.5 11.2475 12.8232 11.2475 11.9884C11.2475 11.1535 11.9169 10.4767 12.7426 10.4767C13.5683 10.4767 14.2377 11.1535 14.2377 11.9884Z"
                                fill="white"
                              />
                              <Path
                                d="M19.62 11.9884C19.62 12.8232 18.9506 13.5 18.1249 13.5C17.2992 13.5 16.6298 12.8232 16.6298 11.9884C16.6298 11.1535 17.2992 10.4767 18.1249 10.4767C18.9506 10.4767 19.62 11.1535 19.62 11.9884Z"
                                fill="white"
                              />
                              <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.29388 0.921265C9.4584 0.65895 9.74425 0.5 10.0515 0.5H16.6298C17.1252 0.5 17.5269 0.906067 17.5269 1.40698C17.5269 1.90789 17.1252 2.31395 16.6298 2.31395H11.4661L13.4396 6.54651H17.7056L20.2823 1.02022C20.4304 0.702643 20.7464 0.5 21.0937 0.5H23.2082C23.7036 0.5 24.1052 0.906067 24.1052 1.40698C24.1052 1.90789 23.7036 2.31395 23.2082 2.31395H21.6625L19.0858 7.84024C18.9377 8.15782 18.6217 8.36047 18.2744 8.36047H12.8708C12.5235 8.36047 12.2074 8.15782 12.0593 7.84024L9.24005 1.79373C9.10905 1.51277 9.12936 1.18358 9.29388 0.921265Z"
                                fill="white"
                              />
                              <Path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.03965 2.53125C4.69153 2.53125 5.21998 3.0769 5.21998 3.75V5.375H6.79375C7.44563 5.375 7.97408 5.92065 7.97408 6.59375C7.97408 7.26685 7.44563 7.8125 6.79375 7.8125H5.21998V9.4375C5.21998 10.1106 4.69153 10.6562 4.03965 10.6562C3.38777 10.6562 2.85932 10.1106 2.85932 9.4375V7.8125H1.28555C0.633675 7.8125 0.105225 7.26685 0.105225 6.59375C0.105225 5.92065 0.633675 5.375 1.28555 5.375H2.85932V3.75C2.85932 3.0769 3.38777 2.53125 4.03965 2.53125Z"
                                fill="white"
                              />
                            </Svg>
                            <Text
                              color="#FFF"
                              marginLeft={2}
                              fontFamily={'Cairo'}>
                              إضافة
                            </Text>
                          </Box>
                        );
                      }}
                    </Pressable>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Search;
