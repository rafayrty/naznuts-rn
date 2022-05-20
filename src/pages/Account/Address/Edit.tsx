import React from 'react';
import {
  Box,
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
import {cities_request, address_update} from '../../../api/address_request';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

const Edit = ({route}: any) => {
  const toast = useToast();
  const {data: address} = route.params;
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: address.attributes.name,
      phone: address.attributes.phone,
      address_text: address.attributes.address_text,
      note: address.attributes.note,
      type: address.attributes.type,
      city: address.attributes.city.data.id,
    },
  });

  const {data: cities} = useQuery('cities', cities_request);
  const mutation = useMutation(address_update, {
    onSuccess: _ => {
      // reset();
      navigation.goBack();
      toast.show({
        bg: 'primary.500',
        title: 'Address Updated Successfully',
        placement: 'top',
      });
    },
    onError: err => {
      console.log(err);
    },
  });
  const onSubmit = (data: any) => {
    mutation.mutate({id: address.id, data});
  };

  return (
    <ScrollView>
      <Box safeArea flex="1" paddingBottom={5}>
        <Header />
        <Container mx="auto" width="100%">
          <Box marginTop={4} flexDir={'row'} alignItems={'center'}>
            <BackButton />
            <Text
              marginLeft={3}
              fontFamily={'Cairo'}
              fontSize={22}
              fontWeight={800}>
              إضافة عنوان جديد
            </Text>
          </Box>
          <Box width="100%">
            <Svg
              style={{width: '100%'}}
              height="176"
              viewBox="0 0 380 176"
              fill="none">
              <Path
                d="M250.037 160.132C256.687 160.132 262.077 149.133 262.077 135.566C262.077 121.999 256.687 111 250.037 111C243.388 111 237.998 121.999 237.998 135.566C237.998 149.133 243.388 160.132 250.037 160.132Z"
                fill="#3F636E"
              />
              <Path
                d="M248.925 175.777C253.748 146.845 248.974 118.019 248.925 117.731L247.987 117.89C248.036 118.176 252.782 146.851 247.987 175.621L248.925 175.777Z"
                fill="#CACACA"
              />
              <Path
                d="M239.437 130.284L238.989 131.123L249.876 136.946L250.325 136.107L239.437 130.284Z"
                fill="#CACACA"
              />
              <Path
                d="M261.366 133.201L250.48 139.027L250.929 139.866L261.815 134.04L261.366 133.201Z"
                fill="#CACACA"
              />
              <Path
                d="M278.965 144.735C291.97 144.735 302.513 123.223 302.513 96.6868C302.513 70.1506 291.97 48.6387 278.965 48.6387C265.96 48.6387 255.417 70.1506 255.417 96.6868C255.417 123.223 265.96 144.735 278.965 144.735Z"
                fill="#E6E6E6"
              />
              <Path
                d="M276.342 175.259C285.761 118.747 276.437 62.4415 276.342 61.8794L275.404 62.0383C275.499 62.599 284.795 118.754 275.404 175.103L276.342 175.259Z"
                fill="#CACACA"
              />
              <Path
                d="M258.018 86.7557L257.57 87.5947L278.864 98.9849L279.313 98.1458L258.018 86.7557Z"
                fill="#CACACA"
              />
              <Path
                d="M301.338 92.4614L280.046 103.857L280.495 104.696L301.787 93.3003L301.338 92.4614Z"
                fill="#CACACA"
              />
              <Path
                d="M224.274 175.41H99.0191C98.5584 175.41 98.1168 175.227 97.791 174.901C97.4653 174.575 97.282 174.133 97.2815 173.673V94.5262C97.282 94.0655 97.4652 93.6238 97.791 93.2981C98.1167 92.9723 98.5584 92.7891 99.0191 92.7886H224.274C224.735 92.7891 225.177 92.9724 225.502 93.2981C225.828 93.6238 226.011 94.0655 226.012 94.5262V173.673C226.011 174.133 225.828 174.575 225.502 174.901C225.177 175.227 224.735 175.41 224.274 175.41Z"
                fill="#E4E4E4"
              />
              <Path
                d="M110.538 102.379C110.341 102.38 110.151 102.458 110.012 102.598C109.872 102.737 109.794 102.927 109.793 103.124V165.075C109.794 165.272 109.872 165.461 110.012 165.601C110.151 165.741 110.341 165.819 110.538 165.819H212.756C212.953 165.819 213.142 165.741 213.282 165.601C213.421 165.461 213.5 165.272 213.5 165.075V103.124C213.5 102.927 213.421 102.737 213.282 102.598C213.142 102.458 212.953 102.38 212.756 102.379H110.538Z"
                fill="white"
              />
              <Path
                d="M213.748 118.336V114.41H199.293V102.131H195.367V114.41H169.632V102.131H165.707V114.41H126.013V102.131H122.088V114.41H108.362V118.336H122.088V133.602H108.362V137.528H122.088V153.885H108.362V157.811H143.243V166.068H147.169V157.811H165.707V166.068H169.632V157.811H213.748V153.885H169.632V137.528H213.748V133.602H199.293V118.336H213.748ZM165.707 118.336V123.134H126.013V118.336H165.707ZM126.013 127.059H165.707V133.602H126.013V127.059ZM126.013 153.885V137.528H143.243V153.885H126.013ZM165.707 153.885H147.169V137.528H165.707V153.885ZM195.367 133.602H169.632V118.336H195.367V133.602Z"
                fill="#E6E6E6"
              />
              <Path
                d="M167.669 141.078C170.44 141.078 172.685 138.832 172.685 136.062C172.685 133.291 170.44 131.045 167.669 131.045C164.899 131.045 162.653 133.291 162.653 136.062C162.653 138.832 164.899 141.078 167.669 141.078Z"
                fill="#79C143"
              />
              <Path
                d="M302.959 175.835H76.9434V175.293H303.057L302.959 175.835Z"
                fill="#CACACA"
              />
              <Path
                d="M168.271 106.263C185.36 106.263 199.214 92.4093 199.214 75.32C199.214 58.2306 185.36 44.377 168.271 44.377C151.181 44.377 137.328 58.2306 137.328 75.32C137.328 92.4093 151.181 106.263 168.271 106.263Z"
                fill="#79C143"
              />
              <Path
                d="M168.573 125.621L158.797 108.922L149.022 92.2226L168.372 92.1062L187.722 91.9897L178.147 108.805L168.573 125.621Z"
                fill="#79C143"
              />
              <Path
                d="M168.519 86.2272C174.65 86.2272 179.621 81.2567 179.621 75.1253C179.621 68.9939 174.65 64.0234 168.519 64.0234C162.387 64.0234 157.417 68.9939 157.417 75.1253C157.417 81.2567 162.387 86.2272 168.519 86.2272Z"
                fill="white"
              />
              <Path
                d="M167.555 0.993957C167.555 0.993957 160.934 -0.87116 158.975 8.17464C157.017 17.2204 158.261 16.0807 158.261 16.0807L173.042 14.3555C173.042 14.3555 177.487 3.74499 167.555 0.993957Z"
                fill="#2F2E41"
              />
              <Path
                d="M157.926 40.6782C157.926 40.6782 147.937 41.1406 149.667 45.0616C149.789 45.3388 149.903 45.5985 150.008 45.8407C151.245 48.6807 152.668 51.4357 154.269 54.0876L160.408 64.2599L162.642 63.0188L156.355 46.6762L162.006 46.2149L157.926 40.6782Z"
                fill="#FFB6B6"
              />
              <Path
                d="M184.264 44.8309L187.493 51.8657C187.493 51.8657 189.914 54.2874 192.567 63.9746C195.219 73.6618 195.796 73.3158 195.796 73.3158L193.174 74.189L182.418 54.6334L177.114 47.9447L178.728 44.3696L184.264 44.8309Z"
                fill="#FFB6B6"
              />
              <Path
                d="M180.343 36.7583L184.983 45.3945C184.983 45.3945 195.503 66.0662 194.415 65.9975C193.193 65.9203 189.76 67.345 188.706 68.728C188.197 69.3956 180.763 53.0896 178.151 49.4439L172.501 45.0616C172.501 45.0616 156.456 47.762 156.436 46.8839C156.427 46.4538 161.748 56.7739 160.656 56.3166C159.412 55.7957 156.485 58.3307 155.195 57.806C154.663 57.5895 150.901 48.4697 149.379 44.7327C149.188 44.2662 149.178 43.7452 149.351 43.2718C149.524 42.7984 149.868 42.4066 150.315 42.1733C151.459 41.5782 167.358 37.9477 167.358 37.9477L167.08 36.5277L168.234 34.2212L180.343 36.7583Z"
                fill="#2F2E41"
              />
              <Path
                d="M170.828 11.2996C171.226 8.84775 169.561 6.53755 167.109 6.13967C164.657 5.74178 162.347 7.40689 161.949 9.85879C161.551 12.3107 163.216 14.6209 165.668 15.0188C168.12 15.4166 170.43 13.7515 170.828 11.2996Z"
                fill="#FFB6B6"
              />
              <Path
                d="M180.763 37.4514C181.011 38.1965 179.403 38.6244 177.161 38.2058C175.221 37.8437 173.098 37.4135 171.423 37.0652C169.63 36.6916 168.349 36.4125 168.349 36.4125C168.349 36.4125 167.888 39.2956 166.388 38.9496C165.097 38.6521 161.237 25.1696 160.193 21.4435C160.117 21.1714 160.132 20.8819 160.235 20.619C160.339 20.356 160.525 20.1341 160.766 19.987L166.068 16.7498C166.068 16.7498 169.721 15.4951 171.053 15.4594C172.385 15.4236 174.692 15.0776 174.692 15.0776C174.692 15.0776 177.344 15.3083 177.805 17.2688C178.267 19.2293 180.192 30.8533 180.227 33.6447C180.266 36.7067 180.018 35.2174 180.763 37.4514Z"
                fill="#CACACA"
              />
              <Path
                d="M168.07 4.80225C168.07 4.80225 166.205 9.7448 161.635 11.7964L160.889 7.4134L168.07 4.80225Z"
                fill="#2F2E41"
              />
              <Path
                d="M170.771 10.061C171.121 10.061 171.405 9.51882 171.405 8.85006C171.405 8.1813 171.121 7.63916 170.771 7.63916C170.42 7.63916 170.136 8.1813 170.136 8.85006C170.136 9.51882 170.42 10.061 170.771 10.061Z"
                fill="#FFB6B6"
              />
              <Path
                d="M164.501 65.4131L155.585 69.512L155.533 69.3992C155.11 68.4788 155.07 67.4281 155.422 66.4782C155.773 65.5282 156.488 64.7568 157.408 64.3336L157.408 64.3335L162.854 61.8301L164.501 65.4131Z"
                fill="#2F2E41"
              />
              <Path
                d="M191.845 73.6021L197.314 71.1505L197.314 71.1504C198.238 70.7362 199.289 70.7061 200.236 71.0667C201.183 71.4273 201.947 72.1492 202.362 73.0735L202.412 73.1867L193.458 77.2006L191.845 73.6021Z"
                fill="#2F2E41"
              />
              <Path
                opacity="0.2"
                d="M177.039 26.7773L175.995 38.2606L177.851 38.3483L177.039 26.7773Z"
                fill="black"
              />
              <Path
                d="M169.761 48.2295C169.983 47.9826 170.147 47.6901 170.243 47.3728C170.339 47.0555 170.364 46.7209 170.317 46.3928C170.27 46.0646 170.151 45.7509 169.969 45.4736C169.787 45.1962 169.547 44.9622 169.265 44.7878L165.254 24.5259L160.648 26.2881L166.039 45.6507C165.778 46.1438 165.706 46.7158 165.838 47.2581C165.97 47.8005 166.296 48.2756 166.755 48.5935C167.214 48.9114 167.773 49.0499 168.327 48.9828C168.881 48.9157 169.392 48.6477 169.761 48.2295Z"
                fill="#FFB6B6"
              />
              <Path
                d="M166.269 27.9407L161.211 28.8316C161.067 28.8569 160.92 28.8509 160.778 28.8141C160.637 28.7772 160.505 28.7103 160.392 28.6179C160.279 28.5255 160.187 28.4098 160.122 28.2786C160.058 28.1475 160.022 28.004 160.018 27.8579L159.879 22.7398C159.753 22.0027 159.925 21.2459 160.357 20.6354C160.788 20.0248 161.444 19.6103 162.181 19.4828C162.918 19.3553 163.675 19.5251 164.287 19.9551C164.898 20.385 165.314 21.04 165.444 21.7764L167.057 26.6181C167.103 26.7568 167.119 26.9037 167.103 27.049C167.088 27.1943 167.041 27.3344 166.966 27.46C166.891 27.5855 166.79 27.6934 166.67 27.7763C166.55 27.8593 166.413 27.9154 166.269 27.9407H166.269Z"
                fill="#CACACA"
              />
              <Path
                d="M173.639 47.8734C173.928 47.7104 174.178 47.4861 174.37 47.2163C174.563 46.9465 174.694 46.6377 174.754 46.3117C174.815 45.9857 174.803 45.6504 174.72 45.3295C174.637 45.0086 174.484 44.7098 174.273 44.4542L176.971 23.9761L172.043 24.1682L170.94 44.2371C170.535 44.6203 170.283 45.1391 170.234 45.6951C170.185 46.2511 170.342 46.8058 170.675 47.254C171.007 47.7022 171.493 48.0128 172.039 48.127C172.586 48.2411 173.155 48.1509 173.639 47.8734Z"
                fill="#FFB6B6"
              />
              <Path
                d="M176.837 27.5357L171.761 26.7576C171.616 26.7355 171.478 26.6825 171.356 26.6022C171.234 26.522 171.131 26.4163 171.053 26.2925C170.976 26.1687 170.926 26.0296 170.907 25.8847C170.888 25.7398 170.9 25.5926 170.943 25.4529L172.452 20.5603C172.569 19.8219 172.975 19.1602 173.579 18.7203C174.184 18.2803 174.938 18.0981 175.677 18.2136C176.416 18.329 177.078 18.7327 177.52 19.336C177.962 19.9394 178.146 20.6933 178.032 21.4323L178.008 26.5357C178.007 26.6818 177.975 26.8261 177.913 26.9586C177.852 27.0912 177.763 27.2089 177.651 27.3038C177.54 27.3987 177.41 27.4685 177.27 27.5085C177.129 27.5485 176.981 27.5578 176.837 27.5357Z"
                fill="#CACACA"
              />
            </Svg>
          </Box>
          <Box marginTop={4}>
            <Text fontFamily={'Cairo'} textAlign={'left'} marginTop={3}>
              تفاصيل المستلم
            </Text>
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
                      placeholder="الرجاء كتابة الاسم"
                      label="أسم المستلم">
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
                        placeholder="الرجاء كتابة الاسم"
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
                      placeholder="الرجاء كتابة الاسم"
                      label="رقم هاتف المستلم">
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
                        placeholder="الرجاء كتابة رقم الهاتف"
                      />
                    </TextInput>
                  )}
                  name="phone"
                />
              </Box>
            </Box>
          </Box>
          <Box
            marginTop={5}
            paddingTop={1}
            width="100%"
            borderTopColor={'gray.300'}
            borderBottomColor={'gray.300'}
            borderBottomWidth={1}
            borderTopWidth={1}>
            <Text fontFamily={'Cairo'} textAlign={'left'} marginTop={3}>
              تفاصيل العنوان
            </Text>
            <Text
              fontFamily={'Cairo'}
              textAlign={'left'}
              color="gray.400"
              marginTop={3}>
              نوع العنوان
            </Text>

            <Box marginTop={1}>
              <Controller
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                }}
                control={control}
                render={({field: {onChange, value}}) => (
                  <Radio.Group
                    name="exampleGroup"
                    colorScheme="success"
                    onChange={onChange}
                    value={value}
                    accessibilityLabel="pick an option">
                    <Radio colorScheme="success" value="Home" my={1}>
                      <Svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none">
                        <Path
                          d="M14.2174 8.92578L14.2368 13.6162C14.2368 13.6982 14.2313 13.7744 14.223 13.8535V14.3281C14.223 14.9756 13.7257 15.5 13.1118 15.5H12.6674C12.6368 15.5 12.6063 15.4736 12.5757 15.4971C12.5368 15.4736 12.498 15.5 12.4591 15.5H10.8896C10.2757 15.5 9.77851 14.9756 9.77851 14.3281V11.75C9.77851 11.2314 9.38129 10.8125 8.88962 10.8125H7.11184C6.62018 10.8125 6.22295 11.2314 6.22295 11.75V14.3281C6.22295 14.9756 5.72573 15.5 5.11184 15.5H3.55907C3.5174 15.5 3.47573 15.4971 3.43407 15.4941C3.40073 15.4971 3.3674 15.5 3.33407 15.5H2.88962C2.27601 15.5 1.77851 14.9756 1.77851 14.3281V11.0469C1.77851 11.0205 1.77934 10.9912 1.78101 10.9648V8.92578H0.89101C0.390177 8.92578 0.000732422 8.5127 0.000732422 7.98535C0.000732422 7.72168 0.0841769 7.4873 0.278788 7.28223L7.40073 0.734844C7.59518 0.529355 7.8174 0.5 8.01184 0.5C8.20629 0.5 8.42851 0.558711 8.59795 0.705488L11.5563 3.4502V2.375C11.5563 1.85732 11.9535 1.4375 12.4452 1.4375H13.3341C13.8257 1.4375 14.223 1.85732 14.223 2.375V5.91992L15.6896 7.28223C15.9118 7.4873 16.0257 7.72168 15.9952 7.98535C15.9952 8.5127 15.5785 8.92578 15.1063 8.92578H14.2174V8.92578Z"
                          fill="#000"
                        />
                      </Svg>
                      <Text fontFamily={'Cairo'}>البيت</Text>
                    </Radio>

                    <Radio colorScheme="success" value="Office" my={1}>
                      <Svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none">
                        <Path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.00073 2C1.00073 1.46957 1.21145 0.960859 1.58652 0.585786C1.96159 0.210714 2.4703 0 3.00073 0H11.0007C11.5312 0 12.0399 0.210714 12.4149 0.585786C12.79 0.960859 13.0007 1.46957 13.0007 2V14C13.2659 14 13.5203 14.1054 13.7078 14.2929C13.8954 14.4804 14.0007 14.7348 14.0007 15C14.0007 15.2652 13.8954 15.5196 13.7078 15.7071C13.5203 15.8946 13.2659 16 13.0007 16H10.0007C9.73552 16 9.48116 15.8946 9.29363 15.7071C9.10609 15.5196 9.00073 15.2652 9.00073 15V13C9.00073 12.7348 8.89538 12.4804 8.70784 12.2929C8.5203 12.1054 8.26595 12 8.00073 12H6.00073C5.73552 12 5.48116 12.1054 5.29363 12.2929C5.10609 12.4804 5.00073 12.7348 5.00073 13V15C5.00073 15.2652 4.89538 15.5196 4.70784 15.7071C4.5203 15.8946 4.26595 16 4.00073 16H1.00073C0.735516 16 0.481162 15.8946 0.293626 15.7071C0.106089 15.5196 0.000732422 15.2652 0.000732422 15C0.000732422 14.7348 0.106089 14.4804 0.293626 14.2929C0.481162 14.1054 0.735516 14 1.00073 14V2ZM4.00073 3H6.00073V5H4.00073V3ZM6.00073 7H4.00073V9H6.00073V7ZM8.00073 3H10.0007V5H8.00073V3ZM10.0007 7H8.00073V9H10.0007V7Z"
                          fill="#272727"
                        />
                      </Svg>

                      <Text fontFamily={'Cairo'}>المكتب</Text>
                    </Radio>

                    <Radio colorScheme="success" value="Other" my={1}>
                      <Svg
                        width="13"
                        height="16"
                        viewBox="0 0 13 16"
                        fill="none">
                        <Path
                          d="M6.13528 15.6405C4.47384 13.629 0.778564 8.7539 0.778564 6.01557C0.778564 2.69322 3.51453 0 6.88962 0C10.2634 0 13.0007 2.69322 13.0007 6.01557C13.0007 8.7539 9.27675 13.629 7.64395 15.6405C7.25246 16.1198 6.52677 16.1198 6.13528 15.6405ZM6.88962 8.02076C8.01316 8.02076 8.92663 7.12155 8.92663 6.01557C8.92663 4.90958 8.01316 4.01038 6.88962 4.01038C5.76607 4.01038 4.8526 4.90958 4.8526 6.01557C4.8526 7.12155 5.76607 8.02076 6.88962 8.02076Z"
                          fill="#272727"
                        />
                      </Svg>

                      <Text fontFamily={'Cairo'}>موقع آخر</Text>
                    </Radio>
                  </Radio.Group>
                )}
                name="type"
              />
              {errors.type && (
                <Text
                  textAlign={'left'}
                  my={1}
                  fontWeight={800}
                  fontFamily={'Cairo'}
                  color="danger.600">
                  {errors.type?.message}
                </Text>
              )}
            </Box>

            <Box width="100%">
              <FormControl isRequired isInvalid={errors.name ? true : false}>
                <Controller
                  rules={{
                    required: {value: true, message: 'الحقل مطلوب'},
                  }}
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Select
                      bg="white"
                      minWidth="200"
                      accessibilityLabel="الناصرة"
                      placeholder="الناصرة"
                      fontFamily={'Cairo'}
                      textAlign={'right'}
                      selectedValue={value}
                      onValueChange={onChange}
                      placeholderTextColor={'gray.600'}
                      _selectedItem={{
                        bg: 'primary.500',
                        color: 'white',
                        endIcon: <CheckIcon size={5} color="white" />,
                      }}
                      mt="1">
                      {cities?.data.data.map((item: any) => {
                        return (
                          <Select.Item
                            label={item.attributes.name}
                            value={item.id}
                          />
                        );
                      })}
                    </Select>
                  )}
                  name="city"
                />

                <FormControl.ErrorMessage>
                  <Text fontFamily={'Cairo'} fontWeight={'800'}>
                    {errors.name?.message}
                  </Text>
                </FormControl.ErrorMessage>
              </FormControl>
            </Box>

            <Box marginTop={5} mb="5">
              <Text fontFamily={'Cairo'} color="gray.400" textAlign={'left'}>
                اسم/رقم الشارع*
              </Text>
              <Controller
                control={control}
                rules={{
                  required: {value: true, message: 'الحقل مطلوب'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextArea
                    bg="white"
                    marginTop={1}
                    aria-label="t1"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    numberOfLines={4}
                    fontFamily={'Cairo'}
                    placeholder="اسم/رقم الشارع"
                    isInvalid={errors.address_text ? true : false}
                    textAlign={'right'}
                    _dark={{
                      placeholderTextColor: 'gray.300',
                    }}
                    autoCompleteType={undefined}
                  />
                )}
                name="address_text"
              />
              {errors.address_text && (
                <Text
                  textAlign={'left'}
                  my={1}
                  fontWeight={800}
                  fontFamily={'Cairo'}
                  color="danger.600">
                  {errors.address_text?.message}
                </Text>
              )}
            </Box>
          </Box>
          <Box width="100%" marginTop={4}>
            <Box>
              <Text textAlign={'left'} color="gray.400" fontFamily={'Cairo'}>
                تفاصيل اخرى
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextArea
                    bg="white"
                    marginTop={1}
                    aria-label="t2"
                    numberOfLines={2}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    fontFamily={'Cairo'}
                    placeholder="مثال بجانب بناية المشبير "
                    isInvalid={false}
                    textAlign={'right'}
                    _dark={{
                      placeholderTextColor: 'gray.300',
                    }}
                    mb="5"
                    autoCompleteType={undefined}
                  />
                )}
                name="note"
              />
            </Box>
            <Box marginTop="3" width="80%" mx="auto">
              <Pressable onPress={handleSubmit(onSubmit)}>
                {({isPressed}) => {
                  return (
                    <Box
                      py="3"
                      borderRadius={6}
                      flexDirection="row"
                      justifyContent={'center'}
                      alignItems={'center'}
                      bg={isPressed ? 'secondary.700' : 'secondary.500'}
                      p="5"
                      rounded="8"
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.96 : 1,
                          },
                        ],
                      }}>
                      <Text color="#FFF" marginRight={2} fontFamily={'Cairo'}>
                        إضافة
                      </Text>
                      <Svg width="17" height="8" viewBox="0 0 17 8" fill="none">
                        <Path
                          d="M16 4.5C16.2761 4.5 16.5 4.27614 16.5 4C16.5 3.72386 16.2761 3.5 16 3.5L16 4.5ZM0.646446 3.64645C0.451183 3.84171 0.451184 4.15829 0.646446 4.35356L3.82843 7.53554C4.02369 7.7308 4.34027 7.7308 4.53553 7.53554C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.73079 0.976313 4.73079 0.65973 4.53553 0.464468C4.34027 0.269206 4.02369 0.269206 3.82843 0.464468L0.646446 3.64645ZM16 3.5L0.999999 3.5L0.999999 4.5L16 4.5L16 3.5Z"
                          fill="white"
                        />
                      </Svg>
                    </Box>
                  );
                }}
              </Pressable>
            </Box>
          </Box>
        </Container>
      </Box>
    </ScrollView>
  );
};

export default Edit;
