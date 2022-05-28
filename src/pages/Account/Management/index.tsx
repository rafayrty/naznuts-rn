import React, {useState} from 'react';
import {
  AlertDialog,
  Box,
  Button,
  Center,
  Container,
  Input,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import {Modal} from 'native-base';

import Header from '../../../components/Header';
import BackButton from '../../../components/BackButton';
import TextInput from '../../../components/TextInput';
import {useMutation} from 'react-query';
import {Controller, useForm} from 'react-hook-form';
import {useAuthDispatch, useAuthState} from '../../../AuthContext';
import {
  user_delete,
  user_passchange,
  user_update,
} from '../../../api/user_request';
import {DeleteData} from '../../../plugins/storage';
import {useColorScheme} from 'react-native';

type PassProps = {
  showModal: boolean;
  setShowModal: Function;
};

type AlertProps = {
  isOpen: boolean;
  setIsOpen: Function;
};
const DeleteAlert: React.FC<AlertProps> = ({setIsOpen, isOpen}) => {
  const cancelRef = React.useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
  const toast = useToast();
  const dispatch = useAuthDispatch();
  const user = useAuthState();
  const mutation = useMutation(user_delete, {
    onSuccess: _ => {
      setIsOpen(!isOpen);
      toast.show({
        bg: 'danger.500',
        title: 'Account Deleted Successfully',
        placement: 'top',
      });
      DeleteData('cart');
      DeleteData('user');
      dispatch({type: 'LOGOUT'});
    },
  });
  const deleteAcc = (): void => {
    if (user.user !== undefined) {
      mutation.mutate(user.user.id);
    }
  };
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(!isOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />

          <AlertDialog.Header bg={isDarkMode ? '#333' : '#FFF'}>
            <Text
              fontFamily={'Cairo'}
              fontWeight={800}
              fontSize={16}
              color={isDarkMode ? '#FFF' : '#333'}
              textAlign={'left'}>
              حذف حسابك
            </Text>
          </AlertDialog.Header>
          <AlertDialog.Body bg={isDarkMode ? '#333' : '#FFF'}>
            <Text
              fontFamily={'Cairo'}
              color={isDarkMode ? '#FFF' : '#333'}
              textAlign={'left'}>
              سيؤدي هذا إلى إزالة جميع البيانات. هذا العمل لا يمكن أن يكون عكس.
              لا يمكن استعادة البيانات المحذوفة.
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer bg={isDarkMode ? '#333' : '#FFF'}>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={() => setIsOpen(!isOpen)}
                ref={cancelRef}>
                <Text color={isDarkMode ? '#FFF' : '#333'} fontFamily={'Cairo'}>
                  يلغي
                </Text>
              </Button>
              <Button colorScheme="danger" onPress={() => deleteAcc()}>
                <Text fontFamily={'Cairo'} color="white">
                  حذف
                </Text>
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

const ChangePass: React.FC<PassProps> = ({showModal, setShowModal}) => {
  const user = useAuthState();
  const toast = useToast();
  const isDarkMode = useColorScheme() === 'dark';
  const {
    control,
    setError,
    reset,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      new_pass: '',
      confirm_pass: '',
    },
  });

  const mutation = useMutation(user_passchange);
  const onSubmit = (data: any) => {
    if (data.new_pass !== data.confirm_pass) {
      setError('confirm_pass', {
        type: 'validate',
        message: 'Passwords Do Not Match',
      });
    } else {
      mutation.mutate(
        {id: user.user?.id, data: data},
        {
          onSuccess: _ => {
            toast.show({
              bg: 'primary.500',
              title: 'Password Updated Successfully',
              placement: 'top',
            });
            setShowModal(false);
            reset();
          },
        },
      );
    }
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header bg={isDarkMode ? '#333' : '#FFF'}>
            <Text
              color={isDarkMode ? '#FFF' : '#333'}
              textAlign={'left'}
              fontFamily={'Cairo'}>
              تطوير كلمة السر
            </Text>
          </Modal.Header>
          <Modal.Body bg={isDarkMode ? '#333' : '#FFF'}>
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'الحقل مطلوب'},
                minLength: {value: 8, message: 'مطلوب 8 أحرف على الأقل'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  isInvalid={errors.new_pass ? true : false}
                  errorMsg={errors.new_pass?.message}
                  label="كلمة المرور الجديدة">
                  <Input
                    value={value}
                    p={2}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    width="100%"
                    fontFamily={'Cairo'}
                    fontSize={12}
                    paddingRight="6"
                    type={'password'}
                    bg={isDarkMode ? '#333' : '#FFF'}
                    color={isDarkMode ? '#FFF' : '#333'}
                    textAlign="right"
                  />
                </TextInput>
              )}
              name="new_pass"
            />
            <Box marginTop={3}>
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    isInvalid={errors.confirm_pass ? true : false}
                    errorMsg={errors.confirm_pass?.message}
                    label="تأكيد كلمة المرور">
                    <Input
                      value={value}
                      p={2}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      width="100%"
                      fontFamily={'Cairo'}
                      fontSize={12}
                      paddingRight="6"
                      type={'password'}
                      bg={isDarkMode ? '#333' : '#FFF'}
                      color={isDarkMode ? '#FFF' : '#333'}
                      textAlign="right"
                    />
                  </TextInput>
                )}
                name="confirm_pass"
              />
            </Box>
          </Modal.Body>
          <Modal.Footer bg={isDarkMode ? '#333' : '#FFF'}>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                fontFamily={'Cairo'}
                onPress={() => {
                  setShowModal(false);
                }}>
                <Text color={isDarkMode ? '#FFF' : '#000'} fontFamily={'Cairo'}>
                  يلغي
                </Text>
              </Button>
              <Button onPress={handleSubmit(onSubmit)}>
                <Text fontFamily={'Cairo'} color="#FFF">
                  يحفظ
                </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
