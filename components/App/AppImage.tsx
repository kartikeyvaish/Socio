// Packages Imports
import { StyleProp, ViewStyle, View, StyleSheet } from "react-native";
import { Image } from "expo-image";

// Local imports
import { AppImageProps } from "../../types/ComponentTypes";

// function component for AppImage
function AppImage(props: AppImageProps) {
  // Destructuring props
  const {
    containerStyles,
    margins,
    width,
    height,
    children,
    childrenContainerStyles,
    ...restProps
  } = props;

  const seperateMargins = {
    marginTop: margins?.top,
    marginBottom: margins?.bottom,
    marginLeft: margins?.left,
    marginRight: margins?.right,
    margin: margins?.all,
  };

  const containerFinalStyles: StyleProp<ViewStyle> = {
    width,
    height,
  };

  const finalStyles: StyleProp<ViewStyle> = [
    styles.container,
    containerFinalStyles,
    seperateMargins,
    containerStyles,
  ];

  const childrenContStyles = [styles.childrenContainer, childrenContainerStyles];

  // render
  return (
    <View style={finalStyles}>
      <Image style={styles.defaultImageStyles} {...restProps} />

      {children ? <View style={childrenContStyles}>{children}</View> : null}
    </View>
  );
}

// exports
export default AppImage;

// styles
const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  defaultImageStyles: { width: "100%", height: "100%" },
  childrenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
