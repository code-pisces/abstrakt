import { createContext, useState } from 'react';
import Router from 'next/router';

import { api } from '../services/api';

import { setCookie } from 'nookies';

type SignInType = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  token: string;
  signIn: (data: SignInType) => Promise<void>;
  setToken: (data: string) => void;
};
export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState('');

  const isAuthenticated = !!token;

  const signIn = async ({ email, password }: SignInType) => {
    await api
      .post('/auth/local/login', {
        headers: {
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        email,
        password
      })
      .then(({ data }) => {
        setToken(data.data.accessToken);
        Router.push('/app');
      });

    setCookie(undefined, 'abstrakt.token', token, {
      maxAge: 60 * 60 * 1 // 1 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