const Management = () => {
  const toast = useToast();
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: user?.user?.fullname,
      phone: '',
      email: '',
    },
  }); // const myRef = React.useRef({});
  const [showModal, setShowModal] = useState(false);
  React.useEffect(() => {
    setValue('name', user?.user?.fullname ?? '');
    setValue('phone', user?.user?.phone ?? '');
    setValue('email', user?.user?.email ?? '');
  }, [user, setValue]);

  const mutation = useMutation(user_update, {
    onSuccess: (res: any) => {
      toast.show({
        bg: 'primary.500',
        title: 'User Updated Successfully',
        placement: 'top',
      });

      dispatch({type: 'UPDATE_USER', payload: res.data});
    },
    onError: err => {
      console.error(err);
    },
  });
  const onSubmit = (data: any) => {
    mutation.mutate({id: user?.user?.id, data});
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const isDarkMode = useColorScheme() === 'dark';
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
              color={isDarkMode ? '#FFF' : '#000'}
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
                        bg={isDarkMode ? '#333' : '#FFF'}
                        color={isDarkMode ? '#FFF' : '#000'}
                        borderColor={isDarkMode ? '#333' : 'gray.400'}
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
                        bg={isDarkMode ? '#333' : '#FFF'}
                        color={isDarkMode ? '#FFF' : '#000'}
                        borderColor={isDarkMode ? '#333' : 'gray.400'}
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
                      isInvalid={errors.email ? true : false}
                      errorMsg={errors.email?.message}
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
                        bg={isDarkMode ? '#333' : '#FFF'}
                        color={isDarkMode ? '#FFF' : '#000'}
                        borderColor={isDarkMode ? '#333' : 'gray.400'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        autoCompleteType="email"
                        textAlign="right"
                      />
                    </TextInput>
                  )}
                  name="email"
                />
              </Box>
              <Button
                onPress={handleSubmit(onSubmit)}
                color="primary"
                bg="primary.500"
                px={6}
                marginTop={4}>
                <Text
                  fontFamily={'Cairo'}
                  fontWeight={600}
                  color={isDarkMode ? '#333' : '#FFF'}>
                  حفظ
                </Text>
              </Button>
            </Box>
          </Box>
        </Container>
        <Box marginTop={6} paddingTop={1} width="100%">
          <Container width="100%" mx="auto">
            <Text
              color={isDarkMode ? '#FFF' : '#000'}
              fontFamily={'Cairo'}
              fontSize={22}
              textAlign={'left'}
              marginTop={3}>
              ادارة الحساب والأمان
            </Text>
          </Container>
          <Box
            width="100%"
            marginTop={4}
            py={4}
            bg={isDarkMode ? '#333' : '#FFF'}>
            <Container width="100%" mx="auto">
              <Text
                color={isDarkMode ? '#FFF' : '#333'}
                fontFamily={'Cairo'}
                textAlign={'left'}>
                كلمة المرور
              </Text>

              <Button
                marginTop={2}
                colorScheme={'secondary'}
                width="2/5"
                onPress={() => setShowModal(true)}
                bg="secondary.500">
                <Text fontFamily={'Cairo'} color="white">
                  تغيير كلمة المرور
                </Text>
              </Button>
            </Container>
          </Box>

          <Box
            width="100%"
            marginTop={4}
            py={4}
            bg={isDarkMode ? '#333' : '#FFF'}>
            <Container width="100%" mx="auto">
              <Text
                color={isDarkMode ? '#FFF' : '#000'}
                fontFamily={'Cairo'}
                textAlign={'left'}>
                تعطيل الحساب{' '}
              </Text>

              <Button
                marginTop={2}
                colorScheme={'danger'}
                width="2/5"
                onPress={() => setIsOpen(true)}
                bg="danger.500">
                <Text fontFamily={'Cairo'} color={isDarkMode ? '#333' : '#FFF'}>
                  تعطيل حسابك
                </Text>
              </Button>
            </Container>
          </Box>
        </Box>
      </Box>
      <DeleteAlert isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChangePass setShowModal={setShowModal} showModal={showModal} />
    </ScrollView>
  );
};

export default Management;
