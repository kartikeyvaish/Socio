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
import RecordedPlayer from "./RecordedPlayer";
import MessageAudioCard from "./MessageAudioCard";

const screenWidth = Layout.window.width;
const MAX_CARD_WIDTH = screenWidth * 0.75;

// function component for RecievedMessageCard
function RecievedMessageCard(props: MessageCardProps) {
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
  } = props;

  const { dark } = useTheme();

  // render
  return (
    <View style={{ marginBottom: 10 }}>
      {upper_date ? (
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <AppText text={upper_date} size={12} family={FontNames.InterRegular} />
        </View>
      ) : null}

      <View style={styles.container}>
        <View style={styles.timeStampCard}>
          <AppIcon family={IconNames.EvilIcons} name="arrow-left" size={22} marginRight={5} />
          <AppText text={Helper.get_formatted_time(message_datetime)} size={12} />
        </View>

        <View
          style={[
            styles.messageCard,
            {
              borderColor: dark ? ColorPallete.lightBlack : ColorPallete.lightGrey,
            },
          ]}
        >
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
        </View>
      </View>
    </View>
  );
}

// exports
export default RecievedMessageCard;

// styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 30,
    flexDirection: "row",
  },
  timeStampCard: {
    height: "90%",
    width: 90,
    alignSelf: "center",
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 10,
    transform: [{ translateX: 100 }],
  },
  messageCard: {
    padding: 10,
    marginLeft: 8,
    borderRadius: 12,
    maxWidth: MAX_CARD_WIDTH,
    borderWidth: 1,
  },
});
