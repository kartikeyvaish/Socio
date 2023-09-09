// Packages Imports
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

// Local Imports
import FontNames from "../../constants/FontNames";

// Named Imports
import { AppTextProps } from "../../types/ComponentTypes";
import { useAppSelector } from "../../store/reduxHooks";

// function component for AppText
function AppText(props: AppTextProps) {
  // Destructuring props
  const { text, margins, size, color, fontWeight, fontFamily, style, children, ...otherProps } =
    props;

  // Holds the Redux State
  const theme = useAppSelector(state => state.theme);

  // seperate margins
  const seperateMargins = {
    margin: margins?.all,
    marginTop: margins?.top,
    marginRight: margins?.right,
    marginBottom: margins?.bottom,
    marginLeft: margins?.left,
  };

  // text styles
  const textStyles: StyleProp<TextStyle> = [
    styles.text,
    {
      color: color ? color : theme.colors.text,
      fontSize: size,
      fontWeight,
      fontFamily: fontFamily ? FontNames[fontFamily] : FontNames.PoppinsRegular,
    },
    seperateMargins,
    style,
  ];

  if (text === undefined && children === undefined) return null;

  // render
  return (
    <Text style={textStyles} allowFontScaling={false} {...otherProps}>
      {text}
      {children}
    </Text>
  );
}

// exports
export default AppText;

// styles
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
