import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps
} from 'react-native';
import { AnimatedProps } from 'react-native-reanimated';
import { IconFamilyType } from '../constants/ui';
import { MarginProps } from './global';

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
  margins?: MarginProps;
}

// AppIcon props interface
export interface AppIconProps {
  name?: any;
  family?: IconFamilyType;
  color?: ColorValue;
  size?: number;
  onPress?: ((event: GestureResponderEvent) => void) | any;
  loading?: boolean;
  style?: StyleProp<TextStyle>;
  margins?: MarginProps;
  themeColors?: {
    dark: string;
    light: string;
  };
  onLayout?: any;
}
