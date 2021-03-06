import React from 'react';
import {
  Box,
  Text,
  Container,
  Button,
  Input,
  TextArea,
  useToast,
} from 'native-base';
import Header from '../../../components/Header';
import Svg, {Path} from 'react-native-svg';
import TextInput from '../../../components/TextInput';
import BackButton from '../../../components/BackButton';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation} from 'react-query';
import contact_request from '../../../api/contact_request';
import {Linking, TouchableOpacity, useColorScheme} from 'react-native';

const Contact = () => {
  const toast = useToast();
  const isDarkMode = useColorScheme() === 'dark';
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const mutation = useMutation(contact_request, {
    onSuccess: _ => {
      toast.show({
        bg: 'primary.500',
        title: 'Message Sent Successfully',
        placement: 'top',
      });
      reset();
    },
  });
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };
  return (
    <ScrollView>
      <Box safeArea>
        <Header />
        <Container marginTop={4} width="100%" mx="auto">
          <Box my={4} flexDir={'row'} alignItems={'center'}>
            <BackButton />
            <Text
              marginLeft={0}
              color={isDarkMode ? '#FFF' : '#333'}
              fontFamily={'Cairo'}
              fontSize={22}
              fontWeight={800}>
              اتصل بنا
            </Text>
          </Box>

          <Box borderRadius={8} width="100%" px={6} py={5} bg="primary.500">
            <Text
              color={isDarkMode ? '#333' : '#FFF'}
              fontFamily={'Cairo'}
              fontWeight={800}
              fontSize={20}
              textAlign="left">
              نسعد بتواصلكم معنا
            </Text>

            <Box marginTop={3}>
              <Box flexDir={'row'} alignItems={'center'}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M3.17946 15.9999C3.87674 15.9999 4.85623 15.7477 6.32296 14.9284C8.10654 13.9284 9.4861 13.0052 11.26 11.2362C12.9704 9.52728 13.8027 8.42084 14.9676 6.30153C16.2836 3.90864 16.0592 2.65434 15.8085 2.11827C15.5098 1.47754 15.069 1.09432 14.4993 0.713963C14.1757 0.501973 13.8332 0.32025 13.4762 0.171099C13.4405 0.155742 13.4073 0.141099 13.3776 0.127884C13.2008 0.0482406 12.9329 -0.0721179 12.5935 0.056455C12.3671 0.141456 12.1649 0.315387 11.8484 0.627891C11.1993 1.2679 10.3123 2.69327 9.98514 3.39328C9.76545 3.86507 9.62006 4.1765 9.6197 4.52579C9.6197 4.93473 9.82546 5.25009 10.0752 5.59045C10.1219 5.65438 10.1684 5.71545 10.2134 5.77474C10.4852 6.13189 10.5449 6.2351 10.5056 6.41939C10.4259 6.78975 9.83189 7.89226 8.85562 8.8662C7.87935 9.84014 6.80841 10.3966 6.43655 10.4759C6.24437 10.5169 6.13899 10.4548 5.77034 10.1734C5.71748 10.133 5.66318 10.0912 5.60638 10.0494C5.22559 9.76622 4.92481 9.56586 4.52545 9.56586H4.5233C4.17573 9.56586 3.87817 9.71657 3.38521 9.96515C2.74223 10.2894 1.27371 11.1648 0.62965 11.8145C0.316372 12.1302 0.141694 12.3316 0.0563192 12.5577C-0.072279 12.898 0.0488176 13.1648 0.127763 13.3434C0.14098 13.373 0.155625 13.4055 0.170985 13.4416C0.321345 13.7979 0.504178 14.1396 0.717169 14.4623C1.09689 15.0302 1.48161 15.4699 2.12389 15.7688C2.45369 15.9248 2.81464 16.0038 3.17946 15.9999Z"
                    fill={isDarkMode ? '#333' : '#FFF'}
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  fontWeight={800}
                  color={isDarkMode ? '#333' : '#FFF'}
                  marginLeft={2}>
                  اتصل بنا
                </Text>
              </Box>
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:077-4021011')}>
                <Text color={isDarkMode ? '#333' : '#FFF'} textAlign={'left'}>
                  077-4021011{' '}
                </Text>
              </TouchableOpacity>
            </Box>
            <Box marginTop={4}>
              <Box flexDir={'row'} alignItems={'center'}>
                <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <Path
                    d="M8 0C3.58308 0 0 3.58115 0 8C0 12.4188 3.58154 16 8 16C12.4185 16 16 12.4185 16 8C16 3.58154 12.4173 0 8 0ZM12.8008 7.81769C12.6912 9.07269 12.155 9.72923 11.7238 10.0585C11.2927 10.3877 10.775 10.5323 10.3285 10.4523C10.1215 10.4153 9.92391 10.3378 9.74692 10.2244C9.56992 10.1109 9.41701 9.96371 9.29692 9.79115C8.84439 10.2313 8.23589 10.4743 7.60462 10.4669C7.3259 10.4691 7.04985 10.4125 6.7944 10.301C6.53896 10.1895 6.30984 10.0255 6.12192 9.81962C5.68423 9.34192 5.46808 8.65192 5.53269 7.92615C5.64808 6.58 6.72154 5.71885 7.72 5.56154C8.76615 5.39654 9.72885 5.81308 10.1392 6.31L10.2873 6.48923L10.0435 8.42692C9.99769 8.97846 10.1696 9.33 10.5162 9.39231C10.6081 9.40846 10.8277 9.38731 11.0688 9.20269C11.3273 9.00462 11.6512 8.58731 11.7265 7.72308C11.8169 6.70231 11.5592 5.83115 10.9862 5.20423C10.3904 4.55423 9.48269 4.21038 8.36192 4.21038C6.285 4.21038 4.44615 5.91923 4.26269 8.01808C4.175 9.02577 4.48077 9.96731 5.12423 10.6692C5.75346 11.3562 6.63615 11.7362 7.61115 11.7362C8.34192 11.7362 8.78846 11.6573 9.51423 11.3985C9.64878 11.3505 9.79686 11.358 9.9259 11.4192C10.0549 11.4805 10.1544 11.5905 10.2023 11.725C10.2503 11.8595 10.2428 12.0076 10.1815 12.1367C10.1203 12.2657 10.0103 12.3651 9.87577 12.4131C9.03654 12.7119 8.465 12.8131 7.61115 12.8131C6.33115 12.8131 5.16615 12.3108 4.33038 11.3988C3.48231 10.4715 3.07538 9.23846 3.19 7.92615C3.30192 6.64423 3.89962 5.44038 4.87346 4.53692C5.84731 3.63346 7.08769 3.13346 8.36192 3.13346C9.79269 3.13346 10.9746 3.59808 11.78 4.47692C12.5527 5.31962 12.915 6.50577 12.8008 7.81769Z"
                    fill={isDarkMode ? '#333' : '#FFF'}
                  />
                  <Path
                    d="M7.88886 6.62538C7.31848 6.715 6.67502 7.23461 6.60655 8.02C6.56809 8.44538 6.68348 8.83615 6.91694 9.09192C7.00394 9.18776 7.11039 9.26392 7.22918 9.31532C7.34798 9.36673 7.47637 9.39219 7.60579 9.39C8.38694 9.39 8.94156 8.81538 9.01925 7.92615C9.02161 7.89932 9.02598 7.87271 9.03232 7.84654L9.1554 6.86769C8.77413 6.64239 8.32637 6.55672 7.88886 6.62538Z"
                    fill={isDarkMode ? '#333' : '#FFF'}
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  color={isDarkMode ? '#333' : '#FFF'}
                  fontWeight={800}
                  marginLeft={2}>
                  البريد الالكتروني
                </Text>
              </Box>
              <TouchableOpacity
                onPress={() => Linking.openURL('mailto:contact@naznuts.com')}>
                <Text color={isDarkMode ? '#333' : '#FFF'} textAlign={'left'}>
                  contact@naznuts.com
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box width="100%" marginTop={6}>
            <Box width="100%">
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    isInvalid={errors.name ? true : false}
                    errorMsg={errors.name?.message}
                    placeholder="الاسم"
                    label="الاسم الكامل*">
                    <Input
                      value={value}
                      p={2}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      width="100%"
                      fontFamily={'Cairo'}
                      fontSize={12}
                      paddingRight="6"
                      type={'text'}
                      bg={isDarkMode ? '#333' : '#FFF'}
                      color={isDarkMode ? '#FFF' : '#000'}
                      borderColor={isDarkMode ? '#333' : 'gray.400'}
                      textAlign="right"
                      placeholder="الرجاء كتابة الاسم"
                    />
                  </TextInput>
                )}
                name="name"
              />
            </Box>
            <Box width="100%" marginTop={4}>
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                  minLength: {value: 8, message: 'مطلوب 8 أحرف على الأقل'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    isInvalid={errors.phone ? true : false}
                    errorMsg={errors.phone?.message}
                    placeholder="054-0540544"
                    label="رقم الهاتف*">
                    <Input
                      value={value}
                      p={2}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      width="100%"
                      fontFamily={'Cairo'}
                      fontSize={12}
                      paddingRight="6"
                      type={'text'}
                      bg={isDarkMode ? '#333' : '#FFF'}
                      color={isDarkMode ? '#FFF' : '#000'}
                      borderColor={isDarkMode ? '#333' : 'gray.400'}
                      textAlign="right"
                      placeholder="054-0540544"
                    />
                  </TextInput>
                )}
                name="phone"
              />
            </Box>
            <Box width="100%" marginTop={4}>
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    isInvalid={errors.email ? true : false}
                    errorMsg={errors.email?.message}
                    placeholder="054-0540544"
                    label="البريد الالكتروني*">
                    <Input
                      value={value}
                      p={2}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      width="100%"
                      fontFamily={'Cairo'}
                      fontSize={12}
                      paddingRight="6"
                      type={'text'}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      autoCompleteType="email"
                      bg={isDarkMode ? '#333' : '#FFF'}
                      color={isDarkMode ? '#FFF' : '#000'}
                      borderColor={isDarkMode ? '#333' : 'gray.400'}
                      textAlign="right"
                      placeholder="dummy@naznuts.com"
                    />
                  </TextInput>
                )}
                name="email"
              />
            </Box>
            <Box marginTop={4}>
              <Text fontFamily={'Cairo'} textAlign={'left'} color="gray.400">
                {' '}
                الرسالة*{' '}
              </Text>
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextArea
                    bg={isDarkMode ? '#333' : '#FFF'}
                    color={isDarkMode ? '#FFF' : '#000'}
                    borderColor={isDarkMode ? '#333' : 'gray.400'}
                    marginTop={1}
                    aria-label="t1"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    numberOfLines={4}
                    fontFamily={'Cairo'}
                    placeholder="اسم/رقم الشارع"
                    isInvalid={errors.message ? true : false}
                    textAlign={'right'}
                    _dark={{
                      placeholderTextColor: 'gray.300',
                    }}
                    autoCompleteType={undefined}
                  />
                )}
                name="message"
              />
              {errors.message && (
                <Text
                  textAlign={'left'}
                  my={1}
                  fontWeight={800}
                  fontFamily={'Cairo'}
                  color="danger.600">
                  {errors.message?.message}
                </Text>
              )}
            </Box>

            <Button
              isLoading={mutation.isLoading}
              marginTop={4}
              onPress={handleSubmit(onSubmit)}
              width="2/4"
              colorScheme="primary"
              bg="primary.500">
              <Text fontFamily={'Cairo'} color={isDarkMode ? '#333' : '#FFF'}>
                ارسال
              </Text>
            </Button>
          </Box>
        </Container>
      </Box>
    </ScrollView>
  );
};

export default Contact;
