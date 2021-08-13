import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { LoginForm } from '../components/LoginForm';

export default function Home() {
  return <LoginForm />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['abstrakt.token']: token } = parseCookies(ctx);

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
