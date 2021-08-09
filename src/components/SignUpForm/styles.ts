import styled from 'styled-components';

export const Wrapper = styled.main`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.5rem;

  @media (orientation: landscape) and (min-width: 768px) {
    flex-direction: row;
  }

  a {
    font-family: ${(props) => props.theme.fonts.primary};
    text-decoration: none;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-align: center;

    color: ${(props) => props.theme.colors.inputBorderText};

    transition: all ease-in-out 0.3s;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export const ImageInitial = styled.div`
  width: 100%;
  height: 30rem;
  min-height: 15rem;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  img {
    height: 25rem;
    width: 40rem;
  }

  @media (orientation: landscape) and (min-width: 768px) {
    width: max-content;
    display: flex;
    align-items: center;
    height: 40rem;

    img {
      width: 45rem;
      height: 60rem;
    }
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 40rem;

  h1 {
    width: 100%;

    text-align: left;
    font-weight: bold;
    font-size: 3.2rem;
    line-height: 3.9rem;

    color: ${(props) => props.theme.colors.titles};
  }

  @media (orientation: landscape) and (min-width: 768px) {
    border-left: 1px solid ${(props) => props.theme.colors.inputBorderText};
    padding-left: 5.4rem;
  }
`;

export const SignWithGoogle = styled.button`
  margin-top: 2.7rem;
  padding: 1.5rem;

  background: ${(props) => props.theme.colors.background};

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  transition: filter ease-in-out 0.3s;

  border: 0.1rem solid ${(props) => props.theme.colors.inputBorderText};
  box-sizing: border-box;
  border-radius: 0.8rem;

  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;

  color: ${(props) => props.theme.colors.titles};

  svg {
    height: 2rem;
    width: 2rem;
  }

  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const SeparatorWithOr = styled.div`
  margin-top: 1rem;

  display: flex;
  align-items: center;

  div {
    width: 100%;
    border-bottom: 0.1rem solid ${(props) => props.theme.colors.inputBorderText};
  }

  span {
    width: 100%;
    padding: 0 1rem;

    font-family: ${(props) => props.theme.fonts.primary};
    font-style: normal;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-align: center;

    color: ${(props) => props.theme.colors.inputBorderText};
  }
`;

export const LoginInputGroup = styled.div`
  width: 100%;

  margin: 2rem 0;

  > div:nth-child(1) {
    border-radius: 0.8rem 0.8rem 0 0;
  }

  > div:nth-child(2) {
    border-radius: 0 0 0.8rem 0.8rem;
    position: relative;
  }
`;

export const InputWithErrorGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  span {
    margin-top: 0.5rem;
    width: 100%;

    font-family: ${(props) => props.theme.fonts.primary};
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 16px;

    color: ${(props) => props.theme.colors.danger};
  }
`;

export const SignInField = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
