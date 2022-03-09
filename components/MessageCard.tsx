// Packages Imports
import { useContext } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

// Local Imports
import GlobalContext from "../context/GlobalContext";
import { MessageCardProps } from "../types/ComponentTypes";
import RecievedMessageCard from "./RecievedMessageCard";
import SendMessageCard from "./SendMessageCard";

// function component for MessageCard
function MessageCard(props: MessageCardProps) {
  // Destructuring props
  const { gestureHandler, animatedStyle, ...otherProps } = props;

  // Get the user
  const { User } = useContext(GlobalContext);

  // render
  return (
    <PanGestureHandler onGestureEvent={gestureHandler} activeOffsetX={[-30, 30]}>
      <Animated.View style={[animatedStyle]}>
        {User._id === otherProps.sender_id ? (
          <SendMessageCard {...otherProps} />
        ) : (
          <RecievedMessageCard {...otherProps} />
        )}
      </Animated.View>
    </PanGestureHandler>
  );
}

// exports
export default MessageCard;
