// Packages Imports (from node_modules)
import { useEffect, useState } from "react";
import { LayoutChangeEvent, ScrollView, StyleSheet } from "react-native";
import { FadeIn, Layout } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

// Local Imports (components/types/utils)
import AnimatedText from "../../components/Animated/AnimatedText";
import AnimatedView from "../../components/Animated/AnimatedView";
import AppContainer from "../../components/App/AppContainer";
import AppForm from "../../components/Forms/AppForm";
import AppFormTextField from "../../components/Forms/AppFormTextField";
import AppFormPasswordField from "../../components/Forms/AppFormPasswordField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import AppText from "../../components/App/AppText";
import ColorPallete from "../../constants/ColorPallete";
import ErrorText from "../../components/Text/ErrorText";
import LoginFormValidations from "../../validations/LoginFormValidations";
import Messages from "../../constants/Messages";

// Named Imports
import { AuthScreenProps } from "../../navigation/NavigationTypes";
import { DEVICE_HEIGHT } from "../../constants/DeviceConstants";
import { loginAPI } from "../../api/services/Auth";

// functional component for LoginScreen
function LoginScreen(props: AuthScreenProps<"LoginScreen">) {
  // Destructuring props
  const { navigation } = props;

  const { navigate } = navigation;

  const isFocused = useIsFocused();

  // Local States
  const [loginFormVisible, setLoginFormVisible] = useState<boolean>(false);
  const [initialHeight, setInitialHeight] = useState<number>(0);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isFocused) {
      setFormError(null);
    }
  }, []);

  // handlers
  const loginPressHandler = async (values?: typeof LoginFormValidations.initialValues) => {
    try {
      setFormError(null);

      if (!loginFormVisible) {
        setLoginFormVisible(true);
        return;
      }

      if (values === undefined) return;

      const { email, password } = values || {};

      if (!email || !password) return;

      setLoading(true);
      const apiResponse = await loginAPI(values);
      setLoading(false);

      if (apiResponse.ok === true) {
        navigate("VerifyLoginOTPScreen", { otp_id: apiResponse.data.otp_id.toString(), email });
      } else if (apiResponse.ok === false) {
        setFormError(apiResponse.data.errors.base);
      }
    } catch (error) {
      setFormError(Messages.serverErrorMessage);
      setLoading(false);
    }
  };

  const layoutHandler = (e: LayoutChangeEvent) => setInitialHeight(e.nativeEvent.layout.height);

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView>
        <AnimatedView
          style={[
            {
              marginTop: loginFormVisible ? 100 : (DEVICE_HEIGHT - initialHeight - 100) / 2,
            },
          ]}
          onLayout={layoutHandler}
        >
          <AnimatedText
            text='Socio'
            fontFamily='BerkshireSwash'
            size={60}
            style={styles.logoText}
          />

          <ErrorText error={formError} style={{ textAlign: "center" }} margins={{ top: 30 }} />

          <AppForm
            initialValues={LoginFormValidations.initialValues}
            validationSchema={LoginFormValidations.validationSchema}
            onSubmit={loginPressHandler}
            resetOnFocus={true}
            isFocused={isFocused}
          >
            {loginFormVisible ? (
              <AnimatedView style={styles.loginForm} entering={FadeIn.delay(200)}>
                <AppFormTextField
                  title='email'
                  placeholder='Email'
                  autoFocus={true}
                  keyboardType='email-address'
                  controlled={true}
                />

                <AppFormPasswordField
                  title='password'
                  placeholder='Password'
                  margins={{ top: 12 }}
                  controlled={true}
                />

                <AppText
                  size={12}
                  text='Forgot Password?'
                  color={ColorPallete.primary}
                  style={{ textAlign: "right" }}
                  margins={{ top: 15 }}
                  onPress={() => navigate("ForgotPasswordScreen")}
                />
              </AnimatedView>
            ) : null}

            <AppFormSubmitButton
              animatedViewProps={{ layout: Layout }}
              title='Log In'
              margins={{ top: 20 }}
              onPress={loginFormVisible ? undefined : loginPressHandler}
              disabled={loading}
            />
          </AppForm>

          <AnimatedText
            text={`Don't Have an account? `}
            style={{ textAlign: "center", marginTop: loginFormVisible ? 150 : 20 }}
          >
            <AnimatedText
              text='Sign Up'
              color={ColorPallete.primary}
              onPress={() => navigation.navigate("NewUserSignUpScreen")}
            />
          </AnimatedText>
        </AnimatedView>
      </ScrollView>
    </AppContainer>
  );
}

// exports
export default LoginScreen;

// styles for LoginScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  logoText: { textAlign: "center" },
  loginForm: {
    marginTop: 40,
    marginBottom: 0,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
