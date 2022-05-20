import React from 'react';
import {
  Box,
  Button,
  CheckIcon,
  Container,
  FormControl,
  Input,
  Pressable,
  Radio,
  ScrollView,
  Select,
  Text,
  TextArea,
  useToast,
} from 'native-base';
import Header from '../../../components/Header';
import BackButton from '../../../components/BackButton';
import Svg, {Path} from 'react-native-svg';
import TextInput from '../../../components/TextInput';
import {useMutation, useQuery} from 'react-query';
import {cities_request, address_add} from '../../../api/address_request';
import {Controller, useForm} from 'react-hook-form';

const Management = () => {
  const toast = useToast();

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address_text: '',
      note: '',
      type: '',
      city: '',
    },
  }); // const myRef = React.useRef({});

  const {data: cities} = useQuery('cities', cities_request);
  const mutation = useMutation(address_add, {
    onSuccess: _ => {
      reset();
      toast.show({
        bg: 'primary.500',
        title: 'Address Created Successfully',
        placement: 'top',
      });
    },
    onError: err => {
      console.log(err);
    },
  });
  const onSubmit = (data: any) => {
    mutation.mutate(data);
    console.log({data: data});
  };

  return (
    <ScrollView>
      <Box safeArea flex="1" paddingBottom={5}>
        <Header />
        <Container mx="auto" width="100%">
          <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
            <BackButton />
            <Text
              marginLeft={1}
              fontFamily={'Cairo'}
              fontSize={22}
              fontWeight={800}>
              الملف الشخصي
            </Text>
          </Box>

          <Box marginTop={4}>
            <Box
              marginTop={'3'}
              flexDir={'row'}
              justifyContent={'space-between'}
              flexWrap={'wrap'}>
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
                      label="اسم المستخدم">
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
                        bg="#FFF"
                        textAlign="right"
                      />
                    </TextInput>
                  )}
                  name="name"
                />
              </Box>

              <Box width="100%" marginTop={3}>
                <Controller
                  rules={{
                    required: {value: true, message: 'الحقل مطلوب'},
                    minLength: {value: 8, message: 'مطلوب 8 أحرف على الأقل'},
                  }}
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      isInvalid={errors.phone ? true : false}
                      errorMsg={errors.phone?.message}
                      label="رقم الهاتف">
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
                        bg="#FFF"
                        textAlign="right"
                      />
                    </TextInput>
                  )}
                  name="phone"
                />
              </Box>

              <Box width="100%" marginTop={3}>
                <Controller
                  rules={{
                    required: {value: true, message: 'الحقل مطلوب'},
                  }}
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      isInvalid={errors.phone ? true : false}
                      errorMsg={errors.phone?.message}
                      label="البريد الالكتروني">
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
                        bg="#FFF"
                        textAlign="right"
                      />
                    </TextInput>
                  )}
                  name="phone"
                />
              </Box>
              <Button color="primary" bg="primary.500" px={6} marginTop={4}>
                <Text fontFamily={'Cairo'} fontWeight={600} color="#FFF">
                  حفظ
                </Text>
              </Button>
            </Box>
          </Box>
        </Container>
        <Box marginTop={6} paddingTop={1} width="100%">
          <Container width="100%" mx="auto">
            <Text
              fontFamily={'Cairo'}
              fontSize={22}
              textAlign={'left'}
              marginTop={3}>
              ادارة الحساب والأمان
            </Text>
          </Container>
          <Box width="100%" marginTop={4} py={4} bg="white">
            <Container width="100%" mx="auto">
              <Text fontFamily={'Cairo'} textAlign={'left'}>
                كلمة المرور
              </Text>

              <Button
                marginTop={2}
                colorScheme={'secondary'}
                width="2/5"
                bg="secondary.500">
                <Text fontFamily={'Cairo'} color="white">
                  تغيير كلمة المرور
                </Text>
              </Button>
            </Container>
          </Box>

          <Box width="100%" marginTop={4} py={4} bg="white">
            <Container width="100%" mx="auto">
              <Text fontFamily={'Cairo'} textAlign={'left'}>
                تعطيل الحساب{' '}
              </Text>

              <Button
                marginTop={2}
                colorScheme={'danger'}
                width="2/5"
                bg="danger.500">
                <Text fontFamily={'Cairo'} color="white">
                  تعطيل حسابك
                </Text>
              </Button>
            </Container>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Management;
