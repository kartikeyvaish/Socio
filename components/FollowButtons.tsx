// Packages Imports
import { View, StyleSheet } from "react-native";

// Local Imports
import ColorPallete from "../constants/ColorPallete";
import { FollowButtonsProps } from "../types/ComponentTypes";
import TextButton from "./TextButton";

// function component for FollowButtons
function FollowButtons(props: FollowButtonsProps) {
  // Destructuring props
  const {
    you_follow_user,
    user_follows_you,
    you_sent_request,
    user_sent_request,
    onAcceptPress,
    onFollowPress,
    onRejectPress,
    onUnFollowPress,
    onMessagePress,
  } = props;

  // Get cases
  const buttonsCase = you_sent_request
    ? 1
    : user_sent_request
    ? 2
    : user_follows_you && you_follow_user
    ? 3
    : user_follows_you && !you_follow_user
    ? 4
    : !user_follows_you && you_follow_user
    ? 3
    : !user_follows_you && !you_follow_user
    ? 5
    : 0;

  // Get buttons according to the case
  const getButtons = () => {
    switch (buttonsCase) {
      case 1:
        return (
          <>
            <TextButton text="Requested" />
            <TextButton
              text="Unsend"
              onPress={onRejectPress}
              backgroundColor={ColorPallete.danger}
              color={ColorPallete.white}
            />
          </>
        );

      case 2:
        return (
          <>
            <TextButton
              text="Accept"
              backgroundColor={ColorPallete.primary}
              color={ColorPallete.white}
              onPress={onAcceptPress}
            />
            <TextButton
              text="Delete"
              backgroundColor={ColorPallete.danger}
              color={ColorPallete.white}
              onPress={onRejectPress}
            />
          </>
        );

      case 3:
        return (
          <>
            <TextButton text="Following" onPress={onUnFollowPress} />
            <TextButton text="Message" onPress={onMessagePress} />
          </>
        );

      case 4:
        return (
          <TextButton
            text="Follow Back"
            backgroundColor={ColorPallete.primary}
            color={ColorPallete.white}
            onPress={onFollowPress}
          />
        );

      case 5:
        return (
          <TextButton
            text="Follow"
            backgroundColor={ColorPallete.primary}
            color={ColorPallete.white}
            onPress={onFollowPress}
          />
        );

      default:
        return null;
    }
  };

  // render
  return <View style={styles.container}>{getButtons()}</View>;
}

// exports
export default FollowButtons;

// styles
const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 10 },
});
