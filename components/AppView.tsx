// Packages Imports
import { View, StyleProp, ViewStyle } from "react-native";

// types Imports
import { AppViewProps } from "../types/ComponentTypes";

// function component for AppView
function AppView(props: AppViewProps) {
  // Destructuring props
  const {
    style = {},
    children,
    flex = 1,
    flexDirection,
    justifyContent,
    alignItems,
    ...otherProps
  } = props;

  // Construct style
  const finalStyles: StyleProp<ViewStyle> = [
    {
      flex: flex,
      flexDirection,
      justifyContent,
      alignItems,
    },
    style,
  ];

  // render
  return (
    <View style={finalStyles} {...otherProps}>
      {children}
    </View>
  );
}

// exports
export default AppView;
