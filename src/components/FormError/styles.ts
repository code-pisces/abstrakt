import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1rem;
  padding: 1rem;

  background: ${(props) => props.theme.colors.danger};
  min-height: 5rem;
  border-radius: 0.8rem;

  svg {
    height: 2rem;
    width: 2rem;
    margin-right: 1rem;
    color: ${(props) => props.theme.colors.background};
  }

  div:first-of-type {
    flex: 1;
  }

  div:last-of-type {
    flex: 9;
    display: flex;
    flex-direction: column;
  }

  > div {
    height: 100%;

    span {
      font-family: ${(props) => props.theme.fonts.primary};
      font-weight: 500;
      font-size: 1.4rem;
      line-height: 16px;

      color: ${(props) => props.theme.colors.background};

      transition: all ease-in-out 0.3s;
    }

    span + span {
      margin-top: 0.8rem;
    }
  }
`;
