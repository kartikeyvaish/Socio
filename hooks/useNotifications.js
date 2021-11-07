import PushNotification from "react-native-push-notification";

// largeIconUrl = Icon for topmost image url without expansion
// bigLargeIconUrl = Icon for image when expanded icon logo
// bigPictureUrl = expanded picture here

export const LocalNotification = (props) => {
  const {
    autoCancel = true,
    bigText = "",
    subText = "",
    title = "",
    body = "",
    message = "",
    vibrate = true,
    vibration = 300,
    largeIconUrl,
    bigLargeIconUrl,
    bigPictureUrl,
    playSound = true,
    actions = "",
    channelId = "SocioDefault",
  } = props;
  if (body !== "" || message !== "") {
    PushNotification.localNotification({
      autoCancel: autoCancel,
      bigText: bigText,
      subText: subText,
      title: title,
      message: body || message,
      vibrate: vibrate,
      vibration: vibration,
      largeIconUrl: largeIconUrl,
      bigLargeIconUrl: bigLargeIconUrl,
      bigPictureUrl: bigPictureUrl,
      playSound: playSound,
      actions: actions,
      channelId: channelId,
      importance: "high",
      visibility: "public",
    });
  }
};
