// Packages Imports
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";

// Local Imports
import AlertDialog from "../../components/AlertDialog";
import AppContainer from "../../components/AppContainer";
import AppLoading from "../../components/AppLoading";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AuthActionCreators from "../../store/auth/actions";
import BackDrop from "../../components/BackDrop";
import ColorPallete from "../../constants/ColorPallete";
import MenuCard from "../../components/MenuCard";
import SecureStore from "../../auth/SecureStore";
import ScreenNames from "../../navigation/ScreenNames";
import IconNames from "../../constants/IconNames";
import useAppEndpoints from "../../api/useAppEndpoints";

// function component for SettingsScreen
function SettingsScreen(props: AppScreenProps<"SettingScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Redux Dispatcher
  const dispatch = useDispatch();

  // Local States
  const [LogoutConfirmVisible, SetLogoutConfirmVisible] = useState(false);
  const [LogoutLoading, SetLogoutLoading] = useState(false);

  // APIs
  const { Logout } = useAppEndpoints();

  // Login API call
  const LogoutAPI = async () => {
    try {
      SetLogoutLoading(true);
      await Logout();
      SetLogoutLoading(false);

      dispatch(AuthActionCreators.Logout());
      SecureStore.RemoveItem("access_token");
      SecureStore.RemoveItem("refresh_token");
    } catch (error) {
      SetLogoutLoading(false);
    }
  };

  // render
  return (
    <AppContainer>
      <ScrollView>
        <MenuCard
          text="Appearance"
          onPress={() => navigation.navigate(ScreenNames.AppearanceScreen)}
          icon={{ family: IconNames.Ionicons, name: "color-palette" }}
        />

        <MenuCard
          text="Security"
          icon={{ family: IconNames.MaterialCommunityIcons, name: "security" }}
          onPress={() => navigation.navigate(ScreenNames.SecurityScreen)}
        />

        <MenuCard
          text="My Account"
          icon={{ family: IconNames.MaterialIcons, name: "account-box" }}
          onPress={() => navigation.navigate(ScreenNames.AccountScreen)}
        />

        <MenuCard
          text="Notifications"
          icon={{ family: IconNames.Feather, name: "bell" }}
          onPress={() => navigation.navigate(ScreenNames.PushNotificationsScreen)}
        />

        <MenuCard
          text="About"
          icon={{ family: IconNames.Feather, name: "info" }}
          onPress={() => navigation.navigate(ScreenNames.AboutScreen)}
        />

        <MenuCard
          text="Logout"
          color={ColorPallete.danger}
          onPress={() => SetLogoutConfirmVisible(true)}
          icon={{ family: IconNames.AntDesign, name: "logout", size: 28 }}
        />
      </ScrollView>

      <BackDrop
        onBackDropPress={() => SetLogoutConfirmVisible(false)}
        visible={LogoutConfirmVisible}
      >
        <AlertDialog
          dialogTitle="Logout"
          subTitle="Are you sure you want to logout?"
          firstButtonText="Yes"
          secondButtonText="No"
          firstButtonOnPress={LogoutAPI}
          secondButtonOnPress={() => SetLogoutConfirmVisible(false)}
        />
      </BackDrop>

      <AppLoading loadingText="Logging Out.." visible={LogoutLoading} />
    </AppContainer>
  );
}

// exports
export default SettingsScreen;

// styles
const styles = StyleSheet.create({
  container: {},
});
