// Packages Imports
import { memo } from "react";
import { StyleProp, TextStyle } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

// Local Imports
import FontNames from "../../constants/FontNames";

// Named Imports
import { AnimatedTextProps } from "../../types/ComponentTypes";
import { useAppSelector } from "../../store/reduxHooks";

// function component for AnimatedText
function AnimatedText(props: AnimatedTextProps) {
  // Destructuring props
  const { text, size, fontFamily, fontWeight, children, color, style, margins, ...restProps } =
    props;

  // get the theme
  const { colors } = useAppSelector(state => state.theme);

  // seperate margins
  const seperateMargins = {
    margin: margins?.all,
    marginTop: margins?.top,
    marginRight: margins?.right,
    marginBottom: margins?.bottom,
    marginLeft: margins?.left,
  };

  // text styles
  const textStyles: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>> = [
    {
      color: color ? color : colors.text,
      fontSize: size,
      fontWeight,
      fontFamily: fontFamily ? FontNames[fontFamily] : FontNames.PoppinsRegular,
    },
    seperateMargins,
    style,
  ];

  // render
  return (
    <Animated.Text style={textStyles} layout={Layout} {...restProps}>
      <>
        {text}
        {children}
      </>
    </Animated.Text>
  );
}

// exports
export default memo(AnimatedText);
