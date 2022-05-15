import {TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {Box, Text, Container, Input, ScrollView} from 'native-base';
import Svg, {Path} from 'react-native-svg';
const Search = () => {
  return (
    <ScrollView>
      <Box safeArea>
        <Header />

        <Container marginTop={2} width="100%" mx="auto">
          <Box width="100%">
            <Box flexDir={'row'} width="100%" alignItems={'center'}>
              <TouchableOpacity style={{paddingHorizontal: 6}}>
                <Svg
                  style={{width: 28, height: 16}}
                  viewBox="0 0 6 11"
                  fill="none">
                  <Path
                    d="M1 1L5 5.5L1 10"
                    stroke="black"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </TouchableOpacity>
              <Text
                fontSize={24}
                marginTop={2}
                fontWeight={800}
                fontFamily={'Cairo'}>
                البحث
              </Text>
            </Box>
            <Box marginTop={2}>
              <Input
                p={2}
                width="100%"
                fontFamily={'Cairo'}
                fontSize={12}
                paddingRight="6"
                type={'text'}
                bg="#FFF"
                textAlign="right"
                placeholder="ابحث هنا مثال قرفة مطحونة او لوز "
                InputRightElement={
                  <Svg
                    width="16"
                    height="17"
                    style={{marginRight: 14}}
                    viewBox="0 0 16 17"
                    fill="none">
                    <Path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.4601 10.8188L15.7639 15.1227C15.9151 15.2741 16.0001 15.4793 16 15.6933C15.9999 15.9074 15.9148 16.1126 15.7635 16.2639C15.6121 16.4151 15.4068 16.5001 15.1928 16.5C14.9788 16.4999 14.7736 16.4148 14.6223 16.2635L10.3185 11.9595C9.03194 12.9561 7.41407 13.425 5.79403 13.271C4.17398 13.117 2.67346 12.3516 1.59771 11.1305C0.521957 9.90935 -0.0482098 8.32428 0.00319691 6.6977C0.0546036 5.07112 0.723722 3.52522 1.87443 2.37448C3.02514 1.22374 4.57101 0.554605 6.19754 0.503197C7.82408 0.451789 9.40911 1.02197 10.6302 2.09775C11.8513 3.17352 12.6167 4.67409 12.7707 6.29417C12.9247 7.91426 12.4558 9.53217 11.4593 10.8188H11.4601ZM6.4003 11.6996C7.67328 11.6996 8.89412 11.1939 9.79425 10.2937C10.6944 9.39354 11.2001 8.17267 11.2001 6.89966C11.2001 5.62665 10.6944 4.40577 9.79425 3.50562C8.89412 2.60546 7.67328 2.09976 6.4003 2.09976C5.12732 2.09976 3.90648 2.60546 3.00634 3.50562C2.10621 4.40577 1.60052 5.62665 1.60052 6.89966C1.60052 8.17267 2.10621 9.39354 3.00634 10.2937C3.90648 11.1939 5.12732 11.6996 6.4003 11.6996Z"
                      fill="#3F636E"
                    />
                  </Svg>
                }
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </ScrollView>
  );
};

export default Search;
