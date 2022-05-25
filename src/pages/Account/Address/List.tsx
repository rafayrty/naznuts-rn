import {FlatList, useColorScheme} from 'react-native';
import React from 'react';

import {
  Box,
  Text,
  Container,
  Pressable,
  useTheme,
  useToast,
  AlertDialog,
  Button,
  Center,
  Spinner,
} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {address_request} from '../../../api/address_request';
import {useQuery} from 'react-query';
import axios from 'axios';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AddressEmpty from '../../../icons/AddressEmpty';
import Office from '../../../icons/Office';
import Home from '../../../icons/Home';
import Marker from '../../../icons/Marker';
import {API_URL} from '../../../../consts';

type AlertProps = {
  isOpen: boolean;
  setIsOpen: Function;
  refetch: Function;
  id: number;
};

const DeleteAlert: React.FC<AlertProps> = ({
  setIsOpen,
  isOpen,
  refetch,
  id,
}) => {
  const cancelRef = React.useRef(null);
  const toast = useToast();
  const isDarkMode = useColorScheme();

  const deleteAddress = (address_id: number): void => {
    axios.delete(`${API_URL}/api/addresses/${address_id}`).then(_ => {
      refetch();
      toast.show({
        bg: 'primary.500',
        title: 'Address Deleted Successfully',
        placement: 'top',
      });
    });
  };

  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />

          <AlertDialog.Header bg={isDarkMode ? '#333' : '#FFF'}>
            <Text
              fontFamily={'Cairo'}
              fontWeight={800}
              color={isDarkMode ? '#FFF' : '#333'}
              fontSize={16}
              textAlign={'left'}>
              حذف العنوان{' '}
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body bg={isDarkMode ? '#333' : '#FFF'}>
            <Text
              color={isDarkMode ? '#FFF' : '#333'}
              fontFamily={'Cairo'}
              textAlign={'left'}>
              هل تريد حذف العنوان
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer bg={isDarkMode ? '#333' : '#FFF'}>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setIsOpen(!isOpen)}
                ref={cancelRef}>
                <Text color={isDarkMode ? '#FFF' : '#000'} fontFamily={'Cairo'}>
                  يلغي
                </Text>
              </Button>
              <Button colorScheme="danger" onPress={() => deleteAddress(id)}>
                <Text color="#FFF" fontFamily={'Cairo'}>
                  حذف
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

type Props = {
  item: any;
  index: number;
  refetch: Function;
  editAddress: Function;
  iseditLoader: boolean;
};

