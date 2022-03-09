// Packages Imports
import { View } from "react-native";

// Local Imports
import AppImage from "./AppImage";
import AppText from "./AppText";
import FontNames from "../constants/FontNames";

// interface for ChatRoomHeader
export interface ChatRoomHeaderProps {
  profile_picture?: string;
  username?: string;
}

// function component for ChatRoomHeader
function ChatRoomHeader(props: ChatRoomHeaderProps) {
  // Destructuring props
  const { profile_picture, username } = props;

  // render
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <AppImage uri={profile_picture} size={35} borderRadius={35} />
      <AppText text={username} size={18} family={FontNames.InterBold} marginLeft={15} />
    </View>
  );
}

// exports
export default ChatRoomHeader;
