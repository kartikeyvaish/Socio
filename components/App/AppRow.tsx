// Packages Imports
import { StyleSheet } from "react-native";

// Local Imports
import AnimatedView from "../Animated/AnimatedView";
import { AnimatedViewProps } from "../../types/ComponentTypes";

// function component for AppRow
function AppRow(props: AnimatedViewProps) {
  // Destructuring props
  const { children, style, ...otherProps } = props;

  // render
  return (
    <AnimatedView style={[styles.container, style]} {...otherProps}>
      {children}
    </AnimatedView>
  );
}

// exports
export default AppRow;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
});
