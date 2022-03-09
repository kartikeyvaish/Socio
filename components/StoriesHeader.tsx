// Packages Imports
import { View, StyleSheet, Pressable } from "react-native";

// Local Imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import { StoriesHeaderProps } from "../store/stories/types";

// function component for StoriesHeader
function StoriesHeader(props: StoriesHeaderProps) {
  // Destructuring props
  const { _id, profile_picture, username, datetime, onNamePress, onIconPress, showIcon } = props;

  // render
  return (
    <View style={styles.container}>
      <Pressable onPress={onNamePress}>
        <AppImage uri={profile_picture} size={35} borderRadius={35} />
      </Pressable>

      <View>
        <AppText
          text={username}
          marginLeft={20}
          family={FontNames.InterBold}
          color={ColorPallete.white}
          size={18}
          onPress={onNamePress}
        />
        <AppText
          text={Helper.get_time_ago(datetime)}
          marginLeft={20}
          color={ColorPallete.white}
          size={14}
          onPress={onNamePress}
        />
      </View>

      {showIcon ? (
        <View style={styles.menuContainer}>
          <AppIcon
            family={IconNames.Entypo}
            name="dots-three-vertical"
            size={25}
            color={ColorPallete.white}
            onPress={showIcon ? onIconPress : null}
          />
        </View>
      ) : null}
    </View>
  );
}

// exports
export default StoriesHeader;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menuContainer: {
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  },
});
