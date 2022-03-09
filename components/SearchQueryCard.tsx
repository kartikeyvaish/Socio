// Packages Imports
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import Animated, { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// Local Imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";
import { SearchQueryCardProps } from "../types/ComponentTypes";

// function component for SearchQueryCard
function SearchQueryCard(props: SearchQueryCardProps) {
  // Destructuring props
  const { profile_picture, name, username, onPress, onRemovePress, removeVisible } = props;

  // render
  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft} layout={Layout}>
      <TouchableRipple style={styles.container} onPress={onPress}>
        <>
          <AppImage uri={profile_picture} style={{ width: 40, height: 40, borderRadius: 40 }} />

          <View style={{ flex: 1, marginLeft: 15 }}>
            <AppText text={name} family={FontNames.InterBold} />
            <AppText text={username} family={FontNames.PoppinsLight} />
          </View>

          {removeVisible ? (
            <TouchableRipple onPress={onRemovePress} style={styles.crossIcon}>
              <AppIcon family={IconNames.Entypo} name="cross" size={20} />
            </TouchableRipple>
          ) : null}
        </>
      </TouchableRipple>
    </Animated.View>
  );
}

// exports
export default SearchQueryCard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingLeft: 20,
  },
  crossIcon: {
    height: "100%",
    alignItems: "center",
    padding: 15,
  },
});
