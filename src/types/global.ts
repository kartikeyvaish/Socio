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

export interface MarginProps {
  all?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
