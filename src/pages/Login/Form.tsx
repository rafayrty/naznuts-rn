import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Button, Checkbox, Text} from 'native-base';
import MainInput from '../../components/TextInput';
import PassInput from '../../components/PassInput';

type Props = {navigation: any};

const Form: React.FC<Props> = ({navigation}) => {
  return (
    <Box width="100%">
      <Box marginTop="10" width="100%">
        {/* Email */}
        <Box width="100%">
          <MainInput
            label="الايميل"
            isInvalid={false}
            errorMsg=""
            placeholder="الرجاء كتابة الايميل"
          />
        </Box>

        {/* Password */}

        <Box marginTop={5}>
          <PassInput
            label="الايميل"
            isInvalid={false}
            errorMsg=""
            placeholder="الرجاء كتابة الايميل"
          />
        </Box>

        <Box
          flexDir="row"
          justifyContent={'space-between'}
          alignItems={'center'}
          marginTop={5}>
          <Checkbox
            value="one"
            fontFamily={'Cairo'}
            borderWidth="0"
            bg="primary.100">
            <Text fontFamily={'Cairo'}>تذكر حسابي</Text>
          </Checkbox>
          <TouchableOpacity>
            <Text fontFamily={'Cairo'}>إعادة تعيين كلمة السر</Text>
          </TouchableOpacity>
        </Box>

        <Box marginTop={12}>
          <Button
            width={'80%'}
            mx="auto"
            colorScheme={'secondary'}
            onPress={() => navigation.navigate('Tabs')}
            fontFamily={'Cairo'}>
            <Text fontFamily={'Cairo'} color="white" lineHeight={24}>
              تسجيل الدخول
            </Text>
          </Button>
        </Box>
        <Box flexDir={'row'} justifyContent="center" marginTop={8}>
          <Text fontFamily={'Cairo'}>لديك حساب مسبقاً؟ </Text>
          <TouchableOpacity>
            <Text
              fontFamily={'Cairo'}
              onPress={() => {
                navigation.navigate('Register');
              }}
              fontWeight="700"
              color="primary.500">
              {'  '}
              تسجيل دخول
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
