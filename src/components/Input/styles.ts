import styled, { css } from 'styled-components';

type InputStylesProps = {
  isShowing?: boolean;
};

export const Wrapper = styled.div<InputStylesProps>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 5rem;

  background: ${(props) => props.theme.colors.background};
  /* Gray/Medium */

  border: 0.1rem solid #a8a8b3;
  box-sizing: border-box;
  border-radius: 0.8rem;

  overflow: hidden;

  &:hover {
    border-color: ${(props) => props.theme.colors.secondary};
  }

  input {
    flex: 1;
    height: 100%;

    padding: 1.6rem;

    background: transparent;

    border: none;
    outline: none;

    font-family: ${(props) => props.theme.fonts.primary};
    font-style: normal;
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 1.9rem;
  }
  div {
    height: 100%;
    width: 2rem;

    right: 0;

    display: flex;
    align-items: center;

    position: absolute;
    z-index: 1;

    margin-right: 2.5rem;

    svg {
      font-size: 2rem;
      color: ${(props) => props.theme.colors.inputBorderText};

      ${({ isShowing }) =>
        isShowing &&
        css`
          color: ${(props) => props.theme.colors.secondary};
        `}

      &:hover {
        color: ${(props) => props.theme.colors.secondary};
      }
    }
  }
`;
