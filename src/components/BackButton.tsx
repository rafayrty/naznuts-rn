import {View, TouchableOpacity, useColorScheme} from 'react-native';
import React from 'react';
import {ArrowBackIcon} from 'native-base';
import {useNavigation} from '@react-navigation/core';

const BackButton = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity style={{padding: 12}} onPress={() => navigation.goBack()}>
      <View style={{transform: [{rotate: '180deg'}]}}>
        <ArrowBackIcon style={{color: isDarkMode ? '#FFF' : '#000'}} />
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
