// Packages Imports
import { View, StyleSheet } from "react-native";

// Local Imports
import AnimatedView from "../Animated/AnimatedView";
import { AnimatedViewProps } from "../../types/ComponentTypes";

// function component for AppView
function AppView(props: AnimatedViewProps) {
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
export default AppView;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
