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
  payload?: initialStateType;
};

export const AuthReducer = (state: initialStateType, action: actionType) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      if (action.payload) {
        return {
          ...state,
          user: action.payload.user,
          jwt: action.payload.jwt,
          loading: false,
        };
      } else {
        return {
          ...state,
          user: undefined,
          loading: undefined,
        };
      }
    case 'LOGOUT':
      return {
        ...state,
        user: undefined,
        jwt: undefined,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
