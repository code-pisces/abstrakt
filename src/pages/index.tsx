import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { parseCookies } from 'nookies';
import { getSession } from 'next-auth/client';
import { LoginForm } from '../components/LoginForm';

interface User {
  name?: string;
  email?: string;
  image?: string;
}

interface Session {
  user?: User;
  expires?: string;
  accessToken?: string;
}
export default function Home() {
  return <LoginForm />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session: Session = await getSession(ctx);

  if (session) {
    nookies.set(ctx, 'abstrakt.token', session.accessToken, {
      maxAge: 60 * 60 * 1 // 1 hour
    });

    console.log(session.accessToken);

    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    };
  }

  const { ['abstrakt.token']: token } = parseCookies(ctx);

  console.log(token);

  if (token) {
    return {
      redirect: {
        destination: '/app',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
