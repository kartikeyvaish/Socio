// Imports configs and types  
import { AppThemeProps } from "../types/AppTypes"
import ColorPallete from "./ColorPallete"

// Configurations for Dark Theme
export const darkTheme: AppThemeProps = {
    dark: true,
    colors: {
        background: ColorPallete.black,
        card: ColorPallete.black,
        border: ColorPallete.black,
        primary: ColorPallete.primary,
        text: ColorPallete.white,
        notification: ColorPallete.primary,
    }
}

// Configuratons for Light Theme
export const lightTheme: AppThemeProps = {
    dark: false,
    colors: {
        background: ColorPallete.white,
        card: ColorPallete.white,
        border: ColorPallete.white,
        primary: ColorPallete.primary,
        text: ColorPallete.black,
        notification: ColorPallete.primary,
    }
}