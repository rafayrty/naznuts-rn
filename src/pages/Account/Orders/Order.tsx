import React from 'react';
import Header from '../../../components/Header';
import {Box, Container, Text} from 'native-base';
import BackButton from '../../../components/BackButton';
import Svg, {Path} from 'react-native-svg';
import {Image, ScrollView, useColorScheme} from 'react-native';
import {useQuery} from 'react-query';
import {order_request} from '../../../api/orders_request';

const Order: React.FC = ({route}: any) => {
  const {orderid} = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const {data: order} = useQuery(['order', orderid], order_request);
  return (
    <ScrollView>
      <Box safeArea>
        <Header />

        <Container paddingBottom={4} mx="auto" width="100%">
          <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
            <BackButton />
            <Text
              marginLeft={3}
              fontFamily={'Cairo'}
              fontSize={22}
              color={isDarkMode ? '#FFF' : '#000'}
              fontWeight={800}>
              تفاصيل الطلب
            </Text>
          </Box>
          {/* ADDRESS */}
          <Box
            marginTop={4}
            borderRadius={10}
            flexDir={'row'}
            bg={isDarkMode ? '#333' : '#FFF'}
            shadow={2}
            width="100%"
            py={3}
            px={4}
            alignItems={'center'}>
            {/* {orderid} */}
            {/* {JSON.stringify()} */}
            <Box
              bg="primary.500"
              borderRadius={100}
              justifyContent={'center'}
              alignItems={'center'}
              height={34}
              width={34}>
              <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
                <Path
                  d="M14.4388 8.92578L14.4583 13.6162C14.4583 13.6982 14.4527 13.7744 14.4444 13.8535V14.3281C14.4444 14.9756 13.9472 15.5 13.3333 15.5H12.8888C12.8583 15.5 12.8277 15.4736 12.7972 15.4971C12.7583 15.4736 12.7194 15.5 12.6805 15.5H11.1111C10.4972 15.5 9.99995 14.9756 9.99995 14.3281V11.75C9.99995 11.2314 9.60272 10.8125 9.11106 10.8125H7.33328C6.84161 10.8125 6.44439 11.2314 6.44439 11.75V14.3281C6.44439 14.9756 5.94717 15.5 5.33328 15.5H3.7805C3.73883 15.5 3.69717 15.4971 3.6555 15.4941C3.62217 15.4971 3.58883 15.5 3.5555 15.5H3.11106C2.49745 15.5 1.99995 14.9756 1.99995 14.3281V11.0469C1.99995 11.0205 2.00078 10.9912 2.00245 10.9648V8.92578H1.11245C0.611612 8.92578 0.222168 8.5127 0.222168 7.98535C0.222168 7.72168 0.305612 7.4873 0.500224 7.28223L7.62217 0.734844C7.81661 0.529355 8.03883 0.5 8.23328 0.5C8.42772 0.5 8.64995 0.558711 8.81939 0.705488L11.7777 3.4502V2.375C11.7777 1.85732 12.1749 1.4375 12.6666 1.4375H13.5555C14.0472 1.4375 14.4444 1.85732 14.4444 2.375V5.91992L15.9111 7.28223C16.1333 7.4873 16.2472 7.72168 16.2166 7.98535C16.2166 8.5127 15.7999 8.92578 15.3277 8.92578H14.4388Z"
                  fill="white"
                />
              </Svg>
            </Box>
            <Text
              marginLeft={3}
              fontSize={16}
              fontWeight={800}
              color="primary.500"
              fontFamily={'Cairo'}>
              {/* عنوان 1 */}
              {order?.data.data.attributes.address.data.attributes.name}
            </Text>
          </Box>

          <Box marginTop={6}>
            <Text
              color={isDarkMode ? '#FFF' : '#000'}
              fontFamily={'Cairo'}
              fontSize={16}
              fontWeight={800}>
              رقم الطلب #{order?.data.data.id}
            </Text>
          </Box>

          <Box marginTop={4}>
            <Box flexDir={'row'} width="100%">
              <Box width={1} bg="primary.400" />
              <Box width="100%" paddingLeft={4}>
                <Box
                  flexDirection={'row'}
                  alignItems="center"
                  justifyContent="space-between">
                  <Box marginTop={1}>
                    <Text
                      color={isDarkMode ? '#FFF' : '#000'}
                      fontFamily={'Cairo'}
                      fontSize={16}>
                      تسجيل الطلب
                    </Text>
                    <Text
                      fontFamily={'Cairo'}
                      fontSize={12}
                      color="gray.400"
                      marginTop={1}
                      textAlign="left">
                      {/* 20/04/2016 */}
                      {order?.data.data.attributes.createdAt.substr(0, 10)}
                    </Text>
                  </Box>
                  <Text color="gray.400">
                    {order?.data.data.attributes.createdAt.substr(11, 5)}
                  </Text>
                  <Box
                    position={'absolute'}
                    top={0}
                    left={-26}
                    bg="primary.500"
                    width={4}
                    borderRadius={100}
                    height={4}
                  />
                </Box>
              </Box>
            </Box>
            {order?.data.data.attributes.status === 'Processing' ||
              order?.data.data.attributes.status === 'Delivery' ||
              (order?.data.data.attributes.status === 'Delivered' && (
                <Box flexDir={'row'} width="100%">
                  <Box width={1} bg="primary.400" />
                  <Box width="100%" paddingLeft={4}>
                    <Box
                      flexDirection={'row'}
                      alignItems="center"
                      justifyContent="space-between">
                      <Box paddingTop={3}>
                        <Text
                          color={isDarkMode ? '#FFF' : '#000'}
                          fontFamily={'Cairo'}
                          fontSize={16}>
                          تسجيل الطلب
                        </Text>
                        <Text
                          fontFamily={'Cairo'}
                          fontSize={12}
                          color="gray.400"
                          marginTop={1}
                          textAlign="left">
                          {order?.data.data.attributes.processing_date.substr(
                            0,
                            10,
                          )}
                        </Text>
                      </Box>
                      <Text color="gray.400">
                        {' '}
                        {order?.data.data.attributes.processing_date.substr(
                          11,
                          5,
                        )}
                      </Text>
                      <Box
                        position={'absolute'}
                        top={3}
                        left={-26}
                        bg="primary.500"
                        width={4}
                        borderRadius={100}
                        height={4}
                      />
                    </Box>
                  </Box>
                </Box>
              ))}
            {order?.data.data.attributes.status === 'Delivered' && (
              <Box flexDir={'row'} width="100%">
                <Box width={1} bg="primary.400" />
                <Box width="100%" paddingLeft={4}>
                  <Box
                    flexDirection={'row'}
                    alignItems="center"
                    justifyContent="space-between">
                    <Box paddingTop={3}>
                      <Text
                        color={isDarkMode ? '#FFF' : '#000'}
                        fontFamily={'Cairo'}
                        fontSize={16}>
                        تسجيل الطلب
                      </Text>
                      <Text
                        fontFamily={'Cairo'}
                        fontSize={12}
                        color="gray.400"
                        marginTop={1}
                        textAlign="left">
                        {order?.data.data.attributes.delivery_date.substr(
                          0,
                          10,
                        )}
                      </Text>
                    </Box>
                    <Text color="gray.400">
                      {order?.data.data.attributes.delivery_date.substr(11, 5)}
                    </Text>
                    <Box
                      position={'absolute'}
                      top={3}
                      left={-26}
                      bg="primary.500"
                      width={4}
                      borderRadius={100}
                      height={4}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
          <Box
            width={'100%'}
            borderTopColor={'gray.300'}
            borderBottomColor={'gray.300'}
            borderBottomWidth={1}
            marginTop={8}
            borderTopWidth={1}
            paddingBottom={6}
            paddingTop={4}>
            <Text
              textAlign={'left'}
              fontFamily={'Cairo'}
              fontSize={22}
              color={isDarkMode ? '#FFF' : '#000'}
              fontWeight={800}>
              تفاصيل الطلب
            </Text>
            {/* {JSON.stringify(order?.data.data.attributes.products)} */}

            {order?.data.data.attributes.order_items.data.map((item: any) => (
              <Box>
                <Box
                  marginTop={4}
                  flexDir={'row'}
                  alignItems="center"
                  justifyContent={'space-between'}>
                  <Box flexDir={'row'} alignItems="center">
                    {/* {JSON.stringify(item.attributes)} */}

                    <Image
                      source={{
                        uri: item.attributes.product.data.attributes.image.data
                          .attributes.url,
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
                        {item.attributes.product.data.attributes.name}
                        {/* {item.attributes.product.data[0].attributes.name} */}
                      </Text>
                      {/* <Box width="100%" flex="1" py={2} flexDir={'row'}>
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
                          </Box> */}
                      {/* <Text fontSize={12} fontFamily={'Cairo'} color="gray.400">
                        المكسرات والبسكويت، المحمصة
                        {JSON.stringify(item.attributes)}
                      </Text> */}
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
                      {item.attributes.quantity} {item.attributes.unit}
                      {/* {item.attributes.type} */}
                      {/* {item.attributes.quantity} */}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            marginTop={2}
            py={3}
            flexDirection={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            width="100%">
            <Text
              color={isDarkMode ? '#FFF' : '#000'}
              fontFamily={'Cairo'}
              fontSize={16}
              fontWeight={800}>
              المبلغ الكلي
            </Text>
            <Text
              color={isDarkMode ? '#FFF' : '#000'}
              fontFamily={'Cairo'}
              fontSize={16}
              fontWeight={800}>
              ₪ {order?.data.data.attributes.total}
            </Text>
          </Box>
          <Box
            marginTop={1}
            flexDirection={'row'}
            justifyContent="space-between"
            alignItems={'center'}
            width="100%">
            <Text
              color={isDarkMode ? '#FFF' : '#000'}
              fontFamily={'Cairo'}
              fontSize={16}
              fontWeight={800}>
              طريقة الدفع
            </Text>
            <Text
              color={isDarkMode ? '#FFF' : '#000'}
              fontFamily={'Cairo'}
              fontSize={16}
              fontWeight={800}>
              بطاقة ائتمان
            </Text>
          </Box>
        </Container>
      </Box>
    </ScrollView>
  );
};

export default Order;
