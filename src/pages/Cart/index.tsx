import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import {Box, Container, Pressable, Text, useToast} from 'native-base';
import BackButton from '../../components/BackButton';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {GetData} from '../../plugins/storage';
import {FlatList, TouchableOpacity, useColorScheme} from 'react-native';
import Item from './item';
import {deleteItem} from '../../plugins/cart';
import {CartCountContext} from '../../AuthContext';

const Cart = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const toast = useToast();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const {countDispatch} = React.useContext(CartCountContext);

  const updateTotalPrice = (result: any) => {
    let total = 0;
    result.forEach((item: any) => {
      total += item.attributes.price;
    });
    setTotalPrice(total);
  };

  useEffect(() => {
    GetData('cart').then(res => {
      if (res !== undefined && res !== null) {
        setCartItems(JSON.parse(res));
        updateTotalPrice(JSON.parse(res));
        console.log(res);
      }
    });
  }, []);

  const deleteCart = (id: number) => {
    // console.log(id);

    deleteItem(id).then(_ => {
      toast.show({
        bg: 'primary.500',
        title: 'Item Removed From Cart',
        placement: 'top',
      });

      GetData('cart').then(res => {
        if (res !== undefined && res !== null) {
          setCartItems(JSON.parse(res));
          countDispatch(JSON.parse(res).length);
        }
      });
    });
  };

  return (
    <Box safeArea flex="1">
      <Header />
      {/* <Spinner /> */}

      <Container flex="1" mx="auto" width="100%">
        <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
          <BackButton />
          <Text
            color={isDarkMode ? '#FFF' : '#000'}
            marginLeft={1}
            fontFamily={'Cairo'}
            fontSize={22}
            fontWeight={800}>
            ?????? ??????????????????
          </Text>
        </Box>
        {cartItems.length !== 0 ? (
          <>
            <FlatList
              style={{width: '100%', flex: 1}}
              data={cartItems}
              keyExtractor={(item, index) => `${item.item}-${index}`}
              renderItem={({item}) => (
                <Item
                  item={item}
                  deleteItem={deleteCart}
                  updateTotalPrice={updateTotalPrice}
                />
              )}
            />
            <Box width="100%" mb={4}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddressCheckout')}>
                <Box
                  bg="secondary.500"
                  borderRadius={8}
                  flexDir={'row-reverse'}
                  alignItems={'center'}
                  px={4}
                  py={3}
                  justifyContent={'space-between'}>
                  <Box flexDir={'row'} marginTop={1}>
                    <Text
                      color="white"
                      fontSize={16}
                      fontWeight={800}
                      fontFamily={'Cairo'}>
                      {totalPrice}
                    </Text>
                    <Text color="white" marginTop={1} fontSize={10}>
                      ???
                    </Text>
                  </Box>
                  <Box flexDir={'row'} alignItems={'center'}>
                    <Text
                      fontWeight={600}
                      fontFamily={'Cairo'}
                      color="white"
                      marginRight={2}>
                      ???????? ??????????
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
            </Box>
          </>
        ) : (
          <Box width="100%" flex="1">
            <Box mx="auto" flex="0.8" width="100%">
              <Svg
                style={{width: '100%', height: '100%'}}
                viewBox="0 0 379 319"
                fill="none">
                <Path
                  d="M27.4876 296.834C35.5099 311.712 52.536 318.098 52.536 318.098C52.536 318.098 56.5554 300.364 48.5332 285.486C40.5109 270.609 23.4848 264.222 23.4848 264.222C23.4848 264.222 19.4654 281.957 27.4876 296.834Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M33.0017 291.939C47.4852 300.653 53.0632 317.961 53.0632 317.961C53.0632 317.961 35.1589 321.141 20.6755 312.427C6.19205 303.714 0.614014 286.406 0.614014 286.406C0.614014 286.406 18.5183 283.226 33.0017 291.939Z"
                  fill="#79C143"
                />
                <Path
                  d="M360.304 43.2717H269.938V44.5627H360.304V43.2717Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M295.757 31.6533H294.466V43.5946H295.757V31.6533Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M335.131 31.6533H333.84V43.5946H335.131V31.6533Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M324.158 187.213H322.867V199.154H324.158V187.213Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M363.532 187.213H362.241V199.154H363.532V187.213Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M234.315 290.022H81.4753V288.923H233.215V235.593H94.3241L87.577 221.537L88.5684 221.061L95.0161 234.493H234.315V290.022Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M101.817 316.961C108.194 316.961 113.363 311.792 113.363 305.416C113.363 299.039 108.194 293.87 101.817 293.87C95.4409 293.87 90.2718 299.039 90.2718 305.416C90.2718 311.792 95.4409 316.961 101.817 316.961Z"
                  fill="#3F3D56"
                />
                <Path
                  d="M215.622 316.961C221.999 316.961 227.168 311.792 227.168 305.416C227.168 299.039 221.999 293.87 215.622 293.87C209.246 293.87 204.077 299.039 204.077 305.416C204.077 311.792 209.246 316.961 215.622 316.961Z"
                  fill="#3F3D56"
                />
                <Path
                  d="M349.769 67.3597C353.716 67.3597 356.916 64.1598 356.916 60.2125C356.916 56.2652 353.716 53.0653 349.769 53.0653C345.822 53.0653 342.622 56.2652 342.622 60.2125C342.622 64.1598 345.822 67.3597 349.769 67.3597Z"
                  fill="#3F3D56"
                />
                <Path
                  d="M250.662 217.451H78.8695L41.6977 95.9485H288.943L288.718 96.6634L250.662 217.451ZM79.6829 216.351H249.856L287.444 97.048H43.1838L79.6829 216.351Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M237.252 211.128H86.3602L53.7108 103.37H270.875L270.678 104.005L237.252 211.128Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M292.024 85.0938L290.96 84.8118L298.216 57.4636H340.423V58.5635H299.062L292.024 85.0938Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M276.588 132.784H53.7098V133.883H276.588V132.784Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M263.824 173.294H66.1033V174.393H263.824V173.294Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M165.867 96.4983H164.768V216.901H165.867V96.4983Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M215.096 96.4637L207.203 216.863L208.301 216.935L216.194 96.5356L215.096 96.4637Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M115.561 96.4625L114.463 96.5341L122.311 216.937L123.408 216.865L115.561 96.4625Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M379 317.658H0.614014V318.949H379V317.658Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M129.87 64.5725H39.5031V65.8635H129.87V64.5725Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M65.3221 52.954H64.0311V64.8953H65.3221V52.954Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M104.696 52.954H103.405V64.8953H104.696V52.954Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M252.51 0.67041H162.143V1.96136H252.51V0.67041Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M227.982 1.63867H226.691V13.58H227.982V1.63867Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M188.608 1.63867H187.317V13.58H188.608V1.63867Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M98.8868 0.0250244H8.52026V1.31598H98.8868V0.0250244Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M74.3587 0.993286H73.0677V12.9346H74.3587V0.993286Z"
                  fill="#F2F2F2"
                />
                <Path
                  d="M34.9848 0.993286H33.6938V12.9346H34.9848V0.993286Z"
                  fill="#F2F2F2"
                />
              </Svg>
            </Box>
            <Box width="100%" marginTop={8}>
              <Text
                color={isDarkMode ? '#FFF' : '#000'}
                fontSize={28}
                fontFamily={'Cairo'}
                textAlign={'center'}
                fontWeight="900">
                ??????????
              </Text>
              <Text
                color={isDarkMode ? '#FFF' : '#000'}
                textAlign={'center'}
                fontSize={20}
                fontFamily={'Cairo'}>
                ?????? ???????????????? ??????????
              </Text>
            </Box>
            <Box mx="auto" marginTop={8}>
              <Pressable onPress={() => navigation.navigate('Home')}>
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
                          fill={isDarkMode ? '#333' : '#FFF'}
                        />
                        <Path
                          d="M19.62 11.9884C19.62 12.8232 18.9506 13.5 18.1249 13.5C17.2992 13.5 16.6298 12.8232 16.6298 11.9884C16.6298 11.1535 17.2992 10.4767 18.1249 10.4767C18.9506 10.4767 19.62 11.1535 19.62 11.9884Z"
                          fill={isDarkMode ? '#333' : '#FFF'}
                        />
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M9.29388 0.921265C9.4584 0.65895 9.74425 0.5 10.0515 0.5H16.6298C17.1252 0.5 17.5269 0.906067 17.5269 1.40698C17.5269 1.90789 17.1252 2.31395 16.6298 2.31395H11.4661L13.4396 6.54651H17.7056L20.2823 1.02022C20.4304 0.702643 20.7464 0.5 21.0937 0.5H23.2082C23.7036 0.5 24.1052 0.906067 24.1052 1.40698C24.1052 1.90789 23.7036 2.31395 23.2082 2.31395H21.6625L19.0858 7.84024C18.9377 8.15782 18.6217 8.36047 18.2744 8.36047H12.8708C12.5235 8.36047 12.2074 8.15782 12.0593 7.84024L9.24005 1.79373C9.10905 1.51277 9.12936 1.18358 9.29388 0.921265Z"
                          fill={isDarkMode ? '#333' : '#FFF'}
                        />
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.03965 2.53125C4.69153 2.53125 5.21998 3.0769 5.21998 3.75V5.375H6.79375C7.44563 5.375 7.97408 5.92065 7.97408 6.59375C7.97408 7.26685 7.44563 7.8125 6.79375 7.8125H5.21998V9.4375C5.21998 10.1106 4.69153 10.6562 4.03965 10.6562C3.38777 10.6562 2.85932 10.1106 2.85932 9.4375V7.8125H1.28555C0.633675 7.8125 0.105225 7.26685 0.105225 6.59375C0.105225 5.92065 0.633675 5.375 1.28555 5.375H2.85932V3.75C2.85932 3.0769 3.38777 2.53125 4.03965 2.53125Z"
                          fill={isDarkMode ? '#333' : '#FFF'}
                        />
                      </Svg>
                      <Text
                        color={isDarkMode ? '#333' : '#FFF'}
                        marginLeft={2}
                        fontFamily={'Cairo'}>
                        ?????????? ???????? ?????? ??????????
                      </Text>
                    </Box>
                  );
                }}
              </Pressable>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
