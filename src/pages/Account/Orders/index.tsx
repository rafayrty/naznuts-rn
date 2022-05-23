import React from 'react';
import Header from '../../../components/Header';
import {ArrowBackIcon, Box, Container, Text, View} from 'native-base';
import BackButton from '../../../components/BackButton';
import OrderTabs from './OrderTabs';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Orders = () => {
  const navigation = useNavigation();
  return (
    <Box safeArea flex="1">
      <Header />

      <Container mx="auto" width="100%">
        <Box
          marginTop={4}
          marginBottom={4}
          flexDir={'row'}
          alignItems={'center'}>
          <TouchableOpacity
            style={{padding: 10}}
            onPress={() => navigation.navigate('Account')}>
            <View style={{transform: [{rotate: '180deg'}]}}>
              <ArrowBackIcon style={{color: 'black'}} />
            </View>
          </TouchableOpacity>

          <Text
            marginLeft={0}
            fontFamily={'Cairo'}
            fontSize={22}
            fontWeight={800}>
            طلباتي
          </Text>
        </Box>
      </Container>

      <OrderTabs />
    </Box>
  );
};

export default Orders;
