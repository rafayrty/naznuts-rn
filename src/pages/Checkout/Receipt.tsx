import React from 'react';
import {Box, Text, Container, ScrollView, Image} from 'native-base';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {GetData} from '../../plugins/storage';
import Home from '../../icons/Home';
import Office from '../../icons/Office';
import Marker from '../../icons/Marker';

const Receipt = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [cartItems, setCartItems] = React.useState<any>([]);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [address, setSelectedAdddress] = React.useState<any>(undefined);
  const [deliveryFee, setDeliveryFee] = React.useState<number>(0);

  const updateTotalPrice = (result: any) => {
    let total = 0;
    result.forEach((item: any) => {
      total += item.attributes.price;
    });
    setTotalPrice(total);
  };

  React.useEffect(() => {
    GetData('cart').then(res => {
      if (res !== undefined && res !== null) {
        setCartItems(JSON.parse(res));
        // console.log(JSON.parse(res));
        updateTotalPrice(JSON.parse(res));
        GetData('address').then((result: any) => {
          if (result !== undefined && result !== null) {
            setSelectedAdddress(JSON.parse(result));
            setDeliveryFee(
              JSON.parse(result).attributes.city.data.attributes.delivery_fee,
            );
          }
        });
      }
    });
  }, []);

  return (
    <>
      <ScrollView>
        <Box safeArea paddingBottom={1}>
          <Header />

          <Container mx="auto" width="100%">
            <Box width="100%">
              <Box
                marginTop={4}
                flexDir={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Box flexDir={'row'} alignItems={'center'}>
                  <BackButton />
                  <Text
                    color={isDarkMode ? '#FFF' : '#000'}
                    marginLeft={0}
                    fontFamily={'Cairo'}
                    fontSize={22}
                    fontWeight={800}>
                    الفاتورة
                  </Text>
                </Box>
                <Text color="gray.400" fontFamily={'Cairo'}>
                  ({cartItems.length}) عناصر
                </Text>
              </Box>
              {/* Selected Address */}
              <Box
                bg={isDarkMode ? '#333' : '#FFF'}
                shadow={3}
                flexDir={'row'}
                justifyContent={'space-between'}
                borderRadius={10}
                my={3}
                mx={1}
                py={3}
                marginTop={5}
                px={5}>
                <Box flexDir={'row'} alignItems={'center'}>
                  <Box
                    bg="primary.500"
                    height={26}
                    width={26}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderRadius={100}>
                    {address?.attributes.type === 'Home' && (
                      <Home color={isDarkMode ? '#333' : '#FFF'} />
                    )}
                    {address?.attributes.type === 'Office' && (
                      <Office color={isDarkMode ? '#333' : '#FFF'} />
                    )}
                    {address?.attributes.type === 'Other' && (
                      <Marker color={isDarkMode ? '#333' : '#FFF'} />
                    )}
                    {/* <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <Path
                        d="M14.2169 8.92578L14.2364 13.6162C14.2364 13.6982 14.2308 13.7744 14.2225 13.8535V14.3281C14.2225 14.9756 13.7252 15.5 13.1114 15.5H12.6669C12.6364 15.5 12.6058 15.4736 12.5752 15.4971C12.5364 15.4736 12.4975 15.5 12.4586 15.5H10.8891C10.2752 15.5 9.77802 14.9756 9.77802 14.3281V11.75C9.77802 11.2314 9.3808 10.8125 8.88913 10.8125H7.11136C6.61969 10.8125 6.22247 11.2314 6.22247 11.75V14.3281C6.22247 14.9756 5.72524 15.5 5.11136 15.5H3.55858C3.51691 15.5 3.47524 15.4971 3.43358 15.4941C3.40024 15.4971 3.36691 15.5 3.33358 15.5H2.88913C2.27552 15.5 1.77802 14.9756 1.77802 14.3281V11.0469C1.77802 11.0205 1.77886 10.9912 1.78052 10.9648V8.92578H0.890522C0.389689 8.92578 0.000244141 8.5127 0.000244141 7.98535C0.000244141 7.72168 0.0836886 7.4873 0.2783 7.28223L7.40024 0.734844C7.59469 0.529355 7.81691 0.5 8.01136 0.5C8.2058 0.5 8.42802 0.558711 8.59747 0.705488L11.5558 3.4502V2.375C11.5558 1.85732 11.953 1.4375 12.4447 1.4375H13.3336C13.8252 1.4375 14.2225 1.85732 14.2225 2.375V5.91992L15.6891 7.28223C15.9114 7.4873 16.0252 7.72168 15.9947 7.98535C15.9947 8.5127 15.578 8.92578 15.1058 8.92578H14.2169Z"
                        fill="white"
                      />
                    </Svg> */}
                  </Box>
                  <Text
                    marginLeft={2}
                    fontSize={14}
                    fontWeight={800}
                    color="primary.500"
                    fontFamily={'Cairo'}>
                    {address?.attributes.name}
                  </Text>
                </Box>
                <Box>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddressCheckout')}>
                    <Text
                      my={1}
                      textAlign={'left'}
                      color={isDarkMode ? '#FFF' : '#000'}
                      fontFamily={'Cairo'}>
                      تعديل{' '}
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>

              <Box marginTop={5}>
                <Text
                  fontFamily={'Cairo'}
                  fontWeight={700}
                  fontSize={16}
                  color={isDarkMode ? '#FFF' : '#000'}
                  textAlign={'left'}>
                  تفاصيل الطلب
                </Text>
                {/* Order Products */}

                {cartItems.map((item: any, index: number) => {
                  return (
                    <Box
                      key={`item-${index}`}
                      marginTop={4}
                      flexDir={'row'}
                      alignItems="center"
                      justifyContent={'space-between'}>
                      <Box flexDir={'row'} alignItems="center">
                        <Image
                          accessibilityLabel={item.attributes.name}
                          alt={item.attributes.name}
                          source={{
                            uri: `${item.attributes.image.data.attributes.url}`,
                          }}
                          style={{width: 68, height: 57}}
                        />
                        <Box marginLeft={4}>
                          <Text
                            color={isDarkMode ? '#FFF' : '#000'}
                            fontFamily={'Cairo'}
                            textAlign={'left'}
                            fontWeight={700}
                            fontSize={14}>
                            {item.attributes.name}
                          </Text>
                          <Box width="100%" flex="1" py={2} flexDir={'row'}>
                            {item.attributes.categories.data.map(
                              (cat: any, ind: number) => {
                                return (
                                  <Text
                                    key={`item-${ind}`}
                                    textAlign={'left'}
                                    flexWrap={'wrap'}
                                    color="gray.400"
                                    fontFamily={'Cairo'}
                                    fontSize="10"
                                    fontWeight={500}>
                                    {cat.attributes.name}{' '}
                                    {ind !==
                                    item.attributes.categories.data.length - 1
                                      ? ','
                                      : ''}
                                  </Text>
                                );
                              },
                            )}
                          </Box>
                        </Box>
                      </Box>
                      <Box paddingLeft={2} alignItems={'center'}>
                        <Text
                          fontSize={16}
                          fontWeight={800}
                          color="primary.500"
                          fontFamily={'Cairo'}>
                          ₪{item.attributes.price}
                        </Text>
                        <Text
                          color={isDarkMode ? '#FFF' : '#000'}
                          fontSize={12}
                          fontWeight={500}
                          fontFamily={'Cairo'}>
                          {item?.attributes.type === 'weight'
                            ? item.quantity >= 1000
                              ? item.quantity / 1000 + ' كلغ'
                              : item.quantity + ' غرام'
                            : 'x' + item.quantity}
                        </Text>
                      </Box>
                    </Box>
                  );
                })}
                {/* Coupon System */}
                {/* <Box
                  marginTop={6}
                  width="100%"
                  bg="white"
                  py={1}
                  px={1}
                  borderRadius={8}
                  justifyContent={'space-between'}
                  flexDirection="row">
                  <Input
                    width="68%"
                    bg="white"
                    borderWidth={0}
                    textAlign={'right'}
                    fontFamily={'Cairo'}
                    placeholder="ادخل هنا كوبون للخصم"
                  />
                  <Button
                    width="30%"
                    colorScheme={'secondary'}
                    bg="secondary.500">
                    <Text fontSize={12} fontFamily={'Cairo'} color="white">
                      تطبيق الخصم
                    </Text>
                  </Button>
                </Box> */}
                {/* <Box
                  bg="primary.500"
                  py={3}
                  px={4}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                  borderRadius={12}
                  flexDir={'row'}
                  marginTop={6}>
                  <Text
                    fontSize={12}
                    textAlign={'left'}
                    width="80%"
                    fontFamily={'Cairo'}
                    color="white">
                    لقد تم تطبيق كوبون الخصم على الفاتورة خصم 10% من قيمة
                    الفاتورة الكلية
                  </Text>
                  <Box>
                    <TouchableOpacity
                      style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 12,
                        paddingVertical: 7,
                        borderRadius: 4,
                      }}>
                      <Text
                        fontFamily={'Cairo'}
                        color="secondary.500"
                        fontSize={12}
                        p="0">
                        الغاء
                      </Text>
                    </TouchableOpacity>
                  </Box>
                </Box> */}
              </Box>
            </Box>
          </Container>
        </Box>
      </ScrollView>
      <Box
        bg={isDarkMode ? '#333' : '#FFF'}
        paddingBottom={insets.bottom}
        paddingTop={8}
        borderTopRadius={24}
        shadow={2}
        width="100%"
        bottom="0">
        <Container mx="auto" width="100%">
          {/* Order Details */}

          <Box width="100%">
            <Box
              borderBottomWidth={1}
              borderBottomColor={'gray.300'}
              width="100%"
              paddingBottom={2}>
              {/* Price */}

              <Box
                marginTop={2}
                flexDir={'row'}
                justifyContent={'space-between'}>
                <Text fontFamily={'Cairo'} color={isDarkMode ? '#FFF' : '#333'}>
                  {' '}
                  المجموع الكلي{' '}
                </Text>
                <Text
                  color={isDarkMode ? '#FFF' : '#333'}
                  fontFamily={'Cairo'}
                  fontSize={16}
                  fontWeight={800}>
                  ₪ {totalPrice}
                </Text>
              </Box>

              <Box
                marginTop={2}
                flexDir={'row'}
                justifyContent={'space-between'}>
                <Text color={isDarkMode ? '#FFF' : '#333'} fontFamily={'Cairo'}>
                  {' '}
                  تكلفة التوصيل{' '}
                </Text>
                <Text
                  color={isDarkMode ? '#FFF' : '#333'}
                  fontFamily={'Cairo'}
                  fontSize={16}
                  fontWeight={800}>
                  ₪ {deliveryFee}
                </Text>
              </Box>
            </Box>

            <Box
              width="100%"
              py={3}
              flexDir={'row'}
              justifyContent={'space-between'}>
              <Text color={isDarkMode ? '#FFF' : '#333'} fontFamily={'Cairo'}>
                المبلغ النهائي
              </Text>
              <Text
                color="primary.500"
                fontFamily={'Cairo'}
                fontSize={16}
                fontWeight={800}>
                ₪ {totalPrice + deliveryFee}
              </Text>
            </Box>
          </Box>

          <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
            <Box
              bg="secondary.500"
              borderRadius={8}
              flexDir={'row-reverse'}
              alignItems={'center'}
              px={4}
              py={3}
              justifyContent={'space-between'}>
              <Box
                flexDir={'row'}
                width="100%"
                justifyContent={'center'}
                alignItems={'center'}>
                <Text
                  fontWeight={600}
                  fontFamily={'Cairo'}
                  color="white"
                  marginRight={2}>
                  ادفع الآن{' '}
                </Text>

                <Svg width="17" height="8" viewBox="0 0 17 8" fill="none">
                  <Path
                    d="M16 4.5C16.2761 4.5 16.5 4.27614 16.5 4C16.5 3.72386 16.2761 3.5 16 3.5L16 4.5ZM0.646445 3.64645C0.451183 3.84171 0.451183 4.15829 0.646445 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.73079 0.976313 4.73079 0.65973 4.53553 0.464468C4.34027 0.269206 4.02369 0.269206 3.82843 0.464468L0.646445 3.64645ZM16 3.5L0.999999 3.5L0.999999 4.5L16 4.5L16 3.5Z"
                    fill="white"
                  />
                </Svg>
              </Box>
            </Box>
          </TouchableOpacity>
        </Container>
      </Box>
    </>
  );
};

export default Receipt;
