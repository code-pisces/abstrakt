import 'react-toastify/dist/ReactToastify.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  html, body, #__next {
    height: 100%;
    background: ${(props) => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility !important;
  }
  h1, h2, h3, h4 {
    font-family: ${(props) => props.theme.fonts.titles};
    font-weight: bold;
  }
`;

export default GlobalStyles;
