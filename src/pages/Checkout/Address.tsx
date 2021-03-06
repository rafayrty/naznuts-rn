import {ScrollView, TouchableOpacity, useColorScheme} from 'react-native';
import React from 'react';
import {Box, Container, Radio, Skeleton, Text, useToast} from 'native-base';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import Svg, {Rect, Path} from 'react-native-svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {address_request} from '../../api/address_request';
import Office from '../../icons/Office';
import Marker from '../../icons/Marker';
import Home from '../../icons/Home';
import {addAddress} from '../../plugins/cart';
import {GetData} from '../../plugins/storage';

const AddressCheckout = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const {
    data: address,
    isLoading,
    refetch,
  } = useQuery('address', address_request);
  const [selectedAddress, setSelectedAddress] = React.useState<string>('');
  const toast = useToast();
  const nextPage = () => {
    if (selectedAddress === '') {
      toast.show({
        bg: 'danger.500',
        title: 'Please Select an Address To Proceed',
        placement: 'top',
      });
    } else {
      navigation.navigate('Receipt');
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      GetData('address').then((res: any) => {
        if (res !== undefined && res !== null) {
          setSelectedAddress(JSON.parse(res).id);
        }
      });
      return () => refetch();
    }, [refetch]),
  );

  const updateAddress = (value: string) => {
    setSelectedAddress(value);

    addAddress(address?.data.data.find((x: any) => x.id == value));
  };

  return (
    //   Disable flex 1 on landscape mode
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Box safeArea flex="1" paddingBottom={5}>
        <Header />
        <Container flex="1" mx="auto" width="100%">
          <Box flex="1" width="100%">
            <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
              <BackButton />
              <Text
                color={isDarkMode ? '#FFF' : '#333'}
                marginLeft={0}
                fontFamily={'Cairo'}
                fontSize={22}
                fontWeight={800}>
                ?????????? ?????????? ????????
              </Text>
            </Box>
            {/* Top Svg */}
            <Box width="100%" mx="auto" marginTop={6}>
              <Svg
                style={{width: '100%'}}
                height="152"
                viewBox="0 0 280 152"
                fill="none">
                <Rect width="280" height="152" rx="8" fill="#E4F3D9" />
                <Path
                  d="M204.409 137.937L204.222 137.867C204.181 137.851 200.09 136.284 198.174 132.73C196.258 129.177 197.196 124.898 197.206 124.855L197.25 124.66L197.437 124.73C197.478 124.746 201.569 126.313 203.485 129.867C205.401 133.421 204.463 137.699 204.453 137.742L204.409 137.937ZM198.481 132.565C200.101 135.57 203.334 137.11 204.153 137.461C204.308 136.584 204.797 133.034 203.178 130.032C201.56 127.031 198.326 125.488 197.506 125.136C197.351 126.014 196.862 129.563 198.481 132.565Z"
                  fill="#3F636E"
                />
                <Path
                  d="M199.639 131.484C203.082 133.556 204.409 137.671 204.409 137.671C204.409 137.671 200.152 138.427 196.708 136.355C193.264 134.283 191.938 130.168 191.938 130.168C191.938 130.168 196.195 129.412 199.639 131.484Z"
                  fill="#79C143"
                />
                <Path
                  d="M144.198 80.4627C144.365 80.2045 144.585 79.9846 144.843 79.8172C145.1 79.6499 145.391 79.5389 145.694 79.4916C145.998 79.4442 146.308 79.4616 146.605 79.5426C146.902 79.6235 147.178 79.7662 147.415 79.9613C147.49 80.0234 147.561 80.0906 147.626 80.1626L156.202 78.9141L156.679 72.4652C156.716 71.9704 156.947 71.5105 157.323 71.1865C157.699 70.8625 158.188 70.701 158.683 70.7375C159.177 70.7741 159.637 71.0057 159.961 71.3813C160.285 71.757 160.447 72.246 160.41 72.7408C160.409 72.7522 160.408 72.7637 160.407 72.7752L159.571 81.8241L159.567 81.8443C159.459 82.1921 159.24 82.4956 158.946 82.7097C158.651 82.9238 158.295 83.0372 157.93 83.0329L147.843 82.8587C147.804 82.9185 147.762 82.9762 147.716 83.0315C147.521 83.2691 147.278 83.4627 147.003 83.5997C146.728 83.7367 146.427 83.8141 146.12 83.8266C145.812 83.8392 145.506 83.7867 145.221 83.6726C144.935 83.5586 144.677 83.3855 144.463 83.1647C144.42 83.1202 144.379 83.0743 144.34 83.0268C144.049 82.6688 143.879 82.2282 143.853 81.7677C143.828 81.3072 143.949 80.8505 144.198 80.4627Z"
                  fill="#FFB7B7"
                />
                <Path
                  d="M161.488 135.447L159.042 135.447L157.879 126.013L161.489 126.013L161.488 135.447Z"
                  fill="#FFB7B7"
                />
                <Path
                  d="M162.112 137.818L154.225 137.818V137.718C154.225 136.904 154.549 136.123 155.124 135.548C155.7 134.972 156.481 134.648 157.295 134.648H157.295L162.112 134.649L162.112 137.818Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M178.58 133.23L176.265 134.019L172.118 125.466L175.535 124.3L178.58 133.23Z"
                  fill="#FFB7B7"
                />
                <Path
                  d="M179.936 135.272L172.471 137.818L172.439 137.724C172.176 136.953 172.23 136.11 172.589 135.379C172.948 134.648 173.583 134.09 174.353 133.827L174.354 133.827L178.913 132.272L179.936 135.272Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M164.182 52.9563C164.182 52.9563 161.747 52.1523 160.182 55.3683C158.617 58.5844 156.183 62.122 156.183 62.122L157.574 62.4436C157.574 62.4436 157.921 60.1924 158.791 59.8708L158.443 62.7652C158.443 62.7652 168.877 66.1421 173.572 62.4436L173.398 61.318C173.398 61.318 174.094 61.4788 174.094 62.4436L174.615 61.9612C174.615 61.9612 174.094 60.9964 172.529 59.71C171.501 58.8657 171.148 57.2593 171.027 56.255C170.931 55.4047 170.566 54.6072 169.986 53.9781C168.946 52.8635 167.051 51.6788 164.182 52.9563Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M165.079 64.1926C167.535 64.1926 169.526 62.2019 169.526 59.7461C169.526 57.2904 167.535 55.2996 165.079 55.2996C162.623 55.2996 160.633 57.2904 160.633 59.7461C160.633 62.2019 162.623 64.1926 165.079 64.1926Z"
                  fill="#FFB7B7"
                />
                <Path
                  d="M159.15 67.8541L158.342 67.5846C158.342 67.5846 156.725 68.2583 156.725 69.471C156.725 70.6837 156.455 75.5344 156.455 75.5344L160.094 75.9387L159.15 67.8541Z"
                  fill="#CBCBCB"
                />
                <Path
                  d="M173.62 94.3577C173.285 93.982 173.096 93.4983 173.087 92.9948C173.078 92.4913 173.25 92.0013 173.572 91.614L171.303 72.607C171.28 72.1588 171.437 71.7201 171.738 71.3871C172.039 71.0542 172.459 70.8542 172.908 70.8311C173.356 70.808 173.795 70.9637 174.128 71.2639C174.462 71.5642 174.663 71.9845 174.687 72.4326C174.687 72.4388 174.687 72.445 174.687 72.4512L176.718 91.4784C176.791 91.5523 176.859 91.6318 176.921 91.7161C177.084 91.9413 177.2 92.1963 177.265 92.4667C177.329 92.7371 177.339 93.0175 177.295 93.2919C177.251 93.5663 177.154 93.8293 177.008 94.0659C176.862 94.3026 176.671 94.5082 176.446 94.671C176.423 94.6879 176.399 94.7043 176.375 94.7202C176.114 94.8928 175.819 95.0055 175.509 95.0502C175.2 95.0949 174.884 95.0706 174.585 94.979C174.212 94.8659 173.878 94.6507 173.62 94.3577Z"
                  fill="#FFB7B7"
                />
                <Path
                  d="M171.542 75.5344L175.18 75.1302C175.18 75.1302 174.91 70.2794 174.91 69.0667C174.91 67.8541 173.293 67.1803 173.293 67.1803L172.485 67.4498L171.542 75.5344Z"
                  fill="#CBCBCB"
                />
                <Path
                  d="M159.689 82.2647C159.689 82.2647 156.59 87.9308 156.59 94.8026C156.59 101.675 156.321 133.204 156.321 133.204C156.321 133.204 160.363 135.091 162.788 132.8L164.944 97.9017L173.433 132.126C173.433 132.126 177.475 132.935 179.362 131.587L175.724 107.738C175.724 107.738 174.242 85.3706 170.199 83.7537C166.157 82.1368 159.689 82.2647 159.689 82.2647Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M160.274 59.7743C161.848 58.6351 163.123 57.323 163.965 55.7622C163.965 55.7622 166.854 58.9719 168.62 59.1324C170.385 59.2929 168.78 55.2807 168.78 55.2807L165.57 54.4783L162.521 54.7992L160.114 56.4041L160.274 59.7743Z"
                  fill="#2F2E41"
                />
                <Path
                  d="M169.526 66.3719C169.526 66.3719 169.654 66.303 161.98 66.5825L158.769 67.467L158.342 67.5846C158.342 67.5846 158.746 75.6692 159.824 77.1513C160.902 78.6335 160.632 79.442 160.363 79.5767C160.094 79.7114 159.42 79.442 159.824 80.1157C160.228 80.7894 160.767 80.3852 160.228 80.7894C159.689 81.1936 159.42 82.6758 159.42 82.6758L171.277 84.2927C171.277 84.2927 171.681 79.0377 172.759 76.3429C173.837 73.648 174.107 72.5701 174.107 72.5701L173.298 67.1803L169.526 66.3719Z"
                  fill="#CBCBCB"
                />
                <Path
                  d="M146.982 43.3885H146.3V24.7091C146.3 21.8418 145.161 19.092 143.134 17.0645C141.106 15.037 138.357 13.898 135.489 13.898H95.9144C93.0472 13.898 90.2973 15.037 88.2698 17.0645C86.2423 19.0919 85.1033 21.8418 85.1033 24.7091V127.186C85.1033 130.053 86.2423 132.803 88.2698 134.83C90.2973 136.858 93.0471 137.997 95.9144 137.997H135.489C136.909 137.997 138.315 137.717 139.626 137.174C140.938 136.63 142.13 135.834 143.134 134.83C144.138 133.826 144.934 132.635 145.477 131.323C146.021 130.011 146.3 128.605 146.3 127.186V56.6848H146.982L146.982 43.3885Z"
                  fill="#3F636E"
                />
                <Path
                  d="M143.999 24.7851V127.111C144 128.17 143.793 129.219 143.388 130.198C142.984 131.177 142.39 132.067 141.642 132.817C140.893 133.567 140.005 134.162 139.026 134.568C138.048 134.974 136.999 135.184 135.94 135.185H96.1607C94.0209 135.186 91.9681 134.338 90.454 132.826C88.9398 131.314 88.0883 129.262 88.0868 127.122V24.7851C88.0861 23.7255 88.294 22.6762 88.6988 21.6971C89.1036 20.7179 89.6973 19.828 90.4459 19.0783C91.1946 18.3286 92.0836 17.7336 93.0622 17.3275C94.0408 16.9213 95.0898 16.7119 96.1493 16.7112H100.985C100.747 17.2936 100.656 17.9255 100.72 18.5512C100.785 19.1769 101.002 19.7772 101.353 20.2992C101.704 20.8213 102.177 21.249 102.733 21.5447C103.288 21.8404 103.907 21.9951 104.536 21.995H127.209C127.838 21.9951 128.457 21.8404 129.012 21.5447C129.567 21.249 130.041 20.8213 130.392 20.2992C130.743 19.7772 130.96 19.1769 131.024 18.5512C131.088 17.9255 130.998 17.2936 130.76 16.7112H135.926C138.065 16.7092 140.117 17.5573 141.632 19.0687C143.146 20.5801 143.998 22.6312 143.999 24.7706V24.7851L143.999 24.7851Z"
                  fill="white"
                />
                <Path
                  d="M143.999 39.9239V36.4385H138.724V17.2096C137.828 16.8787 136.881 16.7099 135.926 16.7112H135.239V36.4385H116.941V21.995H113.455V36.4385H98.1195V16.7112H96.1608C95.6484 16.7104 95.1372 16.7588 94.6341 16.8558V36.4385H88.0869V39.9239H94.6341V47.9857L88.087 51.7655V55.7912L94.6341 52.0113V75.9976H88.0869V79.483H94.6341V114.163H88.0869V117.648H94.6341V135.04C95.1372 135.137 95.6484 135.186 96.1608 135.185H98.1195V117.648H113.455V135.185H116.941V117.648H135.239V135.185H135.926C136.881 135.186 137.828 135.017 138.724 134.686V117.648H143.999V114.163H138.724V99.0012H143.952V95.5158H138.724V79.483H143.999V75.9976H138.724V54.7368H143.999V51.2514H138.724V39.9239L143.999 39.9239ZM108.598 39.9239L108.598 39.9239L98.1196 45.9746L98.1195 45.9746V39.9239H108.598ZM98.1195 49.9985L98.1196 49.9984L113.455 41.1438V75.9976H98.1195V49.9985ZM98.1195 114.163V79.483H113.455V114.163H98.1195ZM135.239 114.163H116.941V99.0012H135.239V114.163ZM135.239 95.5158H116.941V79.483H135.239V95.5158ZM135.239 75.9976H116.941V54.7368H135.239V75.9976ZM135.239 51.2514H116.941V39.9239H135.239V51.2514Z"
                  fill="#E5E5E5"
                />
                <Path
                  d="M146.915 51.3158C146.915 62.3842 126.874 87.0411 126.874 87.0411C126.874 87.0411 106.833 62.3842 106.833 51.3158C106.833 46.0006 108.944 40.9031 112.703 37.1447C116.461 33.3863 121.559 31.2749 126.874 31.2749C132.189 31.2749 137.287 33.3863 141.045 37.1447C144.804 40.9031 146.915 46.0006 146.915 51.3158Z"
                  fill="#79C143"
                />
                <Path
                  d="M138.725 50.4445C138.725 52.7883 138.029 55.0794 136.727 57.0282C135.425 58.9769 133.574 60.4958 131.409 61.3927C129.244 62.2897 126.861 62.5243 124.562 62.0671C122.264 61.6099 120.152 60.4812 118.495 58.8239C116.837 57.1666 115.709 55.0551 115.252 52.7564C114.794 50.4576 115.029 48.0749 115.926 45.9096C116.823 43.7442 118.342 41.8934 120.291 40.5913C122.239 39.2892 124.53 38.5942 126.874 38.5942C128.43 38.5934 129.97 38.8991 131.407 39.4937C132.845 40.0883 134.151 40.9602 135.251 42.0596C136.352 43.159 137.225 44.4644 137.821 45.9012C138.417 47.338 138.724 48.8781 138.725 50.4336V50.4445Z"
                  fill="white"
                />
                <Path
                  d="M126.833 55.1224C129.271 55.1224 131.248 53.1459 131.248 50.7076C131.248 48.2694 129.271 46.2928 126.833 46.2928C124.395 46.2928 122.418 48.2694 122.418 50.7076C122.418 53.1459 124.395 55.1224 126.833 55.1224Z"
                  fill="#79C143"
                />
                <Path
                  d="M133.24 60.7909C131.337 62.0011 129.128 62.6437 126.873 62.6433C124.618 62.643 122.409 61.9998 120.506 60.7891C120.902 59.4058 121.738 58.189 122.887 57.3228C124.035 56.4566 125.435 55.9882 126.874 55.9884C128.313 55.9886 129.712 56.4574 130.861 57.3239C132.01 58.1904 132.845 59.4074 133.24 60.7909Z"
                  fill="#79C143"
                />
                <Path
                  d="M126.874 101.505C129.858 101.505 132.276 99.0867 132.276 96.1031C132.276 93.1194 129.858 90.7007 126.874 90.7007C123.89 90.7007 121.472 93.1194 121.472 96.1031C121.472 99.0867 123.89 101.505 126.874 101.505Z"
                  fill="#79C143"
                />
                <Path
                  d="M210.457 138.102H70.3443C70.2981 138.102 70.2538 138.084 70.2211 138.051C70.1884 138.018 70.17 137.974 70.17 137.928C70.17 137.881 70.1884 137.837 70.2211 137.804C70.2538 137.772 70.2981 137.753 70.3443 137.753H210.457C210.503 137.753 210.547 137.772 210.58 137.804C210.613 137.837 210.631 137.881 210.631 137.928C210.631 137.974 210.613 138.018 210.58 138.051C210.547 138.084 210.503 138.102 210.457 138.102Z"
                  fill="#CBCBCB"
                />
              </Svg>
            </Box>
            {/* Top Titles */}
            <Box marginTop={6}>
              <Text
                textAlign={'left'}
                fontSize={20}
                fontWeight={600}
                fontFamily={'Cairo'}>
                ?????? ?????? ???????? ???? ??????
              </Text>
              <Text
                textAlign={'left'}
                fontSize={20}
                fontFamily={'Cairo'}
                fontWeight={'800'}
                color="primary.500">
                ?????????? ????????
              </Text>
            </Box>

            {/* Add New Address */}
            <Box width="100%">
              <TouchableOpacity
                onPress={() => navigation.navigate('NewAddress')}>
                <Box
                  marginTop={4}
                  bg="primary.500"
                  borderRadius={8}
                  flexDir={'row-reverse'}
                  alignItems={'center'}
                  px={4}
                  py={3}
                  justifyContent={'space-between'}>
                  <Box>
                    <Svg width="17" height="8" viewBox="0 0 17 8" fill="none">
                      <Path
                        d="M16 4.5C16.2761 4.5 16.5 4.27614 16.5 4C16.5 3.72386 16.2761 3.5 16 3.5L16 4.5ZM0.646445 3.64645C0.451183 3.84171 0.451183 4.15829 0.646445 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.73079 0.976313 4.73079 0.65973 4.53553 0.464468C4.34027 0.269206 4.02369 0.269206 3.82843 0.464468L0.646445 3.64645ZM16 3.5L0.999999 3.5L0.999999 4.5L16 4.5L16 3.5Z"
                        fill="white"
                      />
                    </Svg>
                  </Box>
                  <Box flexDir={'row'} alignItems={'center'}>
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <Path
                        d="M13.1428 6.28571C13.1428 4.92174 12.601 3.61364 11.6365 2.64916C10.6721 1.68469 9.36395 1.14286 7.99998 1.14286C6.63601 1.14286 5.3279 1.68469 4.36343 2.64916C3.39896 3.61364 2.85712 4.92174 2.85712 6.28571C2.85712 8.39543 4.54512 11.1451 7.99998 14.4389C11.4548 11.1451 13.1428 8.39543 13.1428 6.28571ZM7.99998 16C3.80912 12.1909 1.71426 8.952 1.71426 6.28571C1.71426 4.61864 2.37651 3.01984 3.55531 1.84104C4.73411 0.662243 6.3329 0 7.99998 0C9.66705 0 11.2658 0.662243 12.4446 1.84104C13.6234 3.01984 14.2857 4.61864 14.2857 6.28571C14.2857 8.952 12.1908 12.1909 7.99998 16Z"
                        fill="white"
                      />
                      <Path
                        d="M7.99999 8.00002C8.45465 8.00002 8.89069 7.8194 9.21218 7.49791C9.53367 7.17642 9.71428 6.74039 9.71428 6.28573C9.71428 5.83107 9.53367 5.39504 9.21218 5.07355C8.89069 4.75206 8.45465 4.57145 7.99999 4.57145C7.54534 4.57145 7.1093 4.75206 6.78781 5.07355C6.46632 5.39504 6.28571 5.83107 6.28571 6.28573C6.28571 6.74039 6.46632 7.17642 6.78781 7.49791C7.1093 7.8194 7.54534 8.00002 7.99999 8.00002ZM7.99999 9.14287C7.24223 9.14287 6.51551 8.84185 5.97969 8.30604C5.44387 7.77022 5.14285 7.04349 5.14285 6.28573C5.14285 5.52797 5.44387 4.80124 5.97969 4.26543C6.51551 3.72961 7.24223 3.42859 7.99999 3.42859C8.75776 3.42859 9.48448 3.72961 10.0203 4.26543C10.5561 4.80124 10.8571 5.52797 10.8571 6.28573C10.8571 7.04349 10.5561 7.77022 10.0203 8.30604C9.48448 8.84185 8.75776 9.14287 7.99999 9.14287Z"
                        fill="white"
                      />
                    </Svg>
                    <Text
                      fontWeight={600}
                      fontFamily={'Cairo'}
                      color="white"
                      marginLeft={2}>
                      ?????????? ?????????? ????????{' '}
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box width={'100%'}>
              <Text
                color={isDarkMode ? '#FFF' : '#000'}
                textAlign={'left'}
                marginTop={6}
                fontFamily={'Cairo'}>
                ???????????? ?????????? ????????????
              </Text>

              {address?.data.data.length === 0 && !isLoading && (
                <Text
                  color="white"
                  marginTop={4}
                  fontWeight={'700'}
                  textAlign={'left'}>
                  ???? ?????? ???????????? ?????? ??????????
                </Text>
              )}
              <Box width="100%">
                <Radio.Group
                  width="100%"
                  value={selectedAddress}
                  onChange={value => updateAddress(value)}
                  name="exampleGroup"
                  colorScheme="primary"
                  accessibilityLabel="pick an option">
                  {address?.data.data.map((item: any, index: number) => {
                    return (
                      <Skeleton
                        key={item.id}
                        h="20"
                        rounded="sm"
                        isLoaded={!isLoading}>
                        <Radio
                          width="100%"
                          colorScheme="primary"
                          value={item.id}
                          my={1}>
                          <Box
                            bg={isDarkMode ? '#333' : '#FFF'}
                            width="88%"
                            shadow={3}
                            borderRadius={10}
                            my={3}
                            mx={1}
                            py={3}
                            px={5}>
                            <Box
                              flexDir={'row'}
                              width="100%"
                              alignItems={'center'}>
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
                                  <Office
                                    color={isDarkMode ? '#333' : '#FFF'}
                                  />
                                )}
                                {item.attributes.type === 'Other' && (
                                  <Marker
                                    color={isDarkMode ? '#333' : '#FFF'}
                                  />
                                )}
                              </Box>
                              <Text
                                marginLeft={2}
                                fontSize={14}
                                fontWeight={800}
                                color="primary.500"
                                fontFamily={'Cairo'}>
                                ?????????? {index + 1}
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
                          </Box>
                        </Radio>
                      </Skeleton>
                    );
                  })}
                  {isLoading && (
                    <Skeleton
                      size="5"
                      marginTop={3}
                      width="100%"
                      h="20"
                      rounded="sm"
                    />
                  )}
                </Radio.Group>
              </Box>
            </Box>
          </Box>

          <Box width="100%">
            <TouchableOpacity onPress={() => nextPage()}>
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
                    ???????? ????????{' '}
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
        </Container>
      </Box>
    </ScrollView>
  );
};

export default AddressCheckout;
