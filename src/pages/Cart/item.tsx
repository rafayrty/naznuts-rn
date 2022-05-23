import {Image} from 'react-native';
import React from 'react';
import {Box, Text, Button} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';
import {updateItem} from '../../plugins/cart';
import {GetData} from '../../plugins/storage';

type Props = {
  item: any;
  deleteItem: Function;
  updateTotalPrice: Function;
};
const Item: React.FC<Props> = ({item, deleteItem, updateTotalPrice}) => {
  const [qty, setQty] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(6.5);

  React.useEffect(() => {
    setQty(item.quantity);
    setPrice(item.attributes.price);
  }, [item]);

  const addQty = () => {
    setQty(
      prevState => prevState + (item?.attributes.type === 'weight' ? 250 : 1),
    );
    setPrice(prevPrice => prevPrice + item.attributes.price);

    //Updating Cart
    updateItem(
      item.id,
      qty + (item?.attributes.type === 'weight' ? 250 : 1),
      price + item.attributes.price,
    ).then(_ => {
      GetData('cart').then((res: any) => {
        updateTotalPrice(JSON.parse(res));
      });
    });
  };
  const subQty = () => {
    setQty(prevState =>
      prevState > (item.attributes.type === 'weight' ? 250 : 1)
        ? prevState - (item.attributes.type === 'weight' ? 250 : 1)
        : prevState,
    );
    setPrice(prevPrice =>
      item.attributes.price < prevPrice
        ? prevPrice - item.attributes.price
        : prevPrice,
    );

    //Updating Cart
    updateItem(
      item.id,
      qty > (item.attributes.type === 'weight' ? 250 : 1)
        ? qty - (item.attributes.type === 'weight' ? 250 : 1)
        : qty,
      item.attributes.price < price ? price - item.attributes.price : price,
    ).then(_ => {
      GetData('cart').then((res: any) => {
        updateTotalPrice(JSON.parse(res));
      });
    });
  };

  return (
    <Box width="100%" px={1}>
      <Box
        shadow={3}
        bg="#FFF"
        width="100%"
        borderRadius={12}
        flexDir={'row'}
        marginTop={5}>
        <Image
          source={{
            uri: `http://localhost:1337${item.attributes.image.data.attributes.url}`,
          }}
          style={{
            width: 132,
            height: '100%',
            borderRadius: 12,
            resizeMode: 'cover',
          }}
        />
        <Box p={2} py={4} flex="1">
          <Box flexDir={'row'} width="100%" justifyContent={'space-between'}>
            <Box width="80%">
              <Box>
                <Text textAlign={'left'} fontWeight={800} fontFamily={'Cairo'}>
                  {item.attributes.name}
                </Text>
              </Box>
              <Box width="100%" flex="1" py={2} flexDir={'row'}>
                {item.attributes.categories.data.map(
                  (cat: any, index: number) => {
                    return (
                      <Text
                        textAlign={'left'}
                        flexWrap={'wrap'}
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
                  },
                )}
              </Box>
            </Box>
            <TouchableOpacity
              onPress={() => deleteItem(item.id)}
              style={{marginRight: 5}}>
              <Svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <Path
                  d="M7.00008 1.02221e-08C7.67209 -5.81322e-05 8.31852 0.247917 8.80623 0.692845C9.29394 1.13777 9.58577 1.74576 9.62161 2.39158L9.62511 2.52632H13.4752C13.6082 2.52636 13.7362 2.57499 13.8334 2.66238C13.9306 2.74978 13.9897 2.86942 13.9988 2.99714C14.0078 3.12486 13.9662 3.25113 13.8823 3.35043C13.7983 3.44974 13.6783 3.51468 13.5466 3.53213L13.4752 3.53684H12.7338L11.8798 13.6778C11.8265 14.3105 11.5278 14.9006 11.0429 15.3309C10.5581 15.7612 9.92272 16 9.26321 16H4.73695C4.07744 16 3.44207 15.7612 2.95723 15.3309C2.47239 14.9006 2.17361 14.3105 2.12032 13.6778L1.26561 3.53684H0.525006C0.398138 3.53684 0.275564 3.49262 0.179951 3.41237C0.0843377 3.33212 0.022154 3.22126 0.00490003 3.1003L0 3.03158C5.35009e-06 2.90948 0.0459505 2.79152 0.129339 2.6995C0.212727 2.60748 0.327916 2.54764 0.453605 2.53103L0.525006 2.52632H4.37505C4.37505 1.8563 4.65162 1.21372 5.1439 0.739941C5.63619 0.266165 6.30388 1.02221e-08 7.00008 1.02221e-08ZM11.681 3.53684H2.31913L3.16684 13.5963C3.19885 13.9759 3.37815 14.33 3.66908 14.5881C3.96001 14.8462 4.34124 14.9895 4.73695 14.9895H9.26321C9.65892 14.9895 10.0402 14.8462 10.3311 14.5881C10.622 14.33 10.8013 13.9759 10.8333 13.5963L11.6803 3.53684H11.681ZM5.42506 6.06316C5.55193 6.06316 5.6745 6.10738 5.77012 6.18763C5.86573 6.26788 5.92791 6.37874 5.94517 6.49971L5.95007 6.56842V11.9579C5.95003 12.0859 5.8995 12.2091 5.80869 12.3027C5.71788 12.3962 5.59355 12.4531 5.46085 12.4618C5.32814 12.4706 5.19694 12.4305 5.09375 12.3497C4.99056 12.2689 4.92309 12.1534 4.90496 12.0266L4.90006 11.9579V6.56842C4.90006 6.43442 4.95537 6.3059 5.05383 6.21115C5.15229 6.11639 5.28582 6.06316 5.42506 6.06316ZM8.5751 6.06316C8.70197 6.06316 8.82454 6.10738 8.92015 6.18763C9.01577 6.26788 9.07795 6.37874 9.0952 6.49971L9.1001 6.56842V11.9579C9.10006 12.0859 9.04953 12.2091 8.95872 12.3027C8.86791 12.3962 8.74359 12.4531 8.61088 12.4618C8.47818 12.4706 8.34697 12.4305 8.24378 12.3497C8.1406 12.2689 8.07312 12.1534 8.05499 12.0266L8.05009 11.9579V6.56842C8.05009 6.43442 8.10541 6.3059 8.20386 6.21115C8.30232 6.11639 8.43586 6.06316 8.5751 6.06316ZM7.00008 1.01053C6.60099 1.01048 6.21676 1.15624 5.92504 1.41835C5.63332 1.68047 5.45588 2.03938 5.42856 2.42257L5.42506 2.52632H8.5751L8.5716 2.42257C8.54428 2.03938 8.36684 1.68047 8.07512 1.41835C7.7834 1.15624 7.39917 1.01048 7.00008 1.01053Z"
                  fill="#FF0000"
                />
              </Svg>
            </TouchableOpacity>
          </Box>
          <Box
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems="center"
            marginTop={2}>
            <Box flexDirection={'row'} alignItems="center">
              <Button
                onPress={() => addQty()}
                height="6"
                bg="primary.500"
                width="6"
                p="0">
                <Plus color="white" />
              </Button>
              <Text px="2" fontSize={12} fontWeight={500} fontFamily={'Cairo'}>
                {item?.attributes.type === 'weight'
                  ? qty >= 1000
                    ? qty / 1000 + ' كلغ'
                    : qty + ' غرام'
                  : 'x' + qty}
              </Text>

              <Button
                onPress={() => subQty()}
                height="6"
                variant="outline"
                width="6"
                p="0">
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
        </Box>
      </Box>
    </Box>
  );
};

export default Item;
