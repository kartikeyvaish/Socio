// Packages Imports
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// component imports
import AppButton from "../../components/AppButton";
import AppText from "../../components/AppText";
import AppView from "../../components/AppView";
import { AuthScreenProps } from "../../navigation/NavigationProps";
import ColorPallete from "../../constants/ColorPallete";
import env from "../../config/env";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import JWT from "../../auth/JWT";
import SecureStore from "../../auth/SecureStore";
import ScreenNames from "../../navigation/ScreenNames";
import ToastMessages from "../../constants/Messages";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import useLoading from "../../hooks/useLoading";

// Configuring the google signin
GoogleSignin.configure({ webClientId: env.googleApiClientID });

// function component for IntroductionScreen
function IntroductionScreen(props: AuthScreenProps<"IntroductionScreen"> & { PushToken?: string }) {
  // Destructuring props
  const { navigation, PushToken } = props;
  const { GoogleLogin } = useAuthEndpoints();

  // Custom hooks and context
  const { Loading, SetLoading } = useLoading();
  const { SetUser } = useContext(GlobalContext);

  // Login function using Google
  const LoginWithGoogle = async () => {
    try {
      SetLoading(true);

      await GoogleSignin.signOut();
      const response = await GoogleSignin.signIn();

      const idToken = response?.idToken;

      let payload: any = {
        id_token: idToken,
      };

      if (PushToken) payload.push_notification_token = PushToken;

      const { data: apiResponse } = await GoogleLogin(payload);

      SetLoading(false);

      if (apiResponse.isLoggedIn === false && apiResponse.partial_login) {
        // Navigate to other Screen
        navigation.navigate(ScreenNames.SignUpScreen, {
          ...apiResponse.user_details,
          profile_picture: {
            uri: apiResponse.user_details.profile_picture,
            isRemoteImage: true,
          },
        });
      } else if (apiResponse.isLoggedIn) {
        const decodedData: any = JWT.decodeToken(apiResponse.user_token);

        SecureStore.SetItem("access_token", decodedData.access_token);
        SecureStore.SetItem("refresh_token", decodedData.refresh_token);

        if (decodedData.access_token) delete decodedData.access_token;
        if (decodedData.refresh_token) delete decodedData.refresh_token;

        if (decodedData) SetUser(decodedData);
        else Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      } else {
        Helper.ShowToast(apiResponse.message);
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  // render
  return (
    <View style={styles.container}>
      <View style={{}}>
        <AppText text={env.application_name} family={FontNames.BerkshireSwash} size={50} />
        <AppText
          text={env.application_tag_line}
          marginTop={10}
          size={18}
          family={FontNames.PoppinsLight}
        />
      </View>

      <AppView justifyContent="flex-end">
        <AppButton
          title="Login"
          roundness={100}
          color={ColorPallete.white}
          marginBottom={20}
          onPress={() => navigation.navigate(ScreenNames.LoginScreen)}
        />
        <AppButton
          title="Sign Up"
          roundness={100}
          backgroundColor={ColorPallete.orange}
          marginBottom={20}
          color={ColorPallete.white}
          onPress={() => navigation.navigate(ScreenNames.EmailSignUpScreen)}
        />
      </AppView>

      <View>
        <AppText
          text="OR"
          style={{ textAlign: "center" }}
          marginBottom={20}
          family={FontNames.InterBold}
        />

        <AppButton
          title="Continue with Google"
          roundness={100}
          mode="outlined"
          loading={Loading}
          onPress={LoginWithGoogle}
          marginBottom={20}
          elevation={0}
          color={ColorPallete.primary}
          style={{ borderWidth: 1 }}
        />
      </View>
    </View>
  );
}

// Map State to Props
const mapStateToProps = (state: any) => {
  return {
    PushToken: state.AuthState.PushToken,
  };
};

// Connect and Export
export default connect(mapStateToProps)(IntroductionScreen);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
