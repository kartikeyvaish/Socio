// Packages Imports
import Animated, { AnimatedProps, LinearTransition } from 'react-native-reanimated';

// Named Imports
import { AppTextProps } from '../../types/components';
import { fontFamilies } from '../../constants/ui';
import { useAppSelector } from '../../store/storeHooks';

interface Props extends AnimatedProps<AppTextProps> {}

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
    ...otherProps
  } = props;

  const { colors } = useAppSelector((state) => state.theme);

  // Assemble textStyles
  const finalStyles: Props['style'] = [
    {
      color: color ? color : colors.text,
      fontSize: size,
      fontFamily: family ? family : fontFamilies.Poppins.regular,
      marginLeft,
      marginBottom,
      marginRight,
      marginTop,
      margin,
      includeFontPadding: false
    },
    style
  ];

  // if no text, return null
  if (!text) return null;

  // render
  return (
    <Animated.Text layout={LinearTransition} style={finalStyles} {...otherProps}>
      {text}
    </Animated.Text>
  );
}

// exports
export default AppText;
