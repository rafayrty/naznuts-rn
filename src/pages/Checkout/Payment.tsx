import {
  ScrollView,
  Alert,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React from 'react';
import {Box, Container, Image, Input, Text} from 'native-base';
import BackButton from '../../components/BackButton';
import Header from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Svg, {Path} from 'react-native-svg';
import TextInput from '../../components/TextInput';
import Card from '../../icons/Card';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import cardValidator from 'card-validator';
import {
  cardNumberFormatter,
  cvvFormatter,
  expirationDateFormatter,
} from './formatters';
import Calendar from '../../icons/Calendar';
import {cardholderName} from 'card-validator/dist/cardholder-name';
import {useOrientation} from '../../hooks';

const Payment = () => {
  const orientation = useOrientation();
  const isDarkMode = useColorScheme() === 'dark';
  const {
    setError,
    getValues,
    reset,
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cvv: '',
      cardHolderName: '',
      expiration: '',
      nationalId: '',
      phone: '',
      email: '',
    },
  });
  const cardNumber = watch('cardNumber');
  const cvv = watch('cvv');
  const expiry = watch('expiration');
  const cardHolderName = watch('cardHolderName');

  const navigation = useNavigation();

  const onSubmit = (data: any) => {
    console.log(data);
    Alert.alert('success');
    navigation.navigate('Success');
  };
  return (
    <>
      <ScrollView>
        <Box safeArea paddingBottom={0}>
          <Header />
          <Container mx="auto" width="100%">
            <Box width="100%">
              <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
                <BackButton />
                <Text
                  color={isDarkMode ? '#FFF' : '#333'}
                  marginLeft={0}
                  fontFamily={'Cairo'}
                  fontSize={22}
                  fontWeight={800}>
                  الدفع{' '}
                </Text>
              </Box>
            </Box>

            {/* Credit Card */}
            {orientation === 'PORTRAIT' && (
              <Box
                marginTop={4}
                bg="secondary.500"
                borderRadius="8"
                width="100%">
                <Box paddingTop={3} px={6} paddingBottom={2}>
                  <Text
                    paddingTop={3}
                    fontSize={20}
                    fontFamily={'Cairo'}
                    fontWeight={800}
                    color="white">
                    {cardHolderName}
                  </Text>
                  <Box flexDir={'row'} my={2} justifyContent={'flex-end'}>
                    <Image
                      width={38}
                      height={28}
                      alt="chip"
                      source={require('../../../assets/images/chip.png')}
                    />
                  </Box>
                  <Text
                    paddingTop={1}
                    fontSize={12}
                    fontFamily={'Cairo'}
                    fontWeight={800}
                    color="white">
                    {cardNumber}
                    {/* 0000 0000 0000 0000 */}
                  </Text>

                  <Box
                    flexDir={'row'}
                    width="100%"
                    py={3}
                    justifyContent={'space-between'}>
                    <Text color="gray.400">CVV. {cvv}</Text>
                    <Text fontWeight={500} color="gray.400">
                      Exp: {expiry}
                    </Text>
                  </Box>

                  <Image
                    width="100%"
                    mx="auto"
                    alt="world"
                    position={'absolute'}
                    resizeMode="contain"
                    source={require('../../../assets/images/world.png')}
                  />
                </Box>
              </Box>
            )}
          </Container>
        </Box>

        <Box
          style={{
            borderRadius: 24,
            backgroundColor: isDarkMode ? '#333' : '#fff',
            paddingTop: 32,
            borderWidth: 1,
          }}>
          <Container width="100%" mx="auto" paddingBottom={20}>
            <Box>
              <Text
                textAlign={'left'}
                fontFamily={'Cairo'}
                fontSize={16}
                color={isDarkMode ? '#FFF' : '#000'}
                fontWeight={500}>
                معلومات بطاقة الائتمان
              </Text>

              {/* Payment Form Starts */}
              <Box marginTop={4} marginBottom={6}>
                <Box>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: 'الحقل مطلوب'},
                      validate: {
                        isValid: (value: string) => {
                          return (
                            cardValidator.number(value).isValid ||
                            'This card number looks invalid.'
                          );
                        },
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        label="الايميل"
                        isInvalid={errors.cardNumber ? true : false}
                        errorMsg={errors.cardNumber?.message}>
                        <Input
                          p={2}
                          keyboardType={'number-pad'}
                          fontFamily={'Cairo'}
                          autoCorrect={false}
                          color={isDarkMode ? '#FFF' : '#000'}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={text => {
                            const newValue = cardNumberFormatter
                              ? cardNumberFormatter(value, text)
                              : text;
                            onChange(newValue);
                          }}
                          fontWeight="600"
                          textAlign="right"
                          placeholder={'الرجاء كتابة الايميل'}
                          InputRightElement={
                            <Box marginRight={3}>
                              <Card />
                            </Box>
                          }
                        />
                      </TextInput>
                    )}
                    name="cardNumber"
                  />
                </Box>

                <Box
                  flexDir={'row'}
                  justifyContent={'space-between'}
                  marginTop={3}>
                  <Box width="48%">
                    <Controller
                      control={control}
                      rules={{
                        required: {value: true, message: 'الحقل مطلوب'},
                        maxLength: 4,
                        validate: {
                          isValid: (value: string) => {
                            const cardNum = getValues('cardNumber');
                            const {card} = cardValidator.number(cardNum);
                            const cvvLength =
                              card?.type === 'american-express' ? 4 : 3;
                            return (
                              cardValidator.cvv(value, cvvLength).isValid ||
                              'This security code looks invalid.'
                            );
                          },
                        },
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          label="CVV"
                          isInvalid={errors.cvv ? true : false}
                          errorMsg={errors.cvv?.message}>
                          <Input
                            p={2}
                            color={isDarkMode ? '#FFF' : '#000'}
                            keyboardType={'number-pad'}
                            fontFamily={'Cairo'}
                            autoCorrect={false}
                            autoCompleteType="cc-csc"
                            value={value}
                            maxLength={4}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            fontWeight="600"
                            textAlign="right"
                            placeholder={'CVV'}
                          />
                        </TextInput>
                      )}
                      name="cvv"
                    />
                  </Box>

                  <Box width="48%">
                    <Controller
                      control={control}
                      rules={{
                        required: {value: true, message: 'الحقل مطلوب'},
                        validate: {
                          isValid: (value: string) => {
                            return (
                              cardValidator.expirationDate(value).isValid ||
                              'This expiration date looks invalid.'
                            );
                          },
                        },
                      }}
                      render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                          label="تاريخ انتهاء البطاقة"
                          isInvalid={errors.expiration ? true : false}
                          errorMsg={errors.expiration?.message}>
                          <Input
                            p={2}
                            color={isDarkMode ? '#FFF' : '#000'}
                            keyboardType={'number-pad'}
                            fontFamily={'Cairo'}
                            autoCorrect={false}
                            value={value}
                            onBlur={onBlur}
                            autoCompleteType="cc-exp"
                            onChangeText={text => {
                              const newValue = expirationDateFormatter
                                ? expirationDateFormatter(value, text)
                                : text;
                              onChange(newValue);
                            }}
                            fontWeight="600"
                            textAlign="right"
                            placeholder={'00/00'}
                            InputRightElement={
                              <Box marginRight={3}>
                                <Calendar />
                              </Box>
                            }
                          />
                        </TextInput>
                      )}
                      name="expiration"
                    />
                  </Box>
                </Box>
                <Box marginTop={3}>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: 'الحقل مطلوب'},
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        label="رقم الهوية"
                        isInvalid={errors.nationalId ? true : false}
                        errorMsg={errors.nationalId?.message}>
                        <Input
                          p={2}
                          color={isDarkMode ? '#FFF' : '#000'}
                          keyboardType={'number-pad'}
                          fontFamily={'Cairo'}
                          autoCorrect={false}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          fontWeight="600"
                          textAlign="right"
                          placeholder={'الرجاء كتابة رقم الهوية'}
                        />
                      </TextInput>
                    )}
                    name="nationalId"
                  />
                </Box>

                <Box marginTop={3}>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: 'الحقل مطلوب'},
                      validate: {
                        isValid: (value: string) => {
                          return (
                            cardValidator.cardholderName(value).isValid ||
                            'This card holder name looks invalid.'
                          );
                        },
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        label="إسم صاحب البطاقة"
                        isInvalid={errors.cardHolderName ? true : false}
                        errorMsg={errors.cardHolderName?.message}>
                        <Input
                          p={2}
                          fontFamily={'Cairo'}
                          autoCorrect={false}
                          color={isDarkMode ? '#FFF' : '#000'}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          fontWeight="600"
                          textAlign="right"
                          placeholder={'إسم صاحب البطاقة'}
                        />
                      </TextInput>
                    )}
                    name="cardHolderName"
                  />
                </Box>

                <Box marginTop={3}>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: 'الحقل مطلوب'},
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        label="الايميل"
                        isInvalid={errors.email ? true : false}
                        errorMsg={errors.email?.message}>
                        <Input
                          p={2}
                          fontFamily={'Cairo'}
                          autoCorrect={false}
                          color={isDarkMode ? '#FFF' : '#000'}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          fontWeight="600"
                          textAlign="right"
                          placeholder={'الرجاء كتابة الايميل'}
                        />
                      </TextInput>
                    )}
                    name="email"
                  />
                </Box>

                <Box marginTop={3}>
                  <Controller
                    control={control}
                    rules={{
                      required: {value: true, message: 'الحقل مطلوب'},
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        label="رقم الهاتف"
                        isInvalid={errors.phone ? true : false}
                        errorMsg={errors.phone?.message}>
                        <Input
                          p={2}
                          fontFamily={'Cairo'}
                          autoCorrect={false}
                          value={value}
                          color={isDarkMode ? '#FFF' : '#000'}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          fontWeight="600"
                          textAlign="right"
                          placeholder={'الرجاء كتابة رقم الهاتف'}
                        />
                      </TextInput>
                    )}
                    name="phone"
                  />
                </Box>
              </Box>

              {/* <TouchableOpacity onPress={handleSubmit(onSubmit)}> */}
              <TouchableOpacity onPress={() => navigation.navigate('Success')}>
                <Box
                  bg="secondary.500"
                  borderRadius={8}
                  flexDir={'row-reverse'}
                  alignItems={'center'}
                  px={4}
                  py={3}
                  justifyContent={'space-between'}>
                  <Box
                    flexDir={'row'}
                    width="100%"
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <Text
                      fontWeight={600}
                      fontFamily={'Cairo'}
                      color="white"
                      marginRight={2}>
                      ادفع الآن{' '}
                    </Text>

                    <Svg width="17" height="8" viewBox="0 0 17 8" fill="none">
                      <Path
                        d="M16 4.5C16.2761 4.5 16.5 4.27614 16.5 4C16.5 3.72386 16.2761 3.5 16 3.5L16 4.5ZM0.646445 3.64645C0.451183 3.84171 0.451183 4.15829 0.646445 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.73079 0.976313 4.73079 0.65973 4.53553 0.464468C4.34027 0.269206 4.02369 0.269206 3.82843 0.464468L0.646445 3.64645ZM16 3.5L0.999999 3.5L0.999999 4.5L16 4.5L16 3.5Z"
                        fill="white"
                      />
                    </Svg>
                  </Box>
                </Box>
              </TouchableOpacity>
            </Box>
          </Container>
        </Box>
      </ScrollView>
    </>
  );
};
export default Payment;
