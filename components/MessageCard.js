import React from "react";
import RecievedMessage from "./RecievedMessage";
import SendMessage from "./SendMessage";

function MessageCard({
  OwnerID,
  user_id,
  onMessagePress,
  topDate,
  props = {},
}) {
  return user_id === OwnerID ? (
    <SendMessage onMessagePress={onMessagePress} topDate={topDate} {...props} />
  ) : (
    <RecievedMessage
      onMessagePress={onMessagePress}
      topDate={topDate}
      {...props}
    />
  );
}

export default MessageCard;
