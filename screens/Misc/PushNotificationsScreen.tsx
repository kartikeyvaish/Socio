// Packages Imports
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

// Local Imports
import AppContainer from "../../components/AppContainer";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AuthActionCreators from "../../store/auth/actions";
import ColorPallete from "../../constants/ColorPallete";
import GlobalContext from "../../context/GlobalContext";
import MenuSwitch from "../../components/MenuSwitch";
import Helper from "../../utils/Helper";
import ToastMessages from "../../constants/Messages";
import useAppEndpoints from "../../api/useAppEndpoints";
import useLoading from "../../hooks/useLoading";

// function component for PushNotificationsScreen
function PushNotificationsScreen(props: AppScreenProps<"SecurityScreen">) {
  // Get the user
  const { User, showSnack } = useContext(GlobalContext);

  // Local States
  const [AllowPush, SetAllowPush] = useState(User.allow_push_notification);
  const { SetLoading, Loading } = useLoading();
  const { TogglePushNotification } = useAppEndpoints();

  const dispatch = useDispatch();

  const TogglePush = async () => {
    try {
      SetLoading(true);

      const apiResponse = await TogglePushNotification();
      if (apiResponse.ok && apiResponse !== null) {
        dispatch(
          AuthActionCreators.UpdateUser({
            allow_push_notification: apiResponse.data.current_status,
          })
        );
        showSnack({ message: apiResponse.data.message, color: ColorPallete.success });
        SetAllowPush(apiResponse.data.current_status);
      } else Helper.ShowToast(apiResponse.data.message);

      SetLoading(false);
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <MenuSwitch
        title="Push Notifications"
        onPress={TogglePush}
        value={AllowPush}
        loading={Loading}
      />
    </AppContainer>
  );
}

// exports
export default PushNotificationsScreen;

// styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
