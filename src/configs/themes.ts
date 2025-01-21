// Imports configs and types
import colorPallete from '../constants/colorPallete';
import { ThemeProps } from '../types/global';

// Configurations for Dark Theme
export const darkTheme: ThemeProps = {
  dark: true,
  colors: {
    background: colorPallete.black,
    card: colorPallete.black,
    border: colorPallete.black,
    primary: colorPallete.primary,
    text: colorPallete.white
  }
};

// Configuratons for Light Theme
export const lightTheme: ThemeProps = {
  dark: false,
  colors: {
    background: colorPallete.white,
    card: colorPallete.white,
    border: colorPallete.white,
    primary: colorPallete.primary,
    text: colorPallete.black
  }
};
