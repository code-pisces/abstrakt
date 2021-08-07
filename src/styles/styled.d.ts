import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    fonts: {
      titles: string;
      primary: string;
    };

    colors: {
      primary: string;
      secondary: string;
      third: string;

      background: string;
      text: string;
      titles: string;
      subtext: string;

      icons: string;
      inputBorderText: string;

      safe: string;
      danger: string;
      alert: string;
      cancel: string;
    };
  }
}
