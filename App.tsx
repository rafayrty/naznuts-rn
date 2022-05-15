/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {StyleSheet, useColorScheme} from 'react-native';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Product from './src/pages/Product';

import {Box, extendTheme, NativeBaseProvider} from 'native-base';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import colors from 'native-base/lib/typescript/theme/base/colors';
import Tabs from './src/pages/Tabs';
import Orders from './src/pages/Account/Orders';
import Order from './src/pages/Account/Orders/Order';
import Address from './src/pages/Account/Address';
import NewAddress from './src/pages/Account/Address/New';
import Terms from './src/pages/Account/Terms';
import Contact from './src/pages/Account/Contact';

import DrawerMenu from './Drawer';
import Cart from './src/pages/Cart';
const newColorTheme = {
  primary: {
    '50': '#F1F9EC',
    '100': '#E4F2D9',
    '200': '#C9E6B2',
    '300': '#B0DA90',
    '400': '#95CE69',
    '500': '#79C143',
    '600': '#629D34',
    '700': '#4A7727',
    '800': '#304D19',
    '900': '#18260D',
  },
  secondary: {
    '50': '#9DBDC7',
    '100': '#90B5C0',
    '200': '#77A3B1',
    '300': '#5D92A2',
    '400': '#4E7A88',
    '500': '#3F636E',
    '600': '#3F636E',
    '700': '#162327',
    '800': '#020303',
    '900': '#000000',
  },
};
const theme = extendTheme({
  colors: newColorTheme,
  fontConfig: {
    Cairo: {
      300: {
        normal: 'Cairo-Light',
      },
      400: {
        normal: 'Cairo-Regular',
      },
      500: {
        normal: 'Cairo-Medium',
      },
      600: {
        normal: 'Cairo-SemiBold',
      },
      700: {
        normal: 'Cairo-Bold',
      },
      800: {
        normal: 'Cairo-ExtraBold',
      },
      900: {
        normal: 'Cairo-Black',
      },
    },
  },

  fonts: {
    Cairo: 'Cairo',
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // I18nManager.forceRTL(true);
  useEffect(() => {
    I18nManager.forceRTL(true);
    !I18nManager.isRTL && RNRestart.Restart();
  }, []);

  const Drawer = createDrawerNavigator();
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };
  return (
    <NativeBaseProvider theme={theme} config={config}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={props => <DrawerMenu {...props} />}
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            // contentStyle: {
            //   backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
            // },
          }}>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Register" component={Register} />
          <Drawer.Screen name="Tabs" component={Tabs} />
          <Drawer.Screen name="Product" component={Product} />
          <Drawer.Screen name="Orders" component={Orders} />
          <Drawer.Screen name="Order" component={Order} />
          <Drawer.Screen name="Address" component={Address} />
          <Drawer.Screen name="NewAddress" component={NewAddress} />
          <Drawer.Screen name="Terms" component={Terms} />
          <Drawer.Screen name="Contact" component={Contact} />
          <Drawer.Screen name="Cart" component={Cart} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;
