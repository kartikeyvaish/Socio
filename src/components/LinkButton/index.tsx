// Packages Imports (from node_modules)
import { StyleSheet, TextProps } from 'react-native';
import Animated, { AnimatedProps } from 'react-native-reanimated';

// Local Imports (components/types/utils)
import colorPallete from '../../constants/colorPallete';

// Named Imports
import { fontFamilies } from '../../constants/ui';

// interface for LinkButton component
export interface LinkButtonProps extends AnimatedProps<TextProps> {
  label: string;
  color?: string;
}

// functional component for LinkButton
function LinkButton(props: LinkButtonProps) {
  // Destructuring props
  const { label, color = colorPallete.primary, style, ...restProps } = props;

  // render
  return (
    <Animated.Text style={[{ color }, styles.textStyles, style]} {...restProps}>
      {label}
    </Animated.Text>
  );
}

// exports
export default LinkButton;

// styles for LinkButton
const styles = StyleSheet.create({
  textStyles: {
    includeFontPadding: false,
    fontFamily: fontFamilies.Poppins.medium
  }
});
