import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 3rem;

  display: grid;
  place-items: center;

  h1 {
    font-size: 10rem;
    font-family: ${(props) => props.theme.fonts.titles};
    @media (max-width: 500px) {
      font-size: 5rem;
    }
  }

  p {
    font-size: 4rem;
    font-family: ${(props) => props.theme.fonts.primary};
    @media (max-width: 508px) {
      font-size: 2rem;
    }
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const errors: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>Ops...!</h1>
        <p>
          Algo ocorreu, <a href="/">tente novamente</a>.
        </p>
      </div>
    </Container>
  );
};

export default errors;
