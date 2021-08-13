import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

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
      Por favor não faça isso novamente caso você fez, sua vó nunca te disse que
      falta de educação invadir sistemas alheios?
    </p>
  );
};

export default app;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['abstrakt.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};
