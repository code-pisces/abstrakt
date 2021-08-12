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
    margin-bottom: 1rem;
  }

  p {
    width: 100%;
    font-family: ${(props) => props.theme.fonts.primary};
    text-decoration: none;
    font-weight: normal;
    font-size: 1.4rem;
    line-height: 1.6rem;
    text-align: left;

    color: ${(props) => props.theme.colors.inputBorderText};
  }

  @media (orientation: landscape) and (min-width: 768px) {
    border-left: 1px solid ${(props) => props.theme.colors.inputBorderText};
    padding-left: 5.4rem;
  }
`;

export const SignUpInputGroup = styled.div`
  width: 100%;

  margin: 2rem 0;

  > div:nth-child(1) {
    border-radius: 0.8rem 0.8rem 0 0;
  }

  > div:nth-child(2) {
    border-radius: 0;
  }

  > div:nth-child(3) {
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

export const SignUpField = styled.div`
  margin-top: 1rem;
  width: 100%;

  p a {
    color: ${(props) => props.theme.colors.primary};
  }
`;
