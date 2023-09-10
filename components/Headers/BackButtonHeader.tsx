// Packages Imports (from node_modules)
import { memo, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppIcon from "../App/AppIcon";
import AppText from "../App/AppText";
import BackgroundColorContext from "../../contexts/BackgroundColorContext";
import ColorPallete from "../../constants/ColorPallete";

// interface for BackButtonHeader component
export interface BackButtonHeaderProps {
  onBackPress?: () => void;
  title?: string;
}

// functional component for BackButtonHeader
function BackButtonHeader(props: BackButtonHeaderProps) {
  // Destructuring props
  const { onBackPress, title } = props;

  // animated styles
  const { animatedStyles } = useContext(BackgroundColorContext);

  // render
  return (
    <AnimatedView style={animatedStyles}>
      <View style={styles.container}>
        <Pressable onPress={onBackPress} style={styles.iconContainer}>
          <AppIcon
            family={"Entypo"}
            name='chevron-thin-left'
            size={24}
            color={ColorPallete.primary}
          />
        </Pressable>

        <View style={{ flex: 1 }}>
          <AppText numberOfLines={1} text={title} size={20} margins={{ left: 20 }} />
        </View>
      </View>
    </AnimatedView>
  );
}

// exports
export default memo(BackButtonHeader);

// styles for BackButtonHeader
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  iconContainer: {},
});
