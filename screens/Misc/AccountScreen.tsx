// Packages Imports
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AuthActionCreators from "../../store/auth/actions";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import MenuSwitch from "../../components/MenuSwitch";
import ToastMessages from "../../constants/Messages";
import useAppEndpoints from "../../api/useAppEndpoints";
import useLoading from "../../hooks/useLoading";

// function component for AccountScreen
function AccountScreen(props) {
  // Get the user
  const { User } = useContext(GlobalContext);

  // Local States
  const [PrivateProfile, SetPrivateProfile] = useState(User.private_profile);
  const { SetLoading, Loading } = useLoading();
  const { TogglePrivate } = useAppEndpoints();

  // Dispatcher
  const dispatch = useDispatch();

  // call the toggle private profile api
  const PrivateProfileAPI = async () => {
    try {
      SetLoading(true);

      const apiResponse = await TogglePrivate();
      if (apiResponse.ok && apiResponse !== null) {
        dispatch(
          AuthActionCreators.UpdateUser({
            private_profile: apiResponse.data.current_status,
          })
        );

        SetPrivateProfile(apiResponse.data.current_status);
      }

      Helper.ShowToast(apiResponse.data.message);

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
        title="Private Profile"
        onPress={PrivateProfileAPI}
        value={PrivateProfile}
        loading={Loading}
      />
    </AppContainer>
  );
}

// exports
export default AccountScreen;

// styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
