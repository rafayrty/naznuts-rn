import axios from 'axios';
export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  fullname: string;
  phone: string;
}

export type initialStateType = {
  user: User | undefined;
  jwt: string | undefined;
  loading?: boolean;
};

export const initialState = {
  user: undefined,
  jwt: undefined,
  loading: false,
};

export type actionType = {
  type: string;
  payload?: any;
};

export const AuthReducer = (state: initialStateType, action: actionType) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload?.user,
        jwt: action.payload?.jwt,
        loading: false,
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        user: undefined,
        jwt: undefined,
        loading: false,
      };
    case 'LOGOUT':
      axios.defaults.headers.common.Authorization = false;
      return {
        ...state,
        user: undefined,
        jwt: undefined,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
