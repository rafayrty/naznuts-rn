import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {ArrowBackIcon} from 'native-base';
import {useNavigation} from '@react-navigation/core';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <View style={{transform: [{rotate: '180deg'}]}}>
        <ArrowBackIcon style={{color: 'black'}} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
