import {Dimensions, Image, StatusBar, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {
  Box,
  Container,
  HStack,
  Row,
  Pressable,
  Text,
  Button,
  ScrollView,
  Tag,
  useToast,
} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from 'react-query';
import {product_request} from '../../api/product_request';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import axios from 'axios';
import {GetData} from '../../plugins/storage';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
};
type NavProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Product: React.FC<NavProps> = ({route, navigation}) => {
  const {slug} = route.params;
  const insets = useSafeAreaInsets();
  const toast = useToast();

  const [user, setUser] = React.useState<any>(null);

  useEffect(() => {
    GetData('user').then(res => {
      if (res !== undefined) {
        setUser(JSON.parse(res));
      }

      // console.log(JSON.parse(res).user);
    });
  }, []);

  const {data: product} = useQuery(['product', slug], product_request);

  const addToFav = () => {
    // console.log(product?.data.data[0]);
    axios
      .get(
        `http://localhost:1337/api/favourites?filters[users_permissions_user][id][$eq]=${user.user.id}&filters[product][id][$eq]=${product?.data.data[0].id}&populate=*`,
      )
      .then(res => {
        if (res.data.data.length === 0) {
          console.log({
            users_permissions_user: user.user.id,
            product: product?.data.data[0].id,
          });
          axios
            .post('http://localhost:1337/api/favourites', {
              data: {
                users_permissions_user: user.user.id,
                product: product?.data.data[0].id,
              },
            })
            .then(_ => {
              toast.show({
                bg: 'primary.500',
                title: 'Added to Favourites',
                placement: 'top',
              });
            });
        } else {
          toast.show({
            bg: 'danger.500',
            title: 'Already Added to Favourites',
            placement: 'top',
          });
        }
        // console.log(res.data);
      });
    // let userFav =
    //   product?.data.data[0].attributes.favourites.data[0].attributes
    //     .users_permissions_user;
    // let productsFav =
    //   product?.data.data[0].attributes.favourites.data.attributes.products;
    // console.log(userFav);
    // console.log(
    //   product?.data.data[0].attributes.favourites.data[0].attributes
    //     .users_permissions_user.data.id,
    // );
    //http://localhost:1337/api/favourites?filters[users_permissions_user][id][$eq]=11&populate=*
  };

  return (
    <>
      <ScrollView marginBottom={36}>
        <Box safeArea backgroundColor={'#FAFAFA'} flex="1" paddingBottom={12}>
          <StatusBar
            animated={true}
            barStyle={'dark-content'}
            backgroundColor="#FAFAFA"
          />

          <Header />

          <Box mx="auto" width="100%">
            <Image
              style={{
                height: Dimensions.get('window').height * 0.31,
                width: '100%',
                resizeMode: 'cover',
              }}
              source={require('../../../assets/images/product.jpg')}
            />
            <Button
              onPress={() => navigation.goBack()}
              position={'absolute'}
              left={5}
              top={5}
              bg="#FFF"
              shadow={1}
              colorScheme={'dark'}
              textAlign={'center'}
              alignContent={'center'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={3}>
              <Svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <Path
                  d="M1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM5 5L5.53033 5.53033C5.82322 5.23744 5.82322 4.76256 5.53033 4.46967L5 5ZM0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L0.46967 8.46967ZM0.46967 1.53033L4.46967 5.53033L5.53033 4.46967L1.53033 0.46967L0.46967 1.53033ZM4.46967 4.46967L0.46967 8.46967L1.53033 9.53033L5.53033 5.53033L4.46967 4.46967Z"
                  fill="#272727"
                />
              </Svg>
            </Button>
          </Box>
          <Container mx="auto" width="100%">
            <Box alignItems={'flex-end'} width={'100%'}>
              {/* {JSON.stringify()} */}
              {/* {JSON.stringify(
                product?.data.data[0].attributes.favourites.data[0].attributes
                  .users_permissions_user.data.attributes.email,
              )}
              {JSON.stringify(user.user.email)} */}

              <Button
                onPress={() => addToFav()}
                bg={'primary.500'}
                p={0}
                padding={3}
                colorScheme={'primary'}
                marginTop={-6}>
                <Svg width="30" height="29" viewBox="0 0 30 29" fill="none">
                  <Path
                    d="M29.3492 13.0263C29.9398 12.4508 30.1482 11.6061 29.8935 10.821C29.6382 10.0358 28.9732 9.47534 28.1562 9.3564L20.8921 8.30091C20.5828 8.25586 20.3154 8.06182 20.1773 7.78128L16.9297 1.19906C16.5651 0.45956 15.825 0 15.0002 0C14.1759 0 13.4358 0.45956 13.0712 1.19906L9.82304 7.78128C9.68488 8.06182 9.41695 8.25586 9.10757 8.30091L1.84352 9.357C1.02713 9.47534 0.362117 10.0358 0.106806 10.821C-0.147905 11.6061 0.0605493 12.4508 0.651069 13.0263L5.90687 18.1493C6.13095 18.368 6.23367 18.6828 6.18081 18.9903L4.94029 26.225C4.80092 27.0377 5.12832 27.8433 5.79574 28.3287C6.46255 28.8147 7.33061 28.8778 8.0617 28.4927L14.558 25.077C14.835 24.9316 15.1654 24.9316 15.4423 25.077L21.9392 28.4927C22.2564 28.6597 22.6 28.742 22.9418 28.742C23.3858 28.742 23.8279 28.6032 24.2052 28.3287C24.8726 27.8433 25.2 27.0377 25.0606 26.225L23.8195 18.9909C23.7666 18.6828 23.8694 18.3686 24.0934 18.1499L29.3492 13.0263ZM22.6361 19.194L23.8766 26.428C23.939 26.792 23.7979 27.1399 23.4987 27.3573C23.1989 27.5742 22.8259 27.6006 22.4985 27.43L16.0016 24.0137C15.6886 23.8497 15.3438 23.7668 15.0002 23.7668C14.6565 23.7668 14.3123 23.8497 13.9987 24.0143L7.50302 27.43C7.17442 27.6006 6.80136 27.5742 6.5022 27.3573C6.20303 27.1399 6.06246 26.7926 6.12434 26.428L7.36485 19.194C7.4844 18.4959 7.25311 17.7835 6.74609 17.2897L1.48969 12.166C1.22477 11.9077 1.13466 11.5437 1.2494 11.1922C1.36354 10.8402 1.65009 10.5987 2.01593 10.5452L9.27938 9.48976C9.98044 9.38824 10.5866 8.9485 10.8996 8.31293L14.1477 1.73071C14.3111 1.3991 14.6301 1.20146 14.9996 1.20146C15.3696 1.20146 15.688 1.3991 15.852 1.73071L19.1001 8.31293C19.4131 8.9485 20.0187 9.38824 20.7197 9.48976L27.9838 10.5452C28.3496 10.5987 28.6362 10.8402 28.7503 11.1922C28.8644 11.5437 28.7749 11.9077 28.51 12.166L23.2542 17.2891C22.7472 17.7835 22.5159 18.4953 22.6361 19.194Z"
                    fill="white"
                  />
                </Svg>
              </Button>
            </Box>
            <Box flexDirection={'row'} marginTop={-1}>
              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#3F636E',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 4,
                }}
                activeOpacity={0.7}>
                <Text color="#FFF" fontFamily={'Cairo'}>
                  طازج
                </Text>
              </TouchableOpacity> */}

              {product?.data.data[0].attributes.tags.data.map((tag, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#3F636E',
                      marginLeft: index !== 0 ? 5 : 0,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 4,
                    }}
                    activeOpacity={0.7}>
                    <Text color="#FFF" fontFamily={'Cairo'}>
                      {tag.attributes.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Box>

            <Box marginTop={4}>
              {product?.data.data[0].attributes.categories.data.map(
                (cat, index) => {
                  return (
                    <Text
                      textAlign={'left'}
                      color="gray.400"
                      fontFamily={'Cairo'}
                      fontSize="10"
                      fontWeight={500}>
                      {cat.attributes.name}{' '}
                      {index !==
                      product?.data.data[0].attributes.categories.data.length -
                        1
                        ? ','
                        : ''}
                    </Text>
                  );
                },
              )}
              <Text
                textAlign={'left'}
                marginTop={1}
                fontFamily={'Cairo'}
                fontWeight={800}
                fontSize={20}>
                {product?.data.data[0].attributes.name}
              </Text>
            </Box>
            <Box
              marginTop={5}
              borderTopColor={'gray.300'}
              borderTopWidth={1}
              borderBottomColor={'gray.300'}
              borderBottomWidth={1}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              py={5}
              width="100%">
              <Text fontSize={16} fontFamily={'Cairo'} fontWeight="700">
                الكمية المطلوبة
              </Text>
              <Box flexDirection={'row'} alignItems={'center'}>
                <Button
                  p={0}
                  height={36}
                  width={36}
                  colorScheme={'primary'}
                  bg={'primary.500'}>
                  +
                </Button>
                <Text px={3} fontWeight={600} fontFamily={'Cairo'}>
                  250 غرام
                </Text>
                <Button height={36} width={36} variant={'outline'} p={0}>
                  -
                </Button>
              </Box>
            </Box>

            <Box marginTop={3}>
              <Box py={3} flexDir={'row'}>
                <Text
                  fontFamily={'Cairo'}
                  color={'primary.500'}
                  fontWeight={800}>
                  التفاصيل المنتج
                </Text>
                <Text
                  marginLeft={5}
                  fontFamily={'Cairo'}
                  fontWeight={400}
                  color={'gray.400'}>
                  العروض على المنتج
                </Text>
              </Box>
              <Text fontFamily={'Cairo'} textAlign={'left'}>
                {product?.data.data[0].attributes.description}
              </Text>
            </Box>
            <Box>
              <Text
                fontFamily={'Cairo'}
                marginTop={6}
                fontSize="xl"
                fontWeight={800}>
                منتجات ذات صلة
              </Text>
            </Box>

            <Row flex="1" marginTop={4}>
              <Box
                width={180}
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
                  source={require('../../../assets/images/banner.jpg')}
                />
                <Box py={2} px={3}>
                  <Text
                    color="gray.400"
                    fontFamily={'Cairo'}
                    fontSize="10"
                    fontWeight={500}>
                    المكسرات والبسكويت، المكسرات المحمصة المكسرات والبسكويت
                  </Text>
                  <Text
                    color="black"
                    fontFamily={'Cairo'}
                    fontSize="16"
                    marginTop={2}
                    fontWeight={700}>
                    اسم المنتج بشكل مطول يصل لسطرين
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
                        +
                      </Button>
                      <Text px="3" fontSize={12} fontWeight={500}>
                        x1
                      </Text>

                      <Button height="6" variant="outline" width="6" p="0">
                        -
                      </Button>
                    </Box>
                    <Box flexDirection="row" justifyContent={'flex-end'}>
                      <Text fontWeight={700} fontSize={17}>
                        5.50
                      </Text>
                      <Text fontSize={10} fontWeight={700} marginTop={2}>
                        ₪
                      </Text>
                    </Box>
                  </Box>

                  <Box marginTop="4">
                    <Pressable>
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
            </Row>
          </Container>
        </Box>
      </ScrollView>
      <Box
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom,
        }}
        bg="#FFF"
        shadow={2}
        py={3}
        borderRadius={12}
        margin={2}
        marginTop={6}>
        <Container mx="auto" width="100%">
          <Box
            flexDirection={'row-reverse'}
            alignItems={'center'}
            width="100%"
            justifyContent={'space-between'}>
            <Box>
              <Box flexDirection="row" justifyContent={'flex-end'}>
                <Text fontWeight={700} fontSize={24}>
                  {product?.data.data[0].attributes.price}
                </Text>
                <Text fontSize={16} fontWeight={700} marginTop={2}>
                  ₪
                </Text>
              </Box>
            </Box>

            <Pressable>
              {({isPressed}) => {
                return (
                  <Box
                    py="3"
                    flexDirection="row"
                    justifyContent={'center'}
                    alignItems={'center'}
                    bg={isPressed ? 'primary.700' : 'primary.500'}
                    p="5"
                    rounded="4"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Svg width="25" height="14" viewBox="0 0 25 14" fill="none">
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
                    <Text color="#FFF" marginLeft={2} fontFamily={'Cairo'}>
                      إضافة الى السلة
                    </Text>
                  </Box>
                );
              }}
            </Pressable>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Product;
