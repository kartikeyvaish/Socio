import { TextProps, ViewProps } from 'react-native';
import { AnimatedProps } from 'react-native-reanimated';

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

export interface AnimatedViewProps extends AnimatedProps<ViewProps> {}

export interface FlexViewProps extends AnimatedViewProps {
  flex?: number;
  align?: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  row?: boolean;
  gap?: number;
}
