import {Image, useColorScheme} from 'react-native';
import React from 'react';
import {Box, Pressable, Text, Button} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';
import {useNavigation} from '@react-navigation/native';

type Props = {
  item: any;
  deleteItem: any;
  isLoading: boolean;
};
const Item: React.FC<Props> = ({item, deleteItem, isLoading}) => {
  const navigation = useNavigation();
  const [qty, setQty] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(6.5);
  const isDarkMode = useColorScheme() === 'dark';

  React.useEffect(() => {
    setQty(item.attributes.product.data.attributes.type === 'weight' ? 250 : 1);
  }, [item]);

  React.useEffect(() => {
    setQty(item.attributes.product.data.attributes.type === 'weight' ? 250 : 1);
    setPrice(item.attributes.product.data.attributes.price);
  }, [item]);

  const addQty = () => {
    setQty(
      prevState =>
        prevState +
        (item.attributes.product.data.attributes.type === 'weight' ? 250 : 1),
    );
    setPrice(
      prevPrice => prevPrice + item.attributes.product.data.attributes.price,
    );
  };
  const subQty = () => {
    setQty(prevState =>
      prevState >
      (item.attributes.product.data.attributes.type === 'weight' ? 250 : 1)
        ? prevState -
          (item.attributes.product.data.attributes.type === 'weight' ? 250 : 1)
        : prevState,
    );
    setPrice(prevPrice =>
      item.attributes.product.data.attributes.price < prevPrice
        ? prevPrice - item.attributes.product.data.attributes.price
        : prevPrice,
    );
  };

  return (
    <Box width="100%">
      <Box
        bg={isDarkMode ? '#333' : '#FFF'}
        width="100%"
        borderRadius={12}
        flexDir={'row'}
        marginTop={3}>
        <Image
          source={{
            uri: `${item.attributes.product.data.attributes.image.data.attributes.url}`,
          }}
          style={{
            width: 132,
            height: '100%',
            borderRadius: 12,
            resizeMode: 'cover',
          }}
        />
        <Box p={2} py={3} flex="1">
          <Box>
            <Text
              color={isDarkMode ? '#FFF' : '#333'}
              textAlign={'left'}
              fontWeight={800}
              fontFamily={'Cairo'}>
              {item.attributes.product.data.attributes.name}
            </Text>
          </Box>
          <Box width="100%" flex="1" flexWrap={'wrap'} flexDir={'row'}>
            {item.attributes.product.data.attributes.categories.data.map(
              (cat: any, index: number) => {
                return (
                  <>
                    <Text
                      textAlign={'left'}
                      flexWrap={'wrap'}
                      color="gray.400"
                      fontFamily={'Cairo'}
                      fontSize="10"
                      fontWeight={500}>
                      {cat.attributes.name}{' '}
                      {index !==
                      item.attributes.product.data.attributes.categories.data
                        .length -
                        1
                        ? ','
                        : ''}
                    </Text>
                  </>
                );
              },
            )}
          </Box>
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
              <Text
                color={isDarkMode ? '#FFF' : '#333'}
                px="2"
                fontSize={12}
                fontWeight={500}
                fontFamily={'Cairo'}>
                {item.attributes.product.data.attributes.type === 'weight'
                  ? qty >= 1000
                    ? qty / 1000 + ' ??????'
                    : qty + ' ????????'
                  : 'x' + qty}
              </Text>

              <Button
                height="6"
                onPress={() => subQty()}
                variant="outline"
                p="0"
                width="6">
                <Minus color={isDarkMode ? '#FFF' : '#333'} />
              </Button>
            </Box>
            <Box flexDirection="row" justifyContent={'flex-end'}>
              <Text
                color={isDarkMode ? '#FFF' : '#333'}
                fontWeight={700}
                fontSize={17}>
                {price}
              </Text>
              <Text
                color={isDarkMode ? '#FFF' : '#333'}
                fontSize={10}
                fontWeight={700}
                marginTop={2}>
                ???
              </Text>
            </Box>
          </Box>

          <Box flexDir={'row'} marginTop={2} justifyContent={'space-between'}>
            <Pressable
              width="70%"
              onPress={() =>
                navigation.navigate('Product', {
                  slug: item.attributes.product.data.attributes.slug,
                })
              }>
              {({isPressed}) => {
                return (
                  <Box
                    py="2"
                    borderRadius={6}
                    flexDirection="row"
                    justifyContent={'center'}
                    alignItems={'center'}
                    bg={isPressed ? 'primary.700' : 'primary.500'}
                    p="2"
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
                      ??????????
                    </Text>
                  </Box>
                );
              }}
            </Pressable>

            <Button
              isLoading={isLoading}
              onPress={() => deleteItem(item.id)}
              variant={'outline'}
              colorScheme={'danger'}>
              <Svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <Path
                  d="M7.00008 1.02221e-08C7.67209 -5.81322e-05 8.31852 0.247917 8.80623 0.692845C9.29394 1.13777 9.58577 1.74576 9.62161 2.39158L9.62511 2.52632H13.4752C13.6082 2.52636 13.7362 2.57499 13.8334 2.66238C13.9306 2.74978 13.9897 2.86942 13.9988 2.99714C14.0078 3.12486 13.9662 3.25113 13.8823 3.35043C13.7983 3.44974 13.6783 3.51468 13.5466 3.53213L13.4752 3.53684H12.7338L11.8798 13.6778C11.8265 14.3105 11.5278 14.9006 11.0429 15.3309C10.5581 15.7612 9.92272 16 9.26321 16H4.73695C4.07744 16 3.44207 15.7612 2.95723 15.3309C2.47239 14.9006 2.17361 14.3105 2.12032 13.6778L1.26561 3.53684H0.525006C0.398138 3.53684 0.275564 3.49262 0.179951 3.41237C0.0843377 3.33212 0.022154 3.22126 0.00490003 3.1003L0 3.03158C5.35009e-06 2.90948 0.0459505 2.79152 0.129339 2.6995C0.212727 2.60748 0.327916 2.54764 0.453605 2.53103L0.525006 2.52632H4.37505C4.37505 1.8563 4.65162 1.21372 5.1439 0.739941C5.63619 0.266165 6.30388 1.02221e-08 7.00008 1.02221e-08ZM11.681 3.53684H2.31913L3.16684 13.5963C3.19885 13.9759 3.37815 14.33 3.66908 14.5881C3.96001 14.8462 4.34124 14.9895 4.73695 14.9895H9.26321C9.65892 14.9895 10.0402 14.8462 10.3311 14.5881C10.622 14.33 10.8013 13.9759 10.8333 13.5963L11.6803 3.53684H11.681ZM5.42506 6.06316C5.55193 6.06316 5.6745 6.10738 5.77012 6.18763C5.86573 6.26788 5.92791 6.37874 5.94517 6.49971L5.95007 6.56842V11.9579C5.95003 12.0859 5.8995 12.2091 5.80869 12.3027C5.71788 12.3962 5.59355 12.4531 5.46085 12.4618C5.32814 12.4706 5.19694 12.4305 5.09375 12.3497C4.99056 12.2689 4.92309 12.1534 4.90496 12.0266L4.90006 11.9579V6.56842C4.90006 6.43442 4.95537 6.3059 5.05383 6.21115C5.15229 6.11639 5.28582 6.06316 5.42506 6.06316ZM8.5751 6.06316C8.70197 6.06316 8.82454 6.10738 8.92015 6.18763C9.01577 6.26788 9.07795 6.37874 9.0952 6.49971L9.1001 6.56842V11.9579C9.10006 12.0859 9.04953 12.2091 8.95872 12.3027C8.86791 12.3962 8.74359 12.4531 8.61088 12.4618C8.47818 12.4706 8.34697 12.4305 8.24378 12.3497C8.1406 12.2689 8.07312 12.1534 8.05499 12.0266L8.05009 11.9579V6.56842C8.05009 6.43442 8.10541 6.3059 8.20386 6.21115C8.30232 6.11639 8.43586 6.06316 8.5751 6.06316ZM7.00008 1.01053C6.60099 1.01048 6.21676 1.15624 5.92504 1.41835C5.63332 1.68047 5.45588 2.03938 5.42856 2.42257L5.42506 2.52632H8.5751L8.5716 2.42257C8.54428 2.03938 8.36684 1.68047 8.07512 1.41835C7.7834 1.15624 7.39917 1.01048 7.00008 1.01053Z"
                  fill="#FF0000"
                />
              </Svg>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
