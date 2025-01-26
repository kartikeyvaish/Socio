// Packages Imports
import { StyleSheet } from 'react-native';
import Animated, { AnimatedProps, FadeIn, LinearTransition } from 'react-native-reanimated';

// Local Imports
import colorPallete from '../../constants/colorPallete';

// Named Imports
import { AppTextProps } from '../../types/components';
import { fontFamilies } from '../../constants/ui';
import { useAppSelector } from '../../store/storeHooks';

interface Props extends AnimatedProps<AppTextProps> {
  type?: 'text' | 'error';
}

// function component for AppText
function AppText(props: Props) {
  // Destructuring props
  const {
    text,
    color,
    size,
    style,
    family,
    marginLeft,
    marginBottom,
    marginRight,
    marginTop,
    margin,
    type = 'text',
    ...otherProps
  } = props;

  const { colors } = useAppSelector((state) => state.theme);

  const errorStyles: Props['style'] = type === 'error' ? styles.errorStyles : {};

  // Assemble textStyles
  const finalStyles: Props['style'] = [
    {
      color: type === 'text' ? (color ? color : colors.text) : colorPallete.danger,
      fontSize: type === 'text' ? size : 12,
      fontFamily: family ? family : fontFamilies.Poppins.regular,
      marginLeft,
      marginBottom,
      marginRight,
      marginTop,
      margin,
      includeFontPadding: false
    },
    errorStyles,
    style
  ];

  // if no text, return null
  if (!text) return null;

  // render
  return (
    <Animated.Text
      entering={type === 'error' ? FadeIn : undefined}
      layout={LinearTransition}
      style={finalStyles}
      {...otherProps}
    >
      {text}
    </Animated.Text>
  );
}

// exports
export default AppText;

const styles = StyleSheet.create({
  errorStyles: {
    marginTop: 4,
    marginLeft: 2
  }
});
