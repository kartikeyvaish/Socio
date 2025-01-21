import { TextProps } from 'react-native';

export interface AppTextProps extends TextProps {
  text: string;
  color?: string;
  size?: number;
  family?: string;
  marginLeft?: number;
  marginBottom?: number;
  marginRight?: number;
  marginTop?: number;
  margin?: number;
}
