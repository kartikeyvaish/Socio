import { Alert } from "react-native";

function show({
  Title,
  Description,
  okLabel,
  okPress,
  cancelLabel,
  cancelPress,
  cancelable,
}) {
  Alert.alert(
    Title,
    Description,
    [
      {
        text: cancelLabel,
        onPress: cancelPress,
      },
      { text: okLabel, onPress: okPress },
    ],
    { cancelable: cancelable }
  );
}

export default {
  show,
};
