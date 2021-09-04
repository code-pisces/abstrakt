// next & react imports
import { GetServerSideProps } from 'next';

// dependencies imports
import jwt_decode from 'jwt-decode';
import { parseCookies } from 'nookies';

// code imports
import { validateEmail } from '@/utils/validateEmail';

// types imports
import { Decoded } from '@/types';

const app: React.FC = () => {
  return (
    <p
      style={{
        fontSize: '2rem',
        fontFamily: 'Roboto, sans-serif',
        padding: '2rem'
      }}
    >
      Você está autenticado :), com isso suponho que você não seja alguém que
      tentou invadir o sistema.
      <br />
      Por favor, não faça isso novamente caso você tenha feito, sua vó nunca te
      disse que falta de educação invadir sistemas alheios?
      <br />
      Logo terá novas novidades.
    </p>
  );
};

export default app;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['abstrakt.token']: token } = parseCookies(ctx);

  const decoded: Decoded = token && jwt_decode(token);
  if (!token) {
    if (!decoded || !validateEmail(decoded.email)) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    }
  }

  return {
    props: {}
  };
};
