// next & react imports
import { GetServerSideProps } from 'next';

// dependencies imports
import nookies from 'nookies';
import { parseCookies } from 'nookies';
import { getSession } from 'next-auth/client';
import jwt_decode from 'jwt-decode';

// code imports
import { LoginForm } from '@/components/LoginForm';
import { validateEmail } from '@/utils/validateEmail';

// types imports
import { Session, Decoded } from '@/types';

export default function Home() {
  return <LoginForm />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = await getSession(ctx);

  if (session) {
    nookies.set(ctx, 'abstrakt.token', session.accessToken, {
      maxAge: 60 * 60 * 1 // 1 hour
    });

    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    };
  }

  const { ['abstrakt.token']: token } = parseCookies(ctx);
  const decoded: Decoded = token && jwt_decode(token);
  if (token) {
    if (decoded && validateEmail(decoded.email)) {
      return {
        redirect: {
          destination: '/app',
          permanent: false
        }
      };
    }
  }

  return {
    props: {}
  };
};
