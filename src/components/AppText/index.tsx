// Packages Imports
import { Text, StyleProp, TextStyle } from 'react-native';

// Named Imports
import { AppTextProps } from '../../types/components';
import { fontFamilies } from '../../constants/ui';
import { useAppSelector } from '../../store/storeHooks';

// function component for AppText
function AppText(props: AppTextProps) {
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
  const finalStyles: StyleProp<TextStyle> = [
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
    <Text style={finalStyles} {...otherProps}>
      {text}
    </Text>
  );
}

// exports
export default AppText;
