import React, {ReactNode, useState} from 'react';
import {
  Box,
  Button,
  Container,
  Input,
  Text,
  useDisclose,
  useTheme,
} from 'native-base';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import {ScrollView, TouchableOpacity} from 'react-native';
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
import {useFocusEffect} from '@react-navigation/native';

import Item from './item';
import {tags_request} from '../../api/tags_request';

const CategoryView = ({route}: any) => {
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(5000);
  const {colors} = useTheme();
  const {slug} = route.params;
  const [catSlug, setCatSlug] = useState<string>('');
  const [filters, setFilters] = useState<any>([]);
  const [order, setOrder] = useState<string>('asc');

  const {data} = useQuery('categories', categories_request);
  const [selectedTags, setSelectedTags] = React.useState<Array<any>>([]);

  const {data: products, refetch} = useQuery(
    ['products', [catSlug, filters]],
    categories_product_request,
  );

  const {data: tags} = useQuery('tags', tags_request);

  //  const filters =
  useFocusEffect(
    React.useCallback(() => {
      setCatSlug(slug);
      refetch();
      return () => refetch();
    }, [refetch, slug]),
  );

  const toggleTags = (id: number) => {
    const find = selectedTags.findIndex((tag: number) => tag === id);
    if (find !== -1) {
      setSelectedTags(prevState =>
        prevState.filter(prevItem => prevItem !== id),
      );
      return;
    }
    setSelectedTags((prevState: Array<any>[]) => [...prevState, id]);
  };

  const checkBGTagColor = (id: number) => {
    if (selectedTags.find((cat: number) => cat === id)) {
      return 'primary.500';
    } else {
      return 'white';
    }
  };
  const checkFGTagColor = (id: number) => {
    if (selectedTags.find((cat: number) => cat === id)) {
      return 'white';
    } else {
      return colors.primary['500'];
    }
  };

  const applyFilters = () => {
    setFilters([{from: fromValue, to: toValue}, [...selectedTags], order]);
    refetch();
  };

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
              <Text fontFamily={'Cairo'} fontSize={22} fontWeight={800}>
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
                <TouchableOpacity
                  key={item.attributes.slug}
                  onPress={() => setCatSlug(item.attributes.slug)}
                  style={{marginLeft: 15, paddingVertical: 15}}>
                  <Box>
                    <Text
                      color={
                        catSlug === item.attributes.slug
                          ? 'secondary.600'
                          : 'gray.400'
                      }
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
                <Box flexDir={'row'} flexWrap={'wrap'}>
                  {tags?.data.data.map((item: any, index: number) => {
                    return (
                      <TouchableOpacity
                        key={`item-${index}`}
                        onPress={() => toggleTags(item.id)}
                        style={{marginTop: 14, marginLeft: 8}}>
                        <Box
                          shadow={2}
                          borderColor="primary.500"
                          borderWidth={1}
                          borderRadius={8}
                          bg={checkBGTagColor(item.id)}>
                          <Box
                            py={2}
                            px={3}
                            flexDir={'row'}
                            alignItems={'center'}>
                            <Text
                              fontFamily={'Cairo'}
                              fontSize={12}
                              color={checkFGTagColor(item.id)}
                              fontWeight={600}>
                              {item.attributes.name}
                            </Text>
                          </Box>
                        </Box>
                      </TouchableOpacity>
                    );
                  })}
                </Box>
              </Box>

              <Box marginTop={4}>
                <Text
                  textAlign={'left'}
                  fontFamily={'Cairo'}
                  fontSize={16}
                  fontWeight={600}>
                  الترتيب حسب
                </Text>
                <Box flexDir={'row'}>
                  <TouchableOpacity
                    onPress={() => setOrder('asc')}
                    style={{marginTop: 14, marginLeft: 8}}>
                    <Box
                      shadow={2}
                      borderColor="primary.500"
                      borderWidth={1}
                      borderRadius={8}
                      bg={order === 'asc' ? 'primary.500' : 'white'}>
                      <Box py={2} px={3} flexDir={'row'} alignItems={'center'}>
                        <Text
                          fontFamily={'Cairo'}
                          fontSize={12}
                          color={order === 'asc' ? 'white' : 'primary.500'}
                          fontWeight={600}>
                          الأقل سعراً{' '}
                        </Text>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setOrder('desc')}
                    style={{marginTop: 14, marginLeft: 8}}>
                    <Box
                      shadow={2}
                      borderColor="primary.500"
                      borderWidth={1}
                      borderRadius={8}
                      bg={order === 'desc' ? 'primary.500' : 'white'}>
                      <Box py={2} px={3} flexDir={'row'} alignItems={'center'}>
                        <Text
                          fontFamily={'Cairo'}
                          fontSize={12}
                          color={order === 'desc' ? 'white' : 'primary.500'}
                          fontWeight={600}>
                          الأعلى سعراً{' '}
                        </Text>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
            <Box flexDir={'row'} justifyContent={'space-between'}>
              <Button
                width="40%"
                marginTop={6}
                bg="primary.500"
                onPress={() => applyFilters()}
                colorScheme={'primary'}>
                <Text color="#FFF" fontFamily={'Cairo'}>
                  يتقدم
                </Text>
              </Button>

              <Button
                width="40%"
                marginTop={6}
                marginLeft={2}
                bg="secondary.500"
                colorScheme={'secondary'}>
                <Text color="#FFF" fontFamily={'Cairo'}>
                  إعادة ضبط
                </Text>
              </Button>
            </Box>
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
          {products?.data.data.map((item: any, index: number) => {
            return (
              <Item key={item.attributes.slug} item={item} index={index} />
            );
          })}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default CategoryView;
