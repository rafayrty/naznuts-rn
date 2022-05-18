import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import {StyleSheet, Platform} from 'react-native';
import {Box, Text, useTheme} from 'native-base';
import Svg, {Path} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Categories from './Categories';
import Favourites from './Favourites';
import Account from './Account';
const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 5,
          left: 5,
          right: 5,
          height: 80,
          paddingTop: 16,
          paddingBottom: 10,
          borderRadius: 20,
          ...styles.shadow,
          borderColor: 'rgba(81, 128, 142, 0.2)',
          borderWidth: 1,
          borderTopColor: 'rgba(81, 128, 142, 0.2)',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}): React.ReactNode => {
            return (
              <Box alignItems={'center'}>
                <Svg width="28" height="27" viewBox="0 0 28 27" fill="none">
                  <Path
                    d="M10 25H18M10 25H7.33333C5.91885 25 4.56229 24.4404 3.5621 23.4444C2.5619 22.4484 2 21.0975 2 19.6889V11.3344C1.99998 10.4212 2.23642 9.5234 2.68649 8.72772C3.13656 7.93204 3.78505 7.26537 4.56933 6.79209L11.236 2.7689C12.0695 2.26593 13.0254 2 14 2C14.9746 2 15.9305 2.26593 16.764 2.7689L23.4307 6.79209C24.2148 7.26525 24.8631 7.93171 25.3132 8.72714C25.7632 9.52257 25.9998 10.4201 26 11.3331V19.6889C26 21.0975 25.4381 22.4484 24.4379 23.4444C23.4377 24.4404 22.0812 25 20.6667 25H18H10ZM10 25V19.6889C10 18.6324 10.4214 17.6192 11.1716 16.8722C11.9217 16.1252 12.9391 15.7055 14 15.7055V15.7055C15.0609 15.7055 16.0783 16.1252 16.8284 16.8722C17.5786 17.6192 18 18.6324 18 19.6889V25H10Z"
                    stroke={focused ? colors.primary['500'] : '#272727'}
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  color={focused ? colors.primary['500'] : '#272727'}>
                  الرئيسية
                </Text>
              </Box>
            );
          },
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}): React.ReactNode => {
            return (
              <Box alignItems={'center'}>
                <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                  <Path
                    d="M8.16667 13.8333C8.96232 13.8333 9.72538 14.1494 10.288 14.712C10.8506 15.2746 11.1667 16.0377 11.1667 16.8333V21.5C11.1667 22.2957 10.8506 23.0587 10.288 23.6213C9.72538 24.1839 8.96232 24.5 8.16667 24.5H3.5C2.70435 24.5 1.94129 24.1839 1.37868 23.6213C0.81607 23.0587 0.5 22.2957 0.5 21.5V16.8333C0.5 16.0377 0.81607 15.2746 1.37868 14.712C1.94129 14.1494 2.70435 13.8333 3.5 13.8333H8.16667ZM21.5 13.8333C22.2957 13.8333 23.0587 14.1494 23.6213 14.712C24.1839 15.2746 24.5 16.0377 24.5 16.8333V21.5C24.5 22.2957 24.1839 23.0587 23.6213 23.6213C23.0587 24.1839 22.2957 24.5 21.5 24.5H16.8333C16.0377 24.5 15.2746 24.1839 14.712 23.6213C14.1494 23.0587 13.8333 22.2957 13.8333 21.5V16.8333C13.8333 16.0377 14.1494 15.2746 14.712 14.712C15.2746 14.1494 16.0377 13.8333 16.8333 13.8333H21.5ZM8.16667 15.8333H3.5C3.23478 15.8333 2.98043 15.9387 2.79289 16.1262C2.60536 16.3138 2.5 16.5681 2.5 16.8333V21.5C2.5 22.052 2.948 22.5 3.5 22.5H8.16667C8.43188 22.5 8.68624 22.3946 8.87377 22.2071C9.06131 22.0196 9.16667 21.7652 9.16667 21.5V16.8333C9.16667 16.5681 9.06131 16.3138 8.87377 16.1262C8.68624 15.9387 8.43188 15.8333 8.16667 15.8333ZM21.5 15.8333H16.8333C16.5681 15.8333 16.3138 15.9387 16.1262 16.1262C15.9387 16.3138 15.8333 16.5681 15.8333 16.8333V21.5C15.8333 22.052 16.2813 22.5 16.8333 22.5H21.5C21.7652 22.5 22.0196 22.3946 22.2071 22.2071C22.3946 22.0196 22.5 21.7652 22.5 21.5V16.8333C22.5 16.5681 22.3946 16.3138 22.2071 16.1262C22.0196 15.9387 21.7652 15.8333 21.5 15.8333ZM8.16667 0.5C8.96232 0.5 9.72538 0.81607 10.288 1.37868C10.8506 1.94129 11.1667 2.70435 11.1667 3.5V8.16667C11.1667 8.96232 10.8506 9.72538 10.288 10.288C9.72538 10.8506 8.96232 11.1667 8.16667 11.1667H3.5C2.70435 11.1667 1.94129 10.8506 1.37868 10.288C0.81607 9.72538 0.5 8.96232 0.5 8.16667V3.5C0.5 2.70435 0.81607 1.94129 1.37868 1.37868C1.94129 0.81607 2.70435 0.5 3.5 0.5H8.16667ZM21.5 0.5C22.2957 0.5 23.0587 0.81607 23.6213 1.37868C24.1839 1.94129 24.5 2.70435 24.5 3.5V8.16667C24.5 8.96232 24.1839 9.72538 23.6213 10.288C23.0587 10.8506 22.2957 11.1667 21.5 11.1667H16.8333C16.0377 11.1667 15.2746 10.8506 14.712 10.288C14.1494 9.72538 13.8333 8.96232 13.8333 8.16667V3.5C13.8333 2.70435 14.1494 1.94129 14.712 1.37868C15.2746 0.81607 16.0377 0.5 16.8333 0.5H21.5ZM8.16667 2.5H3.5C3.23478 2.5 2.98043 2.60536 2.79289 2.79289C2.60536 2.98043 2.5 3.23478 2.5 3.5V8.16667C2.5 8.71867 2.948 9.16667 3.5 9.16667H8.16667C8.43188 9.16667 8.68624 9.06131 8.87377 8.87377C9.06131 8.68624 9.16667 8.43188 9.16667 8.16667V3.5C9.16667 3.23478 9.06131 2.98043 8.87377 2.79289C8.68624 2.60536 8.43188 2.5 8.16667 2.5ZM21.5 2.5H16.8333C16.5681 2.5 16.3138 2.60536 16.1262 2.79289C15.9387 2.98043 15.8333 3.23478 15.8333 3.5V8.16667C15.8333 8.71867 16.2813 9.16667 16.8333 9.16667H21.5C21.7652 9.16667 22.0196 9.06131 22.2071 8.87377C22.3946 8.68624 22.5 8.43188 22.5 8.16667V3.5C22.5 3.23478 22.3946 2.98043 22.2071 2.79289C22.0196 2.60536 21.7652 2.5 21.5 2.5Z"
                    fill={focused ? colors.primary['500'] : '#272727'}
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  color={focused ? colors.primary['500'] : '#272727'}>
                  التصنيفات
                </Text>
              </Box>
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}): React.ReactNode => {
            return (
              <Box alignItems={'center'}>
                <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.1901 15.9782L23.6458 22.434C23.8727 22.6611 24.0001 22.969 24 23.29C23.9999 23.611 23.8723 23.9189 23.6452 24.1458C23.4181 24.3727 23.1102 24.5001 22.7892 24.5C22.4682 24.4999 22.1604 24.3723 21.9335 24.1452L15.4778 17.6893C13.5479 19.1841 11.1211 19.8875 8.69104 19.6565C6.26097 19.4255 4.01018 18.2773 2.39656 16.4457C0.782936 14.614 -0.0723147 12.2364 0.00479537 9.79655C0.0819054 7.35668 1.08558 5.03783 2.81165 3.31172C4.53771 1.58561 6.85651 0.581907 9.29632 0.504795C11.7361 0.427683 14.1137 1.28296 15.9453 2.89662C17.7769 4.51028 18.925 6.76113 19.156 9.19126C19.387 11.6214 18.6836 14.0483 17.1889 15.9782H17.1901ZM9.60045 17.2993C11.5099 17.2993 13.3412 16.5408 14.6914 15.1905C16.0416 13.8403 16.8001 12.009 16.8001 10.0995C16.8001 8.18997 16.0416 6.35866 14.6914 5.00843C13.3412 3.65819 11.5099 2.89964 9.60045 2.89964C7.69098 2.89964 5.85971 3.65819 4.50951 5.00843C3.15932 6.35866 2.40078 8.18997 2.40078 10.0995C2.40078 12.009 3.15932 13.8403 4.50951 15.1905C5.85971 16.5408 7.69098 17.2993 9.60045 17.2993Z"
                    fill={focused ? colors.primary['500'] : '#272727'}
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  color={focused ? colors.primary['500'] : '#272727'}>
                  البحث
                </Text>
              </Box>
            );
          },
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}): React.ReactNode => {
            return (
              <Box alignItems={'center'}>
                <Svg width="25" height="22" viewBox="0 0 25 22" fill="none">
                  <Path
                    d="M17.9 0C15.812 0 13.808 0.971117 12.5 2.50572C11.192 0.971117 9.188 0 7.1 0C3.404 0 0.5 2.90136 0.5 6.59401C0.5 11.1259 4.58 14.8185 10.76 20.4294L12.5 22L14.24 20.4174C20.42 14.8185 24.5 11.1259 24.5 6.59401C24.5 2.90136 21.596 0 17.9 0ZM12.62 18.643L12.5 18.7629L12.38 18.643C6.668 13.4757 2.9 10.0589 2.9 6.59401C2.9 4.19619 4.7 2.39782 7.1 2.39782C8.948 2.39782 10.748 3.58474 11.384 5.22725H13.628C14.252 3.58474 16.052 2.39782 17.9 2.39782C20.3 2.39782 22.1 4.19619 22.1 6.59401C22.1 10.0589 18.332 13.4757 12.62 18.643Z"
                    fill={focused ? colors.primary['500'] : '#272727'}
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  color={focused ? colors.primary['500'] : '#272727'}>
                  المفضلة
                </Text>
              </Box>
            );
          },
        }}
      />

      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}): React.ReactNode => {
            return (
              <Box alignItems={'center'}>
                <Svg width="22" height="26" viewBox="0 0 22 26" fill="none">
                  <Path
                    d="M17.2018 11.375C17.6506 11.5104 18.0779 11.6942 18.4837 11.9263C18.8895 12.1585 19.3145 12.5115 19.7585 12.9855C20.2025 13.4594 20.582 14.018 20.8971 14.6613C21.2122 15.3045 21.4748 16.1363 21.6849 17.1568C21.895 18.1773 22 19.3211 22 20.5882C22 22.0778 21.5226 23.3521 20.5677 24.4113C19.6128 25.4704 18.4622 26 17.1159 26H4.88411C3.53776 26 2.38715 25.4704 1.43229 24.4113C0.477431 23.3521 0 22.0778 0 20.5882C0 19.3211 0.105035 18.1773 0.315104 17.1568C0.525174 16.1363 0.78776 15.3045 1.10286 14.6613C1.41797 14.018 1.79753 13.4594 2.24154 12.9855C2.68555 12.5115 3.11046 12.1585 3.51628 11.9263C3.92209 11.6942 4.34939 11.5104 4.79818 11.375C4.04384 10.1659 3.66667 8.85045 3.66667 7.42857C3.66667 6.42262 3.86003 5.46261 4.24675 4.54855C4.63346 3.63449 5.15625 2.84375 5.8151 2.17634C6.47396 1.50893 7.25456 0.979353 8.1569 0.587612C9.05925 0.195871 10.0069 0 11 0C11.9931 0 12.9408 0.195871 13.8431 0.587612C14.7454 0.979353 15.526 1.50893 16.1849 2.17634C16.8438 2.84375 17.3665 3.63449 17.7533 4.54855C18.14 5.46261 18.3333 6.42262 18.3333 7.42857C18.3333 8.85045 17.9562 10.1659 17.2018 11.375ZM11 1.85714C9.48177 1.85714 8.18555 2.40123 7.11133 3.4894C6.03711 4.57757 5.5 5.89062 5.5 7.42857C5.5 8.96652 6.03711 10.2796 7.11133 11.3677C8.18555 12.4559 9.48177 13 11 13C12.5182 13 13.8145 12.4559 14.8887 11.3677C15.9629 10.2796 16.5 8.96652 16.5 7.42857C16.5 5.89062 15.9629 4.57757 14.8887 3.4894C13.8145 2.40123 12.5182 1.85714 11 1.85714ZM17.1159 24.1429C17.9562 24.1429 18.6747 23.7971 19.2715 23.1055C19.8683 22.4139 20.1667 21.5748 20.1667 20.5882C20.1667 18.2764 19.7919 16.4531 19.0423 15.1183C18.2928 13.7835 17.2161 13.0822 15.8125 13.0145C14.428 14.2429 12.8238 14.8571 11 14.8571C9.17622 14.8571 7.57205 14.2429 6.1875 13.0145C4.78385 13.0822 3.70725 13.7835 2.95768 15.1183C2.20812 16.4531 1.83333 18.2764 1.83333 20.5882C1.83333 21.5748 2.13173 22.4139 2.72852 23.1055C3.3253 23.7971 4.04384 24.1429 4.88411 24.1429H17.1159Z"
                    fill={focused ? colors.primary['500'] : '#272727'}
                  />
                </Svg>

                <Text
                  fontFamily={'Cairo'}
                  color={focused ? colors.primary['500'] : '#272727'}>
                  حسابك
                </Text>
              </Box>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.5,
    elevation: 2,
  },
});

export default Tabs;
