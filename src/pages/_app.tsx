import { AppProps } from 'next/app';
import Head from 'next/head';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import GlobalStyles from 'styles/global';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Abstrakt</title>
        <link rel="shortcut icon" href="/img/logo-abstrakt.png" />
        <link rel="apple-touch-icon" href="/img/logo-abstrakt.png" />
        <link rel="manifest" href="manifest.json" />
        <meta
          name="description"
          content="Visamos ajudar a você entender e monitorar seu humor e emoções."
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
