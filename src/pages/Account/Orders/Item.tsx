import {useNavigation} from '@react-navigation/native';
import {Box, Pressable, Text} from 'native-base';
import React from 'react';
import {useColorScheme} from 'react-native';
type Props = {
  item: any;
};
const Item: React.FC<Props> = ({item}) => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Pressable
      onPress={() => navigation.navigate('Order', {orderid: item.id})}
      my={2}
      borderRadius={10}
      mx={1}
      bg={isDarkMode ? '#333' : 'white'}
      p={3}
      py={4}
      px={5}
      shadow={2}>
      <Box flexDirection={'row'} width="100%" justifyContent={'space-between'}>
        <Box width="70%">
          <Box my={1} flexDir={'row'} alignItems={'center'}>
            <Text fontFamily={'Cairo'} color="gray.400">
              رقم الطلب:
            </Text>
            <Text fontFamily={'Cairo'} color={isDarkMode ? '#FFF' : '#000'}>
              {item.id}{' '}
            </Text>
          </Box>

          <Box my={1} flexDir={'row'} alignItems={'center'}>
            <Text fontFamily={'Cairo'} color="gray.400">
              المبلغ الكلي:
            </Text>
            <Text fontFamily={'Cairo'} color={isDarkMode ? '#FFF' : '#000'}>
              ₪{item.attributes.total}{' '}
            </Text>
          </Box>
          <Text my={1} textAlign={'left'} fontFamily={'Cairo'} color="gray.400">
            حالة الطلب:
          </Text>
        </Box>
        <Box>
          <Text my={1} fontFamily={'Cairo'} color="gray.400">
            {item.attributes.publishedAt.substr(0, 10)}
          </Text>
        </Box>
        <Box />
      </Box>

      <Box position={'relative'} marginTop={2}>
        <Box flexDir={'row'}>
          <Box
            bg="primary.500"
            width={'33.33333%'}
            borderRadius={6}
            height={1}
          />
          <Box
            bg={
              item.attributes.status === 'Delivering'
                ? 'primary.500'
                : 'primary.200'
            }
            width={'33.33333%'}
            borderRadius={6}
            height={1}
          />
          <Box
            bg={
              item.attributes.status === 'Delivered'
                ? 'primary.500'
                : 'primary.200'
            }
            width={'33.33333%'}
            borderRadius={6}
            height={1}
          />
        </Box>
        <Box
          position={'absolute'}
          top={-6}
          flexDir={'row'}
          width="100%"
          justifyContent={'space-between'}>
          <Box bg="primary.500" width={4} borderRadius={100} height={4} />
          <Box
            bg={
              item.attributes.status === 'Processing'
                ? 'primary.500'
                : 'primary.200'
            }
            width={4}
            borderRadius={100}
            height={4}
          />
          <Box
            bg={
              item.attributes.status === 'Delivering'
                ? 'primary.500'
                : 'primary.200'
            }
            width={4}
            borderRadius={100}
            height={4}
          />
          <Box
            bg={
              item.attributes.status === 'Delivered'
                ? 'primary.500'
                : 'primary.200'
            }
            width={4}
            borderRadius={100}
            height={4}
          />
        </Box>
        {item.attributes.status === 'Processing' && (
          <Text
            color={isDarkMode ? '#FFF' : '#000'}
            fontFamily={'Cairo'}
            marginTop={3}
            textAlign={'left'}>
            يتم معالجة الطلب
          </Text>
        )}
        {item.attributes.status === 'Delivering' && (
          <Text
            color={isDarkMode ? '#FFF' : '#000'}
            fontFamily={'Cairo'}
            marginTop={3}
            textAlign={'left'}>
            يتم توصيل الطلب
          </Text>
        )}
        {item.attributes.status === 'Delivered' && (
          <Text
            color={isDarkMode ? '#FFF' : '#000'}
            fontFamily={'Cairo'}
            marginTop={3}
            textAlign={'left'}>
            تم التوصيل
          </Text>
        )}
      </Box>
    </Pressable>
  );
};
export default Item;
