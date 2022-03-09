// Packages Imports
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AppIcon from "./AppIcon";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";
import FontNames from "../constants/FontNames";
import Helper from "../utils/Helper";
import IconNames from "../constants/IconNames";
import Layout from "../constants/Layout";
import MessageImageCard from "./MessageImageCard";
import { MessageCardProps } from "../types/ComponentTypes";
import Animated, { FadeIn, FadeOutRight, Layout as LT } from "react-native-reanimated";
import MessageAudioCard from "./MessageAudioCard";

const screenWidth = Layout.window.width;
const MAX_CARD_WIDTH = screenWidth * 0.75;

// function component for SendMessageCard
function SendMessageCard(props: MessageCardProps) {
  // Destructuring props
  const {
    message,
    message_type,
    message_datetime,
    message_file,
    upper_date,
    thumbnail_image,
    onVideoMessagePress,
    onImageMessagePress,
    showRead,
    read,
    delieverd,
  } = props;

  const { dark } = useTheme();

  // message color styles
  const messageCardStyle = {
    backgroundColor: dark ? ColorPallete.lightBlack : ColorPallete.lightGrey,
  };

  // render
  return (
    <Animated.View layout={LT} style={{ marginBottom: 5 }}>
      {upper_date ? (
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <AppText text={upper_date} size={12} family={FontNames.InterRegular} />
        </View>
      ) : null}

      <View style={{ width: "100%", flexDirection: "row-reverse", minHeight: 30 }}>
        {delieverd ? (
          <View style={styles.timeStampCard}>
            <AppIcon family={IconNames.EvilIcons} name="arrow-right" size={22} marginRight={5} />
            <AppText text={Helper.get_formatted_time(message_datetime)} size={12} />
          </View>
        ) : null}

        {delieverd !== undefined && delieverd === false ? (
          <Animated.View
            exiting={FadeOutRight}
            layout={LT}
            style={{ alignSelf: "flex-end", marginRight: 10, marginLeft: 5 }}
          >
            <AppIcon
              size={15}
              family={IconNames.FontAwesome}
              name="send"
              color={ColorPallete.grey}
            />
          </Animated.View>
        ) : null}

        <Animated.View layout={LT} style={[styles.messageCard, messageCardStyle]}>
          {message_type === "video" || message_type === "image" ? (
            <MessageImageCard
              onMessagePress={message_type === "video" ? onVideoMessagePress : onImageMessagePress}
              showIcon={message_type === "video"}
              uri={message_type === "image" ? message_file?.uri : thumbnail_image.uri}
              maxWidth={MAX_CARD_WIDTH}
            />
          ) : message_type === "audio" ? (
            <MessageAudioCard uri={message_file?.uri} maxWidth={MAX_CARD_WIDTH} />
          ) : null}

          <AppText size={15} family={FontNames.InterRegular} text={message} />
        </Animated.View>
      </View>

      {showRead ? (
        <Animated.View entering={FadeIn} layout={LT} style={{ alignSelf: "flex-end" }}>
          <AppText
            text={read ? "seen" : undefined}
            marginRight={15}
            size={15}
            color={ColorPallete.grey}
            family={FontNames.InterRegular}
            marginTop={5}
          />
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

// exports
export default SendMessageCard;

// styles
const styles = StyleSheet.create({
  timeStampCard: {
    height: "90%",
    width: 90,
    alignSelf: "center",
    position: "absolute",
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    transform: [{ translateX: 100 }],
  },
  messageCard: {
    padding: 10,
    marginRight: 8,
    borderRadius: 12,
    maxWidth: MAX_CARD_WIDTH,
  },
});
