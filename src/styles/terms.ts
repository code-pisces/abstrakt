import styled from 'styled-components';

export const Wrapper = styled.main`
  padding: 2rem;

  h2 {
    font-size: 2rem;
    margin-top: 1rem;
  }

  h3 {
    font-size: 1.8rem;
    margin-top: 1rem;
  }

  a {
    color: ${(props) => props.theme.colors.secondary};
  }

  p,
  span,
  ul,
  li {
    font-size: 1.6rem;
    font-family: ${(props) => props.theme.fonts.primary};
  }
`;
