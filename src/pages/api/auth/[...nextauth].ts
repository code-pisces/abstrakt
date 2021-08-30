import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { api } from '../../../services/api';

import { AuthenticatedUser } from '../../../../types';

const settings = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    })
  ],

  callbacks: {
    async signIn(user: AuthenticatedUser, account, profile) {
      if (account.provider === 'google') {
        const { idToken } = account;

        try {
          const { data } = await api.post('/auth/google', { token: idToken });

          const { accessToken } = data.data;
          user.access_token = accessToken;

          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    },

    async jwt(token, user: AuthenticatedUser, account, profile, isNewUser) {
      if (user) {
        const { access_token } = user;
        token.access = access_token;
      }

      return token;
    },

    async session(session, user: AuthenticatedUser) {
      session.accessToken = user.access;
      return session;
    }
  },

  pages: {
    error: '/fronterror/signerror'
  }
};

export default (request: NextApiRequest, response: NextApiResponse) =>
  NextAuth(request, response, settings);
