import React, {ReactNode, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Pressable,
  Text,
  useDisclose,
  useTheme,
} from 'native-base';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useQuery} from 'react-query';
import {
  categories_product_request,
  categories_request,
} from '../../api/categories_request';
import {Actionsheet} from 'native-base';
// import {RangeSlider} from '@sharcoux/slider';
// import RangeSlider from 'rn-range-slider';
import RangeSlider from 'react-native-range-slider-expo';
import {useNavigation} from '@react-navigation/native';

const CategoryView = ({route}: any) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(5000);
  //   const [value, setValue] = useState(0);
  const {colors} = useTheme();
  const {slug} = route.params;
  const navigation = useNavigation();
  const {data} = useQuery('categories', categories_request);

  //  const filters =

  const {data: products} = useQuery(
    ['products', slug],
    categories_product_request,
  );

  const {isOpen, onOpen, onClose} = useDisclose();
  return (
    <ScrollView>
      <Box safeArea>
        <Header />
        {/* {slug} */}
        <Container paddingBottom={4} mx="auto" width="100%">
          <Box
            flexDir={'row'}
            justifyContent={'space-between'}
            width="100%"
            marginTop={4}
            alignItems={'center'}>
            <Box flexDir={'row'} alignItems={'center'}>
              <BackButton />
              <Text
                marginLeft={1}
                fontFamily={'Cairo'}
                fontSize={22}
                fontWeight={800}>
                تفاصيل الطلب
              </Text>
            </Box>
            <TouchableOpacity onPress={onOpen}>
              <Svg width="18" height="19" viewBox="0 0 18 19" fill="none">
                <Path
                  d="M17 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V3.59C0 4.113 0.213 4.627 0.583 4.997L6 10.414V18C6.0002 18.1704 6.04387 18.3379 6.1269 18.4867C6.20992 18.6354 6.32955 18.7605 6.47444 18.8502C6.61934 18.9398 6.78471 18.9909 6.9549 18.9988C7.1251 19.0066 7.29447 18.9709 7.447 18.895L11.447 16.895C11.786 16.725 12 16.379 12 16V10.414L17.417 4.997C17.787 4.627 18 4.113 18 3.59V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0ZM10.293 9.293C10.2 9.38571 10.1262 9.4959 10.0759 9.61724C10.0256 9.73857 9.99981 9.86866 10 10V15.382L8 16.382V10C8.00019 9.86866 7.9744 9.73857 7.92412 9.61724C7.87383 9.4959 7.80004 9.38571 7.707 9.293L2 3.59V2H16.001L16.003 3.583L10.293 9.293Z"
                  fill="#272727"
                />
              </Svg>
            </TouchableOpacity>
          </Box>
        </Container>

        <ScrollView
          style={{width: '100%', backgroundColor: 'rgba(63, 99, 110, 0.06);'}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <Box flexDir={'row'}>
            {data?.data.data.map((item: any): ReactNode => {
              return (
                <TouchableOpacity style={{marginLeft: 15, paddingVertical: 15}}>
                  <Box>
                    <Text
                      color="secondary.600"
                      fontWeight={900}
                      fontFamily={'Cairo'}
                      fontSize={16}>
                      {item.attributes.name}
                    </Text>
                  </Box>
                </TouchableOpacity>
              );
            })}
          </Box>
        </ScrollView>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Text
              fontFamily={'Cairo'}
              fontWeight={800}
              paddingTop={2}
              fontSize={20}>
              تصنيف
            </Text>
            <Box width="100%">
              <Text
                textAlign={'left'}
                fontFamily={'Cairo'}
                fontSize={16}
                fontWeight={600}>
                حسب السعر
              </Text>
              <Box
                marginTop={4}
                flexDir={'row'}
                justifyContent={'space-between'}
                width="100%">
                <Box width="48%" flexDir={'row'} alignItems={'center'}>
                  <Box width="12%" marginRight={1}>
                    <Text fontFamily={'Cairo'} color="gray.400">
                      من
                    </Text>
                  </Box>
                  <Box width="85%">
                    <Input placeholder="00.00" value={toValue.toString()} />
                  </Box>
                </Box>
                <Box width="48%" flexDir={'row'} alignItems={'center'}>
                  <Box width="12%" marginRight={1}>
                    <Text fontFamily={'Cairo'} color="gray.400">
                      إلى
                    </Text>
                  </Box>
                  <Box width="85%">
                    <Input placeholder="00.00" value={fromValue.toString()} />
                  </Box>
                </Box>
              </Box>

              {/* <RangeSlider
              style={{width: 160, height: 80}}
              gravity={'center'}
              min={200}
              max={1000}
              step={20}
              selectionColor="#3df"
              blankColor="#f618"
            /> */}
              <Box height={10} my={5} width="100%">
                <RangeSlider
                  styleSize={16}
                  containerStyle={{paddingVertical: 0}}
                  min={0}
                  max={5000}
                  toKnobColor={colors.primary['500']}
                  fromKnobColor={colors.primary['500']}
                  fromValueOnChange={val => setFromValue(val)}
                  toValueOnChange={val => setToValue(val)}
                  initialFromValue={0}
                  inRangeBarColor={colors.primary['200']}
                />
              </Box>
              <Box marginTop={4}>
                <Text
                  textAlign={'left'}
                  fontFamily={'Cairo'}
                  fontSize={16}
                  fontWeight={600}>
                  حسب الوسوم
                </Text>
                <TouchableOpacity>
                  <Text>حسب الوسوم</Text>
                </TouchableOpacity>
              </Box>

              <Box marginTop={4}>
                <Text
                  textAlign={'left'}
                  fontFamily={'Cairo'}
                  fontSize={16}
                  fontWeight={600}>
                  الترتيب حسب
                </Text>
                <TouchableOpacity>
                  <Text>حسب الوسوم</Text>
                </TouchableOpacity>
              </Box>
            </Box>
            <Button
              width="80%"
              marginTop={6}
              bg="primary.500"
              colorScheme={'primary'}>
              <Text color="#FFF" fontFamily={'Cairo'}>
                Apply
              </Text>
            </Button>
            {/* <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item> */}
          </Actionsheet.Content>
        </Actionsheet>

        {/* Products */}
        <Box
          marginTop={6}
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

export default CategoryView;
