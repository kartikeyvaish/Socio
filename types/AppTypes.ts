// Interface for the theme object
export interface AppThemeProps {
    dark: boolean;
    colors: {
        background: string;
        card: string;
        border: string;
        primary: string;
        text: string;
        notification: string;
    }
}