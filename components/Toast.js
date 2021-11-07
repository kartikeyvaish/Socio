import Snackbar from "react-native-snackbar";
import ColorPallete from "../config/ColorPallete";

function show({
  text = "Some Error Occurred",
  buttonText = undefined,
  duration = 3000,
  buttonTextColor,
  buttonOnPress,
  backgroundColor,
  type = "danger",
  textColor,
  numberOfLines = 2,
}) {
  Snackbar.show({
    text: text || "Some Error Occurred",
    duration: duration,
    backgroundColor: backgroundColor
      ? backgroundColor
      : type === "danger"
      ? ColorPallete.red
      : type === "warning"
      ? ColorPallete.grandis
      : ColorPallete.green,
    textColor: textColor,
    numberOfLines: numberOfLines,
    action: buttonText
      ? {
          text: buttonText,
          textColor: buttonTextColor,
          onpress: buttonOnPress,
        }
      : undefined,
  });
}

export default {
  show,
};
