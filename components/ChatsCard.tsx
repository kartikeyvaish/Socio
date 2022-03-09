// Packages Imports
import { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Animated as ANIMATED } from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AppIcon from "./AppIcon";
import AppImage from "./AppImage";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import { ChatsCardProps } from "../types/ComponentTypes";
import FontNames from "../constants/FontNames";
import GlobalContext from "../context/GlobalContext";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";

// function component for ChatsCard
function ChatsCard(props: ChatsCardProps) {
  // Destructuring props
  const {
    chatting_with,
    last_message,
    updated_at,
    onPress,
    onSwipeableClose,
    onSwipeableOpen,
    currentSelected,
    _id,
    onDeletePress,
  } = props;

  const { dark } = useTheme();
  const swipeableRowref = useRef<Swipeable>();
  const { User } = useContext(GlobalContext);

  useEffect(() => {
    if (currentSelected !== _id) if (swipeableRowref.current) swipeableRowref.current.close();
  }, [currentSelected]);

  // Font Family to use to display text
  const family =
    last_message?.sender_id === User?._id
      ? FontNames.InterRegular
      : last_message?.read === true
      ? FontNames.InterRegular
      : FontNames.InterBold;

  // Decide the last message to be shown
  const lastMessage =
    last_message === null
      ? "Tap to send a message"
      : last_message.message_type == "text"
      ? last_message.message
      : last_message.sender_id === User._id
      ? `You sent a ${last_message.message_type}`
      : `Sent you a ${last_message.message_type}`;

  const renderRightActions = (progressAnimatedValue: ANIMATED.AnimatedInterpolation) => {
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 0],
    });

    const opacity = progressAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const containerStyle: any = {
      width: 80,
      height: 80,
      backgroundColor: ColorPallete.danger,
    };

    return (
      <ANIMATED.View style={[containerStyle, { transform: [{ translateX: trans }] }]}>
        <ANIMATED.View style={{ opacity: opacity }}>
          <TouchableRipple onPress={onDeletePress} style={styles.rippleContainer}>
            <AppIcon
              family={IconNames.AntDesign}
              name="delete"
              marginTop={-10}
              size={24}
              color={ColorPallete.white}
            />
          </TouchableRipple>
        </ANIMATED.View>
      </ANIMATED.View>
    );
  };

  // render
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={Layout} style={styles.container}>
      <Swipeable
        ref={swipeableRowref}
        renderRightActions={renderRightActions}
        useNativeAnimations={true}
        overshootFriction={9}
        onSwipeableClose={onSwipeableClose}
        onSwipeableOpen={onSwipeableOpen}
      >
        <RectButton
          onPress={onPress}
          style={styles.rectButton}
          rippleColor={dark ? ColorPallete.grey : undefined}
        >
          <View style={{ padding: 10 }}>
            <AppImage uri={chatting_with.profile_picture} size={50} borderRadius={50} />
          </View>

          <View style={{ flex: 1, paddingRight: 20, paddingLeft: 10 }}>
            <AppText text={chatting_with.name} size={18} family={family} numberOfLines={1} />
            <AppText text={lastMessage} size={15} family={family} numberOfLines={1} />
          </View>

          <View style={{ marginRight: 10 }}>
            <AppText text={Helper.get_time_ago(updated_at)} family={family} />
          </View>
        </RectButton>
      </Swipeable>
    </Animated.View>
  );
}

// exports
export default ChatsCard;

// styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  rectButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  rippleContainer: { width: 80, height: 80, justifyContent: "center", alignItems: "center" },
  leftAction: {
    flex: 1,
    backgroundColor: "#388e3c",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  },
});
