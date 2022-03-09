// Packages Imports
import { View } from "react-native";

// Local Imports
import RecordedPlayer from "./RecordedPlayer";

// interface for MessageAudioCard
export interface MessageAudioCardProps {
  uri?: string;
  maxWidth?: number;
}

// function component for MessageAudioCard
function MessageAudioCard(props: MessageAudioCardProps) {
  // Destructuring props
  const { uri, maxWidth } = props;

  // render
  return (
    <View style={{ width: maxWidth - 50, height: 40 }}>
      <RecordedPlayer uri={uri} maxWidth={maxWidth - 50} />
    </View>
  );
}

// exports
export default MessageAudioCard;
