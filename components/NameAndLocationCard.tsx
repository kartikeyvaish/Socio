// Packages Imports
import { View, StyleSheet } from "react-native";

// Component/Types imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import IconNames from "../constants/IconNames";
import { NameAndLocationProps } from "../types/ComponentTypes";
import { useTheme } from "@react-navigation/native";
import ColorPallete from "../constants/ColorPallete";

// function component for NameAndLocationCard
function NameAndLocationCard(props: NameAndLocationProps) {
  // Destructuring props
  const {
    name,
    location,
    profile_picture,
    onLocationPress,
    onNamePress,
    showMenuIcon = false,
    onMenuIconPress,
  } = props;

  const { dark } = useTheme();

  // render
  return (
    <View
      style={[
        styles.container,
        { borderColor: dark ? ColorPallete.lightBlack : ColorPallete.lightGrey },
      ]}
    >
      {profile_picture ? (
        <View style={styles.innerContainer}>
          <AppImage uri={profile_picture} style={styles.image} onPress={onNamePress} />
        </View>
      ) : null}

      <View style={styles.innerContainer}>
        {name ? (
          <AppText text={name} family={FontNames.InterBold} size={15} onPress={onNamePress} />
        ) : null}

        {location ? (
          <AppText
            text={location}
            family={FontNames.PoppinsLight}
            size={13}
            onPress={onLocationPress}
          />
        ) : null}
      </View>

      {showMenuIcon ? (
        <View style={styles.menuIcon}>
          <AppIcon
            name="dots-three-vertical"
            family={IconNames.Entypo}
            size={20}
            onPress={onMenuIconPress}
          />
        </View>
      ) : null}
    </View>
  );
}

// exports
export default NameAndLocationCard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
  },
  image: { width: 30, height: 30, borderRadius: 30 },
  innerContainer: { marginLeft: 20 },
  menuIcon: {
    flex: 1,
    flexDirection: "row-reverse",
    height: "100%",
    alignItems: "center",
    paddingLeft: 15,
  },
});
