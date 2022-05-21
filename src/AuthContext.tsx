import React, {Dispatch, createContext} from 'react';
import {
  AuthReducer,
  initialState,
  initialStateType,
  actionType,
} from './Reducer';
type DispatchType = Dispatch<actionType> | undefined;

export const AuthStateContext = createContext<initialStateType>(initialState);
export const AuthDispatchContext = createContext<DispatchType>(undefined);

// Context/context.js

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [user, dispatch] = React.useReducer(AuthReducer, initialState);
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
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
