import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;

  Product: {slug: string};
  Search: {searchQuery: string};
  Categories: undefined;
  CategoryView: {slug: string};

  //Account
  Account: undefined;
  Order: {orderid: number};
  Orders: undefined;
  Address: undefined;
  NewAddress: undefined;
  EditAddress: {data: object};
  Favourites: undefined;
  Management: undefined;
  Terms: undefined;
  Contact: undefined;

  //Checkout
  Cart: undefined;
  AddressCheckout: undefined;
  Receipt: undefined;
  Payment: undefined;
  Success: undefined;

  Forgot: undefined;
  Reset: undefined;
};
type PropsNav = NativeStackScreenProps<RootStackParamList, 'Login'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default PropsNav;
