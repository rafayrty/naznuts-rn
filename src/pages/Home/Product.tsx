import React from 'react';
import {Box, Text, Button, Pressable} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import Minus from '../../icons/Minus';
import Plus from '../../icons/Plus';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Product: React.FC<any> = ({info}) => {
  const navigation = useNavigation();
  const [qty, setQty] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(6.5);

  React.useEffect(() => {
    setQty(info.attributes.type === 'weight' ? 250 : 1);
    setPrice(info.attributes.price);
  }, [info]);

  const addQty = () => {
    setQty(
      prevState => prevState + (info?.attributes.type === 'weight' ? 250 : 1),
    );
    setPrice(prevPrice => prevPrice + info.attributes.price);
  };
  const subQty = () => {
    setQty(prevState =>
      prevState > (info.attributes.type === 'weight' ? 250 : 1)
        ? prevState - (info.attributes.type === 'weight' ? 250 : 1)
        : prevState,
    );
    setPrice(prevPrice =>
      info.attributes.price < prevPrice
        ? prevPrice - info.attributes.price
        : prevPrice,
    );
  };

  return (
    <Box width={180} borderRadius="md" bg="#FFF" shadow={2} borderTopRadius={6}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Product', {slug: info.attributes.slug})
        }>
        <Image
          accessibilityLabel={info.attributes.name}
          style={{
            height: 120,
            width: '100%',
            resizeMode: 'cover',
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
          }}
          source={{
            uri: `${info.attributes.image.data.attributes.url}`,
          }}
        />
      </TouchableOpacity>

      <Box py={2} px={3}>
        <Box flexDir={'row'} flexWrap={'wrap'}>
          {info.attributes.categories.data.map((cat: any, index: number) => {
            return (
              <Text
                key={`cat-${index}`}
                color="gray.400"
                fontFamily={'Cairo'}
                fontSize="10"
                fontWeight={500}>
                {cat.attributes.name}{' '}
                {index !== info.attributes.categories.data.length - 1
                  ? ','
                  : ''}
              </Text>
            );
          })}
        </Box>
        <Text
          color="black"
          fontFamily={'Cairo'}
          fontSize="16"
          marginTop={2}
          fontWeight={700}>
          {info.attributes.name}
        </Text>

        <Text marginTop="3" fontFamily={'Cairo'} fontSize={10} color="gray.400">
          كمية
        </Text>
        <Box
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems="center">
          <Box flexDirection={'row'} marginTop={2} alignItems="center">
            <Button
              height="6"
              bg="primary.500"
              onPress={() => addQty()}
              width="6"
              p="0">
              <Plus color="white" />
            </Button>
            <Text px="3" fontSize={12} fontFamily={'Cairo'} fontWeight={500}>
              {info?.attributes.type === 'weight'
                ? qty >= 1000
                  ? qty / 1000 + ' كلغ'
                  : qty + ' غرام'
                : 'x' + qty}
            </Text>

            <Button
              height="6"
              variant="outline"
              width="6"
              p="0"
              onPress={() => subQty()}>
              <Minus color="black" />
            </Button>
          </Box>
          <Box flexDirection="row" justifyContent={'flex-end'}>
            <Text fontWeight={700} fontSize={17}>
              {price}
            </Text>
            <Text fontSize={10} fontWeight={700} marginTop={2}>
              ₪
            </Text>
          </Box>
        </Box>

        <Box marginTop="4">
          <Pressable
            onPress={() =>
              navigation.navigate('Product', {slug: info.attributes.slug})
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
};

export default Product;
