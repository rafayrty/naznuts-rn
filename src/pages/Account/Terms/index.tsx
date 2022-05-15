import React from 'react';
import {Box, Container, Text} from 'native-base';
import BackButton from '../../../components/BackButton';
import Header from '../../../components/Header';

const Terms = () => {
  return (
    <Box safeArea>
      <Header />
      <Container mx="auto" width="100%">
        <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
          <BackButton />
          <Text
            marginLeft={3}
            fontFamily={'Cairo'}
            fontSize={22}
            fontWeight={800}>
            الشروط و الأحكام
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
