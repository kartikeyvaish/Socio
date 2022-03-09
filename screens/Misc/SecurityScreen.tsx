// Local Imports
import AppContainer from "../../components/AppContainer";
import { AppScreenProps } from "../../navigation/NavigationProps";
import IconNames from "../../constants/IconNames";
import MenuCard from "../../components/MenuCard";
import ScreenNames from "../../navigation/ScreenNames";

// function component for SecurityScreen
function SecurityScreen(props: AppScreenProps<"SecurityScreen">) {
  // Destructuring props
  const { navigation } = props;

  // render
  return (
    <AppContainer>
      <MenuCard
        text="Change Password"
        icon={{ family: IconNames.MaterialCommunityIcons, name: "form-textbox-password" }}
        onPress={() => navigation.navigate(ScreenNames.ChangePasswordScreen)}
      />
      {/* <MenuCard
        text="2-Factor Authentication"
        icon={{ family: IconNames.MaterialCommunityIcons, name: "two-factor-authentication" }}
      /> */}
    </AppContainer>
  );
}

// exports
export default SecurityScreen;
