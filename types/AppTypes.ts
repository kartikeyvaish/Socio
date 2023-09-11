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

export interface UserProps {
    first_name: string;
    id: number;
    last_name: string;
    login_id: number;
    profile_picture: string;
    username: string;
}