// Packages Imports (from node_modules)
import { useRef, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../../components/Animated/AnimatedView";
import AppContainer from "../../components/App/AppContainer";
import AppForm from "../../components/Forms/AppForm";
import AppFormTextField from "../../components/Forms/AppFormTextField";
import AppFormPasswordField from "../../components/Forms/AppFormPasswordField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import ErrorText from "../../components/Text/ErrorText";
import Messages from "../../constants/Messages";
import RegisterFormValidation from "../../validations/RegisterFormValidation";
import useLogin from "../../hooks/useLogin";

// Named Imports
import { AuthScreenProps } from "../../navigation/NavigationTypes";
import { registerAPI } from "../../api/services/Auth";

// functional component for RegisterScreen
function RegisterScreen(props: AuthScreenProps<"RegisterScreen">) {
  // Destructuring props
  const { route } = props;
  const { email, first_name, last_name, username } = route.params;

  // Local States
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { saveLoginDetails } = useLogin()
  
  // Refs
  const prefillValues = useRef({
    ...RegisterFormValidation.initialValues,
    email,
    first_name: first_name || "",
    last_name: last_name || "",
    username: username || "",
  });

  const register = async (values: typeof RegisterFormValidation.initialValues) => {
    try {
      setLoading(true);
      const apiResponse = await registerAPI({ ...route.params, ...values });
      setLoading(false);

      if (apiResponse.ok === true) {
        saveLoginDetails(apiResponse.data)
      } else if (apiResponse.ok === false) {
        setFormError(apiResponse.data.errors.base);
      }
    } catch (error) {
      setFormError(Messages.serverErrorMessage);
      setLoading(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView>
        <AppForm
          initialValues={prefillValues.current}
          validationSchema={RegisterFormValidation.validationSchema}
          onSubmit={register}
        >
          <ErrorText error={formError} size={15} style={{ marginTop: 20, textAlign: "center" }} />

          <AnimatedView style={styles.formComponent}>
            <AppFormTextField
              placeholder='First Name'
              title='first_name'
              containerStyles={{ marginBottom: 15 }}
              controlled={true}
            />

            <AppFormTextField
              placeholder='Last Name'
              title='last_name'
              containerStyles={{ marginBottom: 15 }}
              controlled={true}
            />

            <AppFormTextField
              placeholder='Username'
              title='username'
              containerStyles={{ marginBottom: 15 }}
              clearCustomError={() => setFormError("")}
              controlled={true}
            />

            <AppFormPasswordField
              placeholder='Password'
              title='password'
              containerStyles={{ marginBottom: 15 }}
            />

            <AppFormPasswordField
              placeholder='Confirm Password'
              title='confirm_password'
              containerStyles={{ marginBottom: 15 }}
            />

            <AppFormSubmitButton title='Register' margins={{ top: 20 }} loading={loading} />
          </AnimatedView>
        </AppForm>
      </ScrollView>
    </AppContainer>
  );
}

// exports
export default RegisterScreen;

// styles for RegisterScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  formComponent: {
    marginTop: 25,
  },
});
