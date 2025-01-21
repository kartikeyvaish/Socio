export interface ThemeProps {
  dark: boolean;
  colors: {
    background: string;
    card: string;
    border: string;
    primary: string;
    text: string;
  };
}

export interface ChildrenProps {
  children?: React.ReactNode;
}
