import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Product: {slug: string};
  Search: {searchQuery: string};
  Categories: undefined;
  CategoryView: {slug: string};
};
type PropsNav = NativeStackScreenProps<RootStackParamList, 'Login'>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export default PropsNav;
