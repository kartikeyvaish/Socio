// Packages Imports
import { memo, useContext } from "react";
import { StyleSheet } from "react-native";

// Local imports
import AnimatedView from "../Animated/AnimatedView";
import BackgroundColorContext from "../../contexts/BackgroundColorContext";

// named imports
import { AnimatedViewProps } from "../../types/ComponentTypes";

// function component for AppContainer
function AppContainer(props: AnimatedViewProps) {
  // Destructuring props
  const { style, ...otherProps } = props;

  const { animatedStyles } = useContext(BackgroundColorContext);

  // Assemle the final container Styles
  const containerStyles = [styles.container, style, animatedStyles];

  // render
  return <AnimatedView style={containerStyles} {...otherProps} />;
}

// exports
export default memo(AppContainer);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
