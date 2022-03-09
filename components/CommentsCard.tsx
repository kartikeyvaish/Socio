// Packages Imports
import { View, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInLeft, FadeOutLeft, Layout } from "react-native-reanimated";

// Local Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import ColorPallete from "../constants/ColorPallete";
import Helper from "../utils/Helper";

// interface for CommentsCard
export interface CommentsCardProps {
  profile_picture?: string;
  username?: string;
  comment?: string;
  showBorderBottom?: boolean;
  comment_datetime?: string;
  onDeletePress?: () => void;
  showDelete?: boolean;
  onNamePress?: () => void;
  disabled?: boolean;
}

// function component for CommentsCard
function CommentsCard(props: CommentsCardProps) {
  // Destructuring props
  const {
    profile_picture,
    username,
    comment,
    showBorderBottom = false,
    comment_datetime,
    onDeletePress,
    showDelete,
    onNamePress,
    disabled = false,
  } = props;

  // final Container Styles
  const finalContainerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      borderBottomWidth: showBorderBottom ? 1 - StyleSheet.hairlineWidth : 0,
      opacity: disabled ? 0.5 : 1,
    },
  ];

  // render
  return (
    <Animated.View entering={FadeInLeft} exiting={FadeOutLeft} layout={Layout}>
      <View style={finalContainerStyle}>
        <AppImage uri={profile_picture} size={45} borderRadius={30} />

        <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
          <AppText
            text={username}
            family={FontNames.InterBold}
            size={15}
            onPress={disabled ? null : onNamePress}
          />

          <AppText text={comment} family={FontNames.PoppinsRegular} size={13} />

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
            <AppText
              text={Helper.get_time_ago(comment_datetime)}
              family={FontNames.InterRegular}
              size={11}
            />

            {showDelete ? (
              <AppText
                text={"Delete"}
                family={FontNames.InterBold}
                size={13}
                marginLeft={50}
                onPress={disabled ? null : onDeletePress}
                color={ColorPallete.danger}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

// exports
export default CommentsCard;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 1 - StyleSheet.hairlineWidth,
  },
});
