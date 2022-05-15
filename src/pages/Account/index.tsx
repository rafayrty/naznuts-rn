import {useNavigation} from '@react-navigation/core';
import {Box, Container, Pressable, Text} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import Header from '../../components/Header';

const Account = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <Box safeArea>
        <Header />
        <Container mx="auto" width={'100%'} marginTop={4}>
          <Text fontFamily={'Cairo'} fontSize={16} fontWeight={600}>
            أهلاً بك
          </Text>

          <Text
            color="primary.500"
            fontSize={24}
            fontWeight={800}
            fontFamily={'Cairo'}>
            محمود زعبي
          </Text>

          <Box
            width="100%"
            marginTop={5}
            flexDir={'row'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}>
            <Pressable
              width="46%"
              onPress={() => navigation.navigate('Orders')}>
              {({isPressed}) => {
                return (
                  <Box
                    bg="#FFF"
                    shadow={1}
                    py={6}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Box
                      bg="primary.500"
                      height="60"
                      width="60"
                      borderRadius={100}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Svg width="25" height="24" fill="none">
                        <G clip-path="url(#a)">
                          <Path
                            d="M20.31 16V5a3 3 0 0 1 3-3 1 1 0 1 0 0-2 5.006 5.006 0 0 0-5 5v11.279l-2.733.912a2.999 2.999 0 0 0-.156-1l-1.553-5.1a3.007 3.007 0 0 0-3.77-1.949l-6.7 2.13A3.013 3.013 0 0 0 1.44 15l1.635 5.373c.106.3.26.58.457.831l-2.536.845a1.001 1.001 0 0 0 .632 1.9l14.783-4.926A4.016 4.016 0 0 0 20.285 24c5.258-.136 5.28-7.831.026-8ZM4.974 19.748l-1.62-5.327a1.006 1.006 0 0 1 .658-1.243l6.7-2.13a1 1 0 0 1 1.252.638l1.548 5.106.01.031a1 1 0 0 1-.508 1.221l-6.888 2.3a1 1 0 0 1-1.152-.596ZM20.285 22a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm-9.925-8a1 1 0 0 1-.65 1.256l-2.464.785a1 1 0 1 1-.606-1.907l2.465-.784a1 1 0 0 1 1.255.65Z"
                            fill="#fff"
                          />
                        </G>
                        <Defs>
                          <ClipPath id="a">
                            <Path
                              fill="#fff"
                              transform="translate(.31)"
                              d="M0 0h24v24H0z"
                            />
                          </ClipPath>
                        </Defs>
                      </Svg>
                    </Box>

                    <Text fontFamily={'Cairo'} fontWeight={600} marginTop={2}>
                      طلباتي
                    </Text>
                  </Box>
                );
              }}
            </Pressable>

            <Pressable
              width="46%"
              onPress={() => navigation.navigate('Address')}>
              {({isPressed}) => {
                return (
                  <Box
                    bg="#FFF"
                    shadow={1}
                    py={6}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Box
                      bg="primary.500"
                      height="60"
                      width="60"
                      borderRadius={100}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none">
                        <Path
                          d="M12.3105 12C13.1017 12 13.875 11.7654 14.5328 11.3259C15.1906 10.8864 15.7033 10.2616 16.0061 9.53073C16.3088 8.79983 16.388 7.99556 16.2337 7.21964C16.0793 6.44371 15.6984 5.73098 15.139 5.17157C14.5796 4.61216 13.8668 4.2312 13.0909 4.07686C12.315 3.92252 11.5107 4.00173 10.7798 4.30448C10.0489 4.60723 9.42419 5.11992 8.98466 5.77772C8.54514 6.43552 8.31054 7.20887 8.31054 8C8.31054 9.06087 8.73197 10.0783 9.48211 10.8284C10.2323 11.5786 11.2497 12 12.3105 12ZM12.3105 6C12.7061 6 13.0928 6.1173 13.4217 6.33706C13.7506 6.55682 14.0069 6.86918 14.1583 7.23463C14.3097 7.60009 14.3493 8.00222 14.2721 8.39018C14.1949 8.77814 14.0045 9.13451 13.7248 9.41421C13.4451 9.69392 13.0887 9.8844 12.7007 9.96157C12.3128 10.0387 11.9106 9.99913 11.5452 9.84776C11.1797 9.69638 10.8674 9.44004 10.6476 9.11114C10.4278 8.78224 10.3105 8.39556 10.3105 8C10.3105 7.46957 10.5213 6.96086 10.8963 6.58579C11.2714 6.21071 11.7801 6 12.3105 6ZM20.9705 9.157L20.2515 8.918C20.3809 7.79792 20.2721 6.66315 19.9321 5.58809C19.5922 4.51302 19.0289 3.52196 18.279 2.67989C17.5292 1.83782 16.6099 1.16376 15.5813 0.701913C14.5527 0.240067 13.4381 0.000867481 12.3105 0C11.1683 0.000440969 10.0394 0.245694 8.99996 0.719235C7.9605 1.19278 7.03461 1.8836 6.28466 2.74518C5.53472 3.60675 4.97815 4.61905 4.65245 5.71387C4.32675 6.80869 4.23949 7.96061 4.39654 9.092C3.43958 9.27043 2.55467 9.72192 1.84854 10.392C1.35972 10.8567 0.971111 11.4166 0.70662 12.037C0.442129 12.6575 0.30734 13.3255 0.310542 14V18.075C0.312643 19.1563 0.664333 20.208 1.31313 21.0731C1.96193 21.9381 2.87305 22.5702 3.91054 22.875L6.78054 23.775C7.2626 23.925 7.76467 24.0009 8.26954 24C8.72753 23.9994 9.18334 23.9368 9.62454 23.814L15.4045 22.104C15.9195 21.9635 16.4626 21.9635 16.9775 22.104L19.3645 22.904C19.9528 23.0472 20.566 23.055 21.1577 22.9267C21.7494 22.7985 22.3044 22.5376 22.7806 22.1637C23.2568 21.7898 23.642 21.3127 23.907 20.7683C24.172 20.2239 24.31 19.6265 24.3105 19.021V13.872C24.3083 12.8374 23.9861 11.8288 23.3881 10.9845C22.7902 10.1402 21.9457 9.50155 20.9705 9.156V9.157ZM8.06854 3.762C8.6248 3.20349 9.28587 2.76032 10.0138 2.45793C10.7418 2.15554 11.5223 1.99988 12.3105 1.99988C13.0988 1.99988 13.8793 2.15554 14.6073 2.45793C15.3352 2.76032 15.9963 3.20349 16.5525 3.762C17.6747 4.89114 18.3055 6.41782 18.3075 8.00974C18.3096 9.60166 17.6828 11.13 16.5635 12.262L13.0105 15.717C12.8251 15.8988 12.5757 16.0007 12.316 16.0007C12.0563 16.0007 11.807 15.8988 11.6215 15.717L8.06854 12.277C6.94401 11.1454 6.31285 9.61484 6.31285 8.0195C6.31285 6.42416 6.94401 4.89361 8.06854 3.762ZM22.3105 19.021C22.3112 19.3239 22.2427 19.6229 22.1103 19.8953C21.9779 20.1677 21.7851 20.4063 21.5465 20.593C21.3212 20.7742 21.0586 20.9035 20.7776 20.9718C20.4966 21.0401 20.2039 21.0456 19.9205 20.988L17.5755 20.2C16.6885 19.9452 15.7485 19.9396 14.8585 20.184L9.07454 21.892C8.51882 22.0453 7.93069 22.0352 7.38054 21.863L4.48654 20.963C3.86019 20.7819 3.3095 20.4025 2.91714 19.8817C2.52478 19.361 2.31193 18.727 2.31054 18.075V14C2.30829 13.5958 2.38875 13.1954 2.54696 12.8234C2.70518 12.4514 2.9378 12.1157 3.23054 11.837C3.6888 11.4003 4.27256 11.1184 4.89954 11.031C5.30265 12.0302 5.90292 12.9379 6.66454 13.7L10.2315 17.153C10.7891 17.6989 11.5383 18.0046 12.3185 18.0046C13.0988 18.0046 13.848 17.6989 14.4055 17.153L17.9685 13.69C18.7663 12.889 19.3843 11.9274 19.7815 10.869L20.3185 11.047C20.9009 11.2557 21.4047 11.639 21.7612 12.1445C22.1177 12.6501 22.3096 13.2534 22.3105 13.872V19.021Z"
                          fill="white"
                        />
                      </Svg>
                    </Box>

                    <Text fontFamily={'Cairo'} fontWeight={600} marginTop={2}>
                      طلباتي
                    </Text>
                  </Box>
                );
              }}
            </Pressable>

            <Pressable
              marginTop={5}
              width="46%"
              onPress={() => navigation.navigate('Favourites')}>
              {({isPressed}) => {
                return (
                  <Box
                    bg="#FFF"
                    shadow={1}
                    py={6}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Box
                      bg="primary.500"
                      height="60"
                      width="60"
                      borderRadius={100}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none">
                        <G clip-path="url(#clip0_221_5755)">
                          <Path
                            d="M24.1465 8.79395C23.9419 8.14285 23.5333 7.57487 22.9809 7.17399C22.4286 6.77311 21.7619 6.56062 21.0795 6.56795H16.7105L15.3835 2.43195C15.1748 1.78091 14.7648 1.21297 14.2125 0.81002C13.6602 0.407071 12.9942 0.189941 12.3105 0.189941C11.6268 0.189941 10.9608 0.407071 10.4085 0.81002C9.85623 1.21297 9.44617 1.78091 9.2375 2.43195L7.9105 6.56795H3.5415C2.86124 6.56892 2.19869 6.78484 1.64848 7.18486C1.09826 7.58488 0.688536 8.14855 0.477817 8.79534C0.267098 9.44214 0.266165 10.139 0.475152 10.7863C0.684139 11.4337 1.09236 11.9985 1.6415 12.4L5.1975 15L3.8455 19.187C3.62701 19.8363 3.62424 20.539 3.8376 21.19C4.05097 21.8411 4.46904 22.4058 5.0295 22.8C5.58035 23.2067 6.24789 23.4247 6.93265 23.4212C7.61741 23.4178 8.28274 23.1932 8.8295 22.781L12.3105 20.219L15.7925 22.778C16.3423 23.1824 17.0063 23.4021 17.6889 23.4054C18.3714 23.4087 19.0375 23.1955 19.5913 22.7965C20.145 22.3974 20.558 21.833 20.7708 21.1844C20.9836 20.5359 20.9852 19.8365 20.7755 19.187L19.4235 15L22.9835 12.4C23.5389 12.0035 23.9519 11.4388 24.1614 10.7893C24.3708 10.1398 24.3656 9.44021 24.1465 8.79395ZM21.8035 10.785L17.6595 13.814C17.4893 13.9381 17.3626 14.1129 17.2976 14.3133C17.2326 14.5137 17.2326 14.7295 17.2975 14.93L18.8725 19.8C18.9522 20.047 18.9515 20.3129 18.8706 20.5595C18.7896 20.8061 18.6325 21.0206 18.4219 21.1723C18.2113 21.324 17.9581 21.405 17.6985 21.4037C17.439 21.4024 17.1865 21.3188 16.9775 21.165L12.9025 18.165C12.7309 18.0389 12.5235 17.9709 12.3105 17.9709C12.0975 17.9709 11.8901 18.0389 11.7185 18.165L7.6435 21.165C7.43458 21.3209 7.18143 21.4062 6.92076 21.4086C6.66009 21.4109 6.40544 21.3302 6.19372 21.1781C5.98201 21.026 5.82424 20.8104 5.74329 20.5626C5.66234 20.3148 5.66241 20.0477 5.7435 19.8L7.3235 14.93C7.38841 14.7295 7.38836 14.5137 7.32336 14.3133C7.25835 14.1129 7.13171 13.9381 6.9615 13.814L2.8175 10.785C2.6088 10.6322 2.45373 10.4173 2.37444 10.1711C2.29514 9.9249 2.29568 9.65993 2.37598 9.41405C2.45628 9.16817 2.61222 8.95396 2.82154 8.80201C3.03085 8.65006 3.28284 8.56814 3.5415 8.56796H8.6415C8.85321 8.56795 9.05946 8.50075 9.23054 8.37603C9.40163 8.25131 9.52871 8.07552 9.5935 7.87396L11.1435 3.04295C11.2231 2.79574 11.379 2.58015 11.5889 2.4272C11.7988 2.27426 12.0518 2.19186 12.3115 2.19186C12.5712 2.19186 12.8242 2.27426 13.0341 2.4272C13.244 2.58015 13.3999 2.79574 13.4795 3.04295L15.0295 7.87396C15.0943 8.07552 15.2214 8.25131 15.3924 8.37603C15.5635 8.50075 15.7698 8.56795 15.9815 8.56796H21.0815C21.3402 8.56814 21.5921 8.65006 21.8015 8.80201C22.0108 8.95396 22.1667 9.16817 22.247 9.41405C22.3273 9.65993 22.3278 9.9249 22.2486 10.1711C22.1693 10.4173 22.0142 10.6322 21.8055 10.785H21.8035Z"
                            fill="white"
                          />
                        </G>
                        <Defs>
                          <ClipPath id="clip0_221_5755">
                            <Rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.310547)"
                            />
                          </ClipPath>
                        </Defs>
                      </Svg>
                    </Box>

                    <Text fontFamily={'Cairo'} fontWeight={600} marginTop={2}>
                      المفضلة
                    </Text>
                  </Box>
                );
              }}
            </Pressable>

            <Pressable
              marginTop={5}
              width="46%"
              onPress={() => navigation.navigate('Favourites')}>
              {({isPressed}) => {
                return (
                  <Box
                    bg="#FFF"
                    shadow={1}
                    py={6}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Box
                      bg="primary.500"
                      height="60"
                      width="60"
                      borderRadius={100}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Svg
                        width="25"
                        height="28"
                        viewBox="0 0 25 28"
                        fill="none">
                        <Path
                          d="M19.0762 12.25C19.5658 12.3958 20.0319 12.5938 20.4746 12.8438C20.9173 13.0938 21.3809 13.474 21.8652 13.9844C22.3496 14.4948 22.7637 15.0964 23.1074 15.7891C23.4512 16.4818 23.7376 17.3776 23.9668 18.4766C24.196 19.5755 24.3105 20.8073 24.3105 22.1719C24.3105 23.776 23.7897 25.1484 22.748 26.2891C21.7064 27.4297 20.4512 28 18.9824 28H5.63867C4.16992 28 2.91471 27.4297 1.87305 26.2891C0.83138 25.1484 0.310547 23.776 0.310547 22.1719C0.310547 20.8073 0.42513 19.5755 0.654297 18.4766C0.883464 17.3776 1.16992 16.4818 1.51367 15.7891C1.85742 15.0964 2.27148 14.4948 2.75586 13.9844C3.24023 13.474 3.70378 13.0938 4.14648 12.8438C4.58919 12.5938 5.05534 12.3958 5.54492 12.25C4.72201 10.9479 4.31055 9.53125 4.31055 8C4.31055 6.91667 4.52148 5.88281 4.94336 4.89844C5.36523 3.91406 5.93555 3.0625 6.6543 2.34375C7.37305 1.625 8.22461 1.05469 9.20898 0.632812C10.1934 0.210938 11.2272 0 12.3105 0C13.3939 0 14.4277 0.210938 15.4121 0.632812C16.3965 1.05469 17.248 1.625 17.9668 2.34375C18.6855 3.0625 19.2559 3.91406 19.6777 4.89844C20.0996 5.88281 20.3105 6.91667 20.3105 8C20.3105 9.53125 19.8991 10.9479 19.0762 12.25ZM12.3105 2C10.6543 2 9.24023 2.58594 8.06836 3.75781C6.89648 4.92969 6.31055 6.34375 6.31055 8C6.31055 9.65625 6.89648 11.0703 8.06836 12.2422C9.24023 13.4141 10.6543 14 12.3105 14C13.9668 14 15.3809 13.4141 16.5527 12.2422C17.7246 11.0703 18.3105 9.65625 18.3105 8C18.3105 6.34375 17.7246 4.92969 16.5527 3.75781C15.3809 2.58594 13.9668 2 12.3105 2ZM18.9824 26C19.8991 26 20.6829 25.6276 21.334 24.8828C21.985 24.138 22.3105 23.2344 22.3105 22.1719C22.3105 19.6823 21.9017 17.7188 21.084 16.2812C20.2663 14.8438 19.0918 14.0885 17.5605 14.0156C16.0501 15.3385 14.3001 16 12.3105 16C10.321 16 8.57096 15.3385 7.06055 14.0156C5.5293 14.0885 4.35482 14.8438 3.53711 16.2812C2.7194 17.7188 2.31055 19.6823 2.31055 22.1719C2.31055 23.2344 2.63607 24.138 3.28711 24.8828C3.93815 25.6276 4.72201 26 5.63867 26H18.9824Z"
                          fill="white"
                        />
                      </Svg>
                    </Box>

                    <Text fontFamily={'Cairo'} fontWeight={600} marginTop={2}>
                      البيانات الشخصية
                    </Text>
                  </Box>
                );
              }}
            </Pressable>
            <Pressable
              marginTop={5}
              width="46%"
              onPress={() => navigation.navigate('Terms')}>
              {({isPressed}) => {
                return (
                  <Box
                    bg="#FFF"
                    shadow={1}
                    py={6}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Box
                      bg="primary.500"
                      height="60"
                      width="60"
                      borderRadius={100}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none">
                        <G clipPath="url(#clip0_221_5757)">
                          <Path
                            d="M17.3105 14C17.3105 14.2652 17.2052 14.5196 17.0177 14.7071C16.8301 14.8947 16.5758 15 16.3105 15H8.31055C8.04533 15 7.79098 14.8947 7.60344 14.7071C7.4159 14.5196 7.31055 14.2652 7.31055 14C7.31055 13.7348 7.4159 13.4805 7.60344 13.2929C7.79098 13.1054 8.04533 13 8.31055 13H16.3105C16.5758 13 16.8301 13.1054 17.0177 13.2929C17.2052 13.4805 17.3105 13.7348 17.3105 14ZM13.3105 17H8.31055C8.04533 17 7.79098 17.1054 7.60344 17.2929C7.4159 17.4805 7.31055 17.7348 7.31055 18C7.31055 18.2652 7.4159 18.5196 7.60344 18.7071C7.79098 18.8947 8.04533 19 8.31055 19H13.3105C13.5758 19 13.8301 18.8947 14.0177 18.7071C14.2052 18.5196 14.3105 18.2652 14.3105 18C14.3105 17.7348 14.2052 17.4805 14.0177 17.2929C13.8301 17.1054 13.5758 17 13.3105 17ZM22.3105 10.485V19C22.309 20.3256 21.7817 21.5965 20.8443 22.5338C19.907 23.4711 18.6361 23.9984 17.3105 24H7.31055C5.98495 23.9984 4.7141 23.4711 3.77677 22.5338C2.83943 21.5965 2.31213 20.3256 2.31055 19V5.00002C2.31213 3.67443 2.83943 2.40358 3.77677 1.46624C4.7141 0.528905 5.98495 0.00161091 7.31055 2.30487e-05H11.8255C12.7452 -0.00234388 13.6561 0.177611 14.5058 0.529482C15.3554 0.881354 16.1269 1.39816 16.7755 2.05002L20.2595 5.53602C20.9118 6.18426 21.4289 6.95548 21.781 7.805C22.133 8.65451 22.313 9.56545 22.3105 10.485ZM15.3615 3.46402C15.0468 3.15918 14.6935 2.89695 14.3105 2.68402V7.00002C14.3105 7.26524 14.4159 7.51959 14.6034 7.70713C14.791 7.89467 15.0453 8.00002 15.3105 8.00002H19.6265C19.4135 7.61721 19.1509 7.26417 18.8455 6.95002L15.3615 3.46402ZM20.3105 10.485C20.3105 10.32 20.2785 10.162 20.2635 10H15.3105C14.5149 10 13.7518 9.68395 13.1892 9.12134C12.6266 8.55873 12.3105 7.79567 12.3105 7.00002V2.04702C12.1485 2.03202 11.9895 2.00002 11.8255 2.00002H7.31055C6.5149 2.00002 5.75184 2.31609 5.18923 2.8787C4.62662 3.44131 4.31055 4.20437 4.31055 5.00002V19C4.31055 19.7957 4.62662 20.5587 5.18923 21.1213C5.75184 21.684 6.5149 22 7.31055 22H17.3105C18.1062 22 18.8693 21.684 19.4319 21.1213C19.9945 20.5587 20.3105 19.7957 20.3105 19V10.485Z"
                            fill="white"
                          />
                        </G>
                        <Defs>
                          <ClipPath id="clip0_221_5757">
                            <Rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.310547)"
                            />
                          </ClipPath>
                        </Defs>
                      </Svg>
                    </Box>

                    <Text marginTop={1} fontFamily={'Cairo'} fontWeight={600}>
                      الشروط و الأحكام
                    </Text>
                  </Box>
                );
              }}
            </Pressable>
            <Pressable
              marginTop={5}
              width="46%"
              onPress={() => navigation.navigate('Contact')}>
              {({isPressed}) => {
                return (
                  <Box
                    bg="#FFF"
                    shadow={1}
                    py={6}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}>
                    <Box
                      bg="primary.500"
                      height="60"
                      width="60"
                      borderRadius={100}
                      justifyContent={'center'}
                      alignItems={'center'}>
                      <Svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none">
                        <G clipPath="url(#clip0_221_5919)">
                          <Path
                            d="M23.3855 16.7621C23.9651 17.3432 24.2905 18.1304 24.2905 18.9511C24.2905 19.7717 23.9651 20.5589 23.3855 21.1401L22.4735 22.1901C14.2825 30.0281 -5.64545 10.1061 2.07355 1.89006L3.22355 0.89006C3.80518 0.326606 4.58527 0.0147993 5.39504 0.022098C6.20482 0.0293966 6.97916 0.355214 7.55055 0.929061C7.58155 0.95906 9.43355 3.36706 9.43355 3.36706C9.98146 3.9456 10.2863 4.71244 10.2852 5.50926C10.2841 6.30608 9.97708 7.07206 9.42755 7.64906L8.26955 9.10506C8.91054 10.6621 9.8528 12.0771 11.0422 13.269C12.2317 14.4608 13.6448 15.4059 15.2005 16.0501L16.6655 14.8851C17.2414 14.3341 18.0073 14.026 18.8043 14.0249C19.6013 14.0238 20.3681 14.3297 20.9455 14.8791C20.9455 14.8791 23.3545 16.7321 23.3855 16.7621ZM22.0105 18.2161C22.0105 18.2161 19.6175 16.3741 19.5865 16.3441C19.3805 16.1398 19.1022 16.0252 18.812 16.0252C18.5219 16.0252 18.2436 16.1398 18.0375 16.3441C18.0105 16.3701 15.9935 17.9781 15.9935 17.9781C15.8576 18.0863 15.6959 18.1572 15.5242 18.1838C15.3525 18.2105 15.1769 18.1919 15.0145 18.1301C12.998 17.3798 11.1663 16.2047 9.64364 14.6845C8.121 13.1643 6.94302 11.3344 6.18955 9.31906C6.12274 9.15452 6.10097 8.97515 6.12645 8.7994C6.15193 8.62365 6.22376 8.45786 6.33455 8.31906C6.33455 8.31906 7.94255 6.30506 7.96955 6.27906C8.17381 6.07305 8.28842 5.79468 8.28842 5.50456C8.28842 5.21444 8.17381 4.93607 7.96955 4.73006C7.93955 4.70006 6.09755 2.30506 6.09755 2.30506C5.88845 2.11757 5.61555 2.01716 5.33479 2.02441C5.05404 2.03166 4.78669 2.14602 4.58755 2.34406L3.43755 3.34406C-2.20445 10.1271 15.0675 26.4411 21.0105 20.8271L21.9225 19.7761C22.1376 19.5787 22.2671 19.3053 22.2835 19.0139C22.2999 18.7226 22.202 18.4363 22.0105 18.2161Z"
                            fill="white"
                          />
                        </G>
                        <Defs>
                          <ClipPath id="clip0_221_5919">
                            <Rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0.310547)"
                            />
                          </ClipPath>
                        </Defs>
                      </Svg>
                    </Box>

                    <Text fontFamily={'Cairo'} fontWeight={600} marginTop={2}>
                      تواصل معنا{' '}
                    </Text>
                  </Box>
                );
              }}
            </Pressable>
          </Box>
        </Container>
      </Box>
    </ScrollView>
  );
};

export default Account;
