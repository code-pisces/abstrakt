// next & react imports
import { createContext } from 'react';
import Router from 'next/router';

// dependencies imports
import { parseCookies, setCookie } from 'nookies';

// code imports
import { api } from '@/services/api';

// types imports
import { AuthContextType, SignInType } from '@/types';

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }, ctx) => {
  const { ['abstrakt.token']: token } = parseCookies(ctx);

  const isAuthenticated = !!token;

  const signInLogin = async ({ email, password }: SignInType) => {
    await api
      .post('/auth/local/login', {
        email,
        password
      })
      .then(async ({ data }) => {
        const tokenAccess = await data.data.accessToken;
        setCookie(undefined, 'abstrakt.token', tokenAccess, {
          maxAge: 60 * 60 * 1 // 1 hour
        });

        Router.push('/app');

        api.defaults.headers['Authorization'] = `Bearer ${tokenAccess}`;
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signInLogin, token }}>
      {children}
    </AuthContext.Provider>
  );
};
