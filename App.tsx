/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RNBootSplash from 'react-native-bootsplash';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {StyleSheet, Text, useColorScheme} from 'react-native';

import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Product from './src/pages/Product';

import {AuthProvider, useAuthDispatch, useAuthState} from './src/AuthContext';

import {
  Alert,
  AlertDialog,
  Box,
  extendTheme,
  NativeBaseProvider,
  Spinner,
} from 'native-base';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import colors from 'native-base/lib/typescript/theme/base/colors';
import Tabs from './src/pages/Tabs';
import Orders from './src/pages/Account/Orders';
import Order from './src/pages/Account/Orders/Order';
import Address from './src/pages/Account/Address';
import NewAddress from './src/pages/Account/Address/New';
import EditAddress from './src/pages/Account/Address/Edit';

import Terms from './src/pages/Account/Terms';
RNBootSplash.hide();
import Contact from './src/pages/Account/Contact';

import DrawerMenu from './Drawer';
import Cart from './src/pages/Cart';
import MainStackNavigator from './StackNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GetData} from './src/plugins/storage';
import {LoggedUser} from './src/types/User';
import axios from 'axios';
import CategoryView from './src/pages/CategoryView';
import {AppState} from 'react-native';
import {focusManager} from 'react-query';
import Management from './src/pages/Account/Management';

// Checkout

import AddressCheckout from './src/pages/Checkout/Address';
import Receipt from './src/pages/Checkout/Receipt';
import Payment from './src/pages/Checkout/Payment';
import Success from './src/pages/Checkout/Success';

focusManager.setEventListener(handleFocus => {
  const subscription = AppState.addEventListener('change', state => {
    handleFocus(state === 'active');
  });

  return () => {
    subscription.remove();
  };
});

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

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  // const [user, setUser] = useState<any>(null);
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'REQUEST_LOGIN'});

      GetData('user').then((res: any) => {
        if (res !== undefined) {
          axios.defaults.headers.common.Authorization = `Bearer ${
            JSON.parse(res).jwt
          }`;
          dispatch({type: 'LOGIN_SUCCESS', payload: JSON.parse(res)});
        } else {
          dispatch({type: 'LOGIN_FAILED'});
        }
      });
    }, 100);
  }, [dispatch]);

  if (user.loading === false) {
    RNBootSplash.hide();
  }

  return (
    <>
      <Stack.Navigator
        // drawerContent={props => <DrawerMenu {...props} />}
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          // contentStyle: {
          //   backgroundColor: isDarkMode ? '#1C1C1E' : '#FFF',
          // },
        }}>
        {user.user === undefined && (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        {user.user !== undefined && (
          <>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="CategoryView" component={CategoryView} />

            <Stack.Screen name="Product" component={Product} />
            {/* Management */}

            <Stack.Screen name="Orders" component={Orders} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Address" component={Address} />
            <Stack.Screen name="NewAddress" component={NewAddress} />
            <Stack.Screen name="EditAddress" component={EditAddress} />
            <Stack.Screen name="Management" component={Management} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="Contact" component={Contact} />
            {/* Checkout */}
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="AddressCheckout" component={AddressCheckout} />
            <Stack.Screen name="Receipt" component={Receipt} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Success" component={Success} />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // Create a client
  const queryClient = new QueryClient();
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // I18nManager.forceRTL(true);
  React.useEffect(() => {
    // console.log('test 222', state.user);
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
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme} config={config}>
          <NavigationContainer>
            <Drawer.Navigator
              useLegacyImplementation={true}
              screenOptions={{
                headerShown: false,
                swipeEnabled: false,
              }}
              drawerContent={props => <DrawerMenu {...props} />}>
              <Drawer.Screen name="Main" component={StackNavigator} />
            </Drawer.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};
export default App;
