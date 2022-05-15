import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Login: undefined;
  Product: undefined;
  Categories: undefined;
};
type PropsNav = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default PropsNav;
