import React from 'react';
import {Box, Container, Text} from 'native-base';
import BackButton from '../../../components/BackButton';
import Header from '../../../components/Header';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {useColorScheme} from 'react-native';

const Terms = () => {
  const isDarkMode = useColorScheme() === 'dark';
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
            color={isDarkMode ? '#FFF' : '#000'}
            fontWeight={800}>
            الشروط و الأحكام
          </Text>
        </Box>

        <Box marginTop={6} width="100%">
          <Box
            width="100%"
            py={3}
            borderTopColor={'gray.300'}
            borderTopWidth={2}
            borderBottomWidth={2}
            borderBottomColor={'gray.300'}
            px={1}>
            <Collapse>
              <CollapseHeader>
                <Box>
                  <Text
                    color={isDarkMode ? '#FFF' : '#000'}
                    textAlign={'left'}
                    fontFamily={'Cairo'}>
                    الشروط والأحكام
                  </Text>
                </Box>
              </CollapseHeader>
              <CollapseBody>
                <Text color={isDarkMode ? '#FFF' : '#000'}>Ta daa!</Text>
              </CollapseBody>
            </Collapse>
          </Box>
          <Box
            width="100%"
            py={3}
            borderBottomWidth={2}
            borderBottomColor={'gray.300'}
            px={1}>
            <Collapse>
              <CollapseHeader>
                <Box>
                  <Text
                    color={isDarkMode ? '#FFF' : '#000'}
                    textAlign={'left'}
                    fontFamily={'Cairo'}>
                    الشروط والأحكام
                  </Text>
                </Box>
              </CollapseHeader>
              <CollapseBody>
                <Text color={isDarkMode ? '#FFF' : '#000'}>Ta daa!</Text>
              </CollapseBody>
            </Collapse>
          </Box>
          <Box
            width="100%"
            py={3}
            borderBottomWidth={2}
            borderBottomColor={'gray.300'}
            px={1}>
            <Collapse>
              <CollapseHeader>
                <Box>
                  <Text
                    color={isDarkMode ? '#FFF' : '#000'}
                    textAlign={'left'}
                    fontFamily={'Cairo'}>
                    حول NazNuts
                  </Text>
                </Box>
              </CollapseHeader>
              <CollapseBody>
                <Text color={isDarkMode ? '#FFF' : '#000'}>Ta daa!</Text>
              </CollapseBody>
            </Collapse>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Terms;
