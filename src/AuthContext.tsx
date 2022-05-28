import React, {Dispatch, createContext} from 'react';
import {GetData} from './plugins/storage';
import {
  AuthReducer,
  initialState,
  initialStateType,
  actionType,
} from './Reducer';
type DispatchType = Dispatch<actionType> | undefined;

export const AuthStateContext = createContext<initialStateType>(initialState);
export const AuthDispatchContext = createContext<DispatchType>(undefined);
export const CartCountContext = createContext<any>(undefined);

// Context/context.js

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, dispatch] = React.useReducer(AuthReducer, initialState);
  const [count, countDispatch] = React.useState(0);

  React.useEffect(() => {
    GetData('cart').then(res => {
      if (res !== undefined && res !== null) {
        countDispatch(JSON.parse(res).length);
      }
    });
  });

  return (
    <CartCountContext.Provider value={{count, countDispatch}}>
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    </CartCountContext.Provider>
  );
};

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}

export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }

  return context;
}
