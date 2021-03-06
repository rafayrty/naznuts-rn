import {TouchableOpacity, useColorScheme} from 'react-native';
import React from 'react';
import {Box, Button, Checkbox, Input, Text} from 'native-base';
import MainInput from '../../components/TextInput';

import {useForm, Controller} from 'react-hook-form';
import Eye from '../../icons/Eye';
import login_request from '../../api/login_request';
import {useMutation} from 'react-query';
import {StoreData} from '../../plugins/storage';
import axios from 'axios';

import {useAuthDispatch} from '../../AuthContext';
import {useNavigation} from '@react-navigation/native';
// import {useNavigation} from '@react-navigation/native';

const Form: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const navigation = useNavigation();
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
  // const auth = useAuthState();

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
      // navigation.replace('Tabs');
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
              required: {value: true, message: '?????????? ??????????'},
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <MainInput
                label="??????????????"
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
                  bg={isDarkMode ? '#333' : '#FFF'}
                  color={isDarkMode ? '#FFF' : '#000'}
                  borderColor={isDarkMode ? '#333' : 'gray.400'}
                  textAlign="right"
                  placeholder={'???????????? ?????????? ??????????????'}
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
              required: {value: true, message: '?????????? ??????????'},
              minLength: {value: 8, message: '?????????? 8 ???????? ?????? ??????????'},
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <MainInput
                label="???????? ????????"
                isInvalid={errors.password ? true : false}
                errorMsg={errors.password?.message}>
                <Input
                  p={2}
                  fontFamily={'Cairo'}
                  fontSize={12}
                  onBlur={onBlur}
                  bg={isDarkMode ? '#333' : '#FFF'}
                  color={isDarkMode ? '#FFF' : '#000'}
                  borderColor={isDarkMode ? '#333' : 'gray.400'}
                  onChangeText={onChange}
                  value={value}
                  type={show ? 'text' : 'password'}
                  textAlign="right"
                  autoCapitalize={'none'}
                  placeholder="???????????? ?????????? ???????? ????????"
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
            label="??????????????"
            isInvalid={false}
            errorMsg=""
            placeholder="???????????? ?????????? ??????????????"
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
            <Text fontFamily={'Cairo'} color={isDarkMode ? '#FFF' : '#000'}>
              ???????? ??????????
            </Text>
          </Checkbox>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Forgot');
            }}>
            <Text fontFamily={'Cairo'} color={isDarkMode ? '#FFF' : '#000'}>
              ?????????? ?????????? ???????? ????????
            </Text>
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
              ?????????? ????????????
            </Text>
          </Button>
        </Box>
        <Box flexDir={'row'} justifyContent="center" marginTop={8}>
          <Text color={isDarkMode ? '#FFF' : '#000'} fontFamily={'Cairo'}>
            {' '}
            ?????? ???????? ???????? ??????????????{' '}
          </Text>
          <TouchableOpacity>
            <Text
              fontFamily={'Cairo'}
              onPress={() => {
                navigation.navigate('Register');
              }}
              fontWeight="700"
              color="primary.500">
              {'  '}
              ?????????? ????????{' '}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
