import styled, { css, keyframes } from 'styled-components';

type ButtonStylesProps = {
  Outlined?: boolean;
};

const InfiniteLoad = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Wrapper = styled.button<ButtonStylesProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 100%;
  height: 5rem;

  background: ${(props) => props.theme.colors.primary};
  border-radius: 0.8rem;

  border: none;

  font-family: ${(props) => props.theme.fonts.primary};
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.9rem;
  /* identical to box height */

  /* White/Details */

  color: ${(props) => props.theme.colors.background};

  ${({ Outlined }) => Outlined && css``}

  transition: filter ease-in-out 0.3s;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const Loader = styled.div`
  border: 0.3rem solid rgba(255, 255, 255, 0.2); /* Light grey */
  border-top: 0.3rem solid ${(props) => props.theme.colors.background}; /* Blue */
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  animation: ${InfiniteLoad} 2s linear infinite;
`;
