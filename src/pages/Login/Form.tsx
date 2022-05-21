import {TouchableOpacity} from 'react-native';
import React from 'react';
import {Box, Button, Checkbox, Input, Text} from 'native-base';
import MainInput from '../../components/TextInput';

import {useForm, Controller} from 'react-hook-form';
import Eye from '../../icons/Eye';
import login_request from '../../api/login_request';
import {useMutation} from 'react-query';
import {StoreData} from '../../plugins/storage';
import axios from 'axios';

import {useAuthState, useAuthDispatch} from '../../AuthContext';
// import {useNavigation} from '@react-navigation/native';
type Props = {route: any; navigation: any};

const Form: React.FC<Props> = ({route, navigation}) => {
  const {
    setError,
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useAuthDispatch();
  const auth = useAuthState();

  const onSubmit = (data: any) => mutation.mutate(data);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const mutation = useMutation(login_request, {
    onMutate: _ => {
      // dispatch({type: 'REQUEST_LOGIN'});
    },
    onSuccess: (data: any) => {
      dispatch({type: 'LOGIN_SUCCESS', payload: data.data});
      StoreData('user', data.data);
      axios.defaults.headers.common.Authorization = `Bearer ${data.data.jwt}`;
      navigation.replace('Tabs');
      reset();
    },
    onError: (error: any) => {
      console.error(error.response.data);
      if (error.response.data.error.status === 400) {
        setError('email', {
          type: 'validate',
          message: 'Invalid Email or Password',
        });
      }
    },
  });

  return (
    <Box width="100%">
      <Box marginTop="10" width="100%">
        {/* Email */}
        <Box width="100%">
          {/* {JSON.stringify(auth)} */}
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'الحقل مطلوب'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <MainInput
                label="الايميل"
                isInvalid={errors.email ? true : false}
                errorMsg={errors.email?.message}>
                <Input
                  value={value}
                  p={2}
                  autoCapitalize={'none'}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  fontSize={12}
                  fontFamily={'Cairo'}
                  fontWeight="600"
                  textAlign="right"
                  placeholder={'الرجاء كتابة الايميل'}
                />
              </MainInput>
            )}
            name="email"
          />
          {/* {JSON.stringify(errors)} */}
          {/* {errors.email && <Text>{errors.email.message}</Text>} */}
        </Box>

        {/* Password */}

        <Box marginTop={5}>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'الحقل مطلوب'},
              minLength: {value: 8, message: 'مطلوب 8 أحرف على الأقل'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <MainInput
                label="الايميل"
                isInvalid={errors.password ? true : false}
                errorMsg={errors.password?.message}>
                <Input
                  p={2}
                  fontFamily={'Cairo'}
                  fontSize={12}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  type={show ? 'text' : 'password'}
                  textAlign="right"
                  autoCapitalize={'none'}
                  placeholder="الرجاء كتابة الايميل"
                  InputRightElement={
                    <TouchableOpacity
                      onPress={handleClick}
                      style={{paddingRight: 15}}>
                      {/* <Icon name="eye" size={30} color="#900" />; */}
                      {show ? <Eye /> : <Eye />}
                    </TouchableOpacity>
                  }
                />
              </MainInput>
            )}
            name="password"
          />
          {/* <PassInput
            label="الايميل"
            isInvalid={false}
            errorMsg=""
            placeholder="الرجاء كتابة الايميل"
          /> */}
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
            isLoading={mutation.isLoading}
            colorScheme={'secondary'}
            onPress={handleSubmit(onSubmit)}
            // onPress={() => navigation.navigate('Tabs')}
            fontFamily={'Cairo'}>
            <Text fontFamily={'Cairo'} color="white" lineHeight={24}>
              تسجيل الدخول
            </Text>
          </Button>
        </Box>
        <Box flexDir={'row'} justifyContent="center" marginTop={8}>
          <Text fontFamily={'Cairo'}> ليس لديك حساب مسبقاً؟ </Text>
          <TouchableOpacity>
            <Text
              fontFamily={'Cairo'}
              onPress={() => {
                navigation.navigate('Register');
              }}
              fontWeight="700"
              color="primary.500">
              {'  '}
              إنشاء حساب{' '}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