const Item: React.FC<Props> = ({
  item,
  index,
  refetch,
  iseditLoader,
  editAddress,
}) => {
  //   const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  const {colors} = useTheme();
  return (
    <Box
      bg={isDarkMode ? '#333' : '#FFF'}
      shadow={3}
      borderRadius={10}
      my={3}
      mx={1}
      p={3}
      py={4}
      px={5}
      borderWidth={1}>
      <Box flexDir={'row'} width="100%" alignItems={'center'}>
        <Box
          bg="primary.500"
          height={26}
          width={26}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={100}>
          {item.attributes.type === 'Home' && (
            <Home color={isDarkMode ? '#333' : '#FFF'} />
          )}
          {item.attributes.type === 'Office' && (
            <Office color={isDarkMode ? '#333' : '#FFF'} />
          )}
          {item.attributes.type === 'Other' && (
            <Marker color={isDarkMode ? '#333' : '#FFF'} />
          )}
        </Box>
        <Text
          marginLeft={2}
          fontSize={14}
          fontWeight={800}
          color="primary.500"
          fontFamily={'Cairo'}>
          عنوان {index + 1}
        </Text>
      </Box>
      <Box>
        <Text
          my={1}
          color={isDarkMode ? 'gray.100' : '#000'}
          textAlign={'left'}
          fontFamily={'Cairo'}>
          {item.attributes.name} - {item.attributes.phone}
        </Text>
        <Text
          color={isDarkMode ? 'gray.300' : 'gray.700'}
          fontSize={13}
          opacity={0.7}
          fontWeight={500}
          textAlign={'left'}
          fontFamily={'Cairo'}>
          {item.attributes.address_text}
        </Text>
      </Box>

      <Box flexDir={'row'} marginTop={3}>
        <Pressable onPress={() => editAddress(item.id)}>
          {({isPressed}) => {
            return (
              <Box
                py="3"
                borderRadius={6}
                flexDirection="row"
                justifyContent={'center'}
                alignItems={'center'}
                bg={isPressed ? 'secondary.700' : 'secondary.500'}
                p="5"
                px="7"
                rounded="8"
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}>
                {iseditLoader ? (
                  <Spinner />
                ) : (
                  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <Path
                      d="M12.4445 13.3332H2.66672V3.55539H8.54228L9.43117 2.6665H2.66672C2.43097 2.6665 2.20488 2.76015 2.03818 2.92685C1.87148 3.09355 1.77783 3.31964 1.77783 3.55539V13.3332C1.77783 13.5689 1.87148 13.795 2.03818 13.9617C2.20488 14.1284 2.43097 14.2221 2.66672 14.2221H12.4445C12.6802 14.2221 12.9063 14.1284 13.073 13.9617C13.2397 13.795 13.3334 13.5689 13.3334 13.3332V6.6665L12.4445 7.55539V13.3332Z"
                      fill="white"
                    />
                    <Path
                      d="M14.9023 2.59575L13.4046 1.09797C13.3381 1.03132 13.2591 0.978434 13.1722 0.942351C13.0852 0.906269 12.992 0.887695 12.8979 0.887695C12.8038 0.887695 12.7106 0.906269 12.6236 0.942351C12.5367 0.978434 12.4577 1.03132 12.3912 1.09797L6.29789 7.22686L5.80456 9.36464C5.78354 9.46826 5.78575 9.57526 5.81103 9.67793C5.83631 9.7806 5.88403 9.87639 5.95075 9.95842C6.01747 10.0404 6.10155 10.1067 6.19692 10.1523C6.2923 10.198 6.3966 10.2219 6.50234 10.2224C6.55699 10.2284 6.61213 10.2284 6.66678 10.2224L8.82234 9.74686L14.9023 3.60908C14.969 3.54261 15.0219 3.46364 15.058 3.3767C15.094 3.28976 15.1126 3.19655 15.1126 3.10241C15.1126 3.00828 15.094 2.91507 15.058 2.82813C15.0219 2.74119 14.969 2.66222 14.9023 2.59575ZM8.36012 8.92464L6.73345 9.28464L7.11123 7.6713L11.6979 3.05353L12.9512 4.30686L8.36012 8.92464ZM13.4535 3.80464L12.2001 2.5513L12.889 1.84908L14.1512 3.1113L13.4535 3.80464Z"
                      fill="white"
                    />
                  </Svg>
                )}

                <Text color="#FFF" marginLeft={2} fontFamily={'Cairo'}>
                  تعديل
                </Text>
              </Box>
            );
          }}
        </Pressable>
        <Pressable onPress={() => setIsOpen(true)}>
          {({isPressed}) => {
            return (
              <Box
                py="3"
                borderRadius={6}
                flexDirection="row"
                justifyContent={'center'}
                alignItems={'center'}
                marginLeft={2}
                bg={isPressed ? 'danger.300' : 'danger.100'}
                p="5"
                px="7"
                rounded="8"
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.96 : 1,
                    },
                  ],
                }}>
                <Svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                  <Path
                    d="M7.00008 1.02221e-08C7.67209 -5.81322e-05 8.31852 0.247917 8.80623 0.692845C9.29394 1.13777 9.58577 1.74576 9.62161 2.39158L9.62511 2.52632H13.4752C13.6082 2.52636 13.7362 2.57499 13.8334 2.66238C13.9306 2.74978 13.9897 2.86942 13.9988 2.99714C14.0078 3.12486 13.9662 3.25113 13.8823 3.35043C13.7983 3.44974 13.6783 3.51468 13.5466 3.53213L13.4752 3.53684H12.7338L11.8798 13.6778C11.8265 14.3105 11.5278 14.9006 11.0429 15.3309C10.5581 15.7612 9.92272 16 9.26321 16H4.73695C4.07744 16 3.44207 15.7612 2.95723 15.3309C2.47239 14.9006 2.17361 14.3105 2.12032 13.6778L1.26561 3.53684H0.525006C0.398138 3.53684 0.275564 3.49262 0.179951 3.41237C0.0843377 3.33212 0.022154 3.22126 0.00490003 3.1003L0 3.03158C5.35009e-06 2.90948 0.0459505 2.79152 0.129339 2.6995C0.212727 2.60748 0.327916 2.54764 0.453605 2.53103L0.525006 2.52632H4.37505C4.37505 1.8563 4.65162 1.21372 5.1439 0.739941C5.63619 0.266165 6.30388 1.02221e-08 7.00008 1.02221e-08ZM11.681 3.53684H2.31913L3.16684 13.5963C3.19885 13.9759 3.37815 14.33 3.66908 14.5881C3.96001 14.8462 4.34124 14.9895 4.73695 14.9895H9.26321C9.65892 14.9895 10.0402 14.8462 10.3311 14.5881C10.622 14.33 10.8013 13.9759 10.8333 13.5963L11.6803 3.53684H11.681ZM5.42506 6.06316C5.55193 6.06316 5.6745 6.10738 5.77012 6.18763C5.86573 6.26788 5.92791 6.37874 5.94517 6.49971L5.95007 6.56842V11.9579C5.95003 12.0859 5.8995 12.2091 5.80869 12.3027C5.71788 12.3962 5.59355 12.4531 5.46085 12.4618C5.32814 12.4706 5.19694 12.4305 5.09375 12.3497C4.99056 12.2689 4.92309 12.1534 4.90496 12.0266L4.90006 11.9579V6.56842C4.90006 6.43442 4.95537 6.3059 5.05383 6.21115C5.15229 6.11639 5.28582 6.06316 5.42506 6.06316ZM8.5751 6.06316C8.70197 6.06316 8.82454 6.10738 8.92015 6.18763C9.01577 6.26788 9.07795 6.37874 9.0952 6.49971L9.1001 6.56842V11.9579C9.10006 12.0859 9.04953 12.2091 8.95872 12.3027C8.86791 12.3962 8.74359 12.4531 8.61088 12.4618C8.47818 12.4706 8.34697 12.4305 8.24378 12.3497C8.1406 12.2689 8.07312 12.1534 8.05499 12.0266L8.05009 11.9579V6.56842C8.05009 6.43442 8.10541 6.3059 8.20386 6.21115C8.30232 6.11639 8.43586 6.06316 8.5751 6.06316ZM7.00008 1.01053C6.60099 1.01048 6.21676 1.15624 5.92504 1.41835C5.63332 1.68047 5.45588 2.03938 5.42856 2.42257L5.42506 2.52632H8.5751L8.5716 2.42257C8.54428 2.03938 8.36684 1.68047 8.07512 1.41835C7.7834 1.15624 7.39917 1.01048 7.00008 1.01053Z"
                    fill={colors.danger['600']}
                  />
                </Svg>

                <Text
                  color="danger.600"
                  fontWeight={800}
                  marginLeft={2}
                  fontFamily={'Cairo'}>
                  حذف
                </Text>
              </Box>
            );
          }}
        </Pressable>
      </Box>
      <DeleteAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={item.id}
        refetch={refetch}
      />
    </Box>
  );
};
const List = () => {
  const {data: address, refetch} = useQuery('address', address_request);
  const [editLoader, setEditLoader] = React.useState<boolean>(false);
  const navigation = useNavigation();

  const editAddress = (id: number): void => {
    setEditLoader(true);
    axios.get(`${API_URL}/api/addresses/` + id + '?populate=*').then(res => {
      navigation.navigate('EditAddress', res.data);
      setEditLoader(false);
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => refetch();
    }, [refetch]),
  );

  return (
    <Container marginTop={4} flex="1" width="100%" mx="auto">
      <Box width="100%" flex="1">
        {address?.data.data.length === 0 ? (
          <Box marginTop={10}>
            <AddressEmpty />
            <Box marginTop={6}>
              <Text
                textAlign={'center'}
                fontFamily={'Cairo'}
                fontWeight={800}
                fontSize={28}>
                القائمة فارغة
              </Text>
              <Text textAlign={'center'} fontFamily={'Cairo'} fontSize={20}>
                لم يتم اضافة عناوين لحسابك
              </Text>
            </Box>
          </Box>
        ) : (
          <FlatList
            style={{flex: 1}}
            data={address?.data.data}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({item, index}) => (
              <Item
                item={item}
                index={index}
                refetch={refetch}
                iseditLoader={editLoader}
                editAddress={editAddress}
              />
            )}
          />
        )}
      </Box>
    </Container>
  );
};

export default List;
