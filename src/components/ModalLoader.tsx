import {View, Modal, useColorScheme} from 'react-native';
import React from 'react';
import {Box, Text, Spinner} from 'native-base';

const ModalLoader: React.FC<{loading: boolean}> = ({loading}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Modal
      animationType="fade"
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      transparent={true}
      visible={loading}>
      <Box bg={'rgba(0,0,0,.6)'} flex="1">
        <Box
          style={{
            width: '40%',
            backgroundColor: isDarkMode ? '#333' : '#FFF',
            position: 'absolute',
            top: '40%',
            borderColor: isDarkMode ? '#FFF' : '#79C143',
            borderWidth: 1,
            left: '28.5%',
          }}
          py={9}
          px={6}>
          <Spinner color={isDarkMode ? '#FFF' : '#79C143'} />
          <Text
            textAlign={'center'}
            color={isDarkMode ? '#FFF' : '#000'}
            marginTop={3}>
            Processing Your Payment
          </Text>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalLoader;
