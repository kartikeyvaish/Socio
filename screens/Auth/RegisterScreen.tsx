// Packages Imports (from node_modules)
import { StyleSheet, ScrollView } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../../components/Animated/AnimatedView";
import AppContainer from "../../components/App/AppContainer";
import AppForm from "../../components/Forms/AppForm";
import AppFormTextField from "../../components/Forms/AppFormTextField";
import AppFormPasswordField from "../../components/Forms/AppFormPasswordField";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";
import BackButtonHeader from "../../components/Headers/BackButtonHeader";
import RegisterFormValidation from "../../validations/RegisterFormValidation";

// interface for RegisterScreen component
export interface RegisterScreenProps {}

// functional component for RegisterScreen
function RegisterScreen(props: RegisterScreenProps) {
  // Destructuring props
  const {} = props;

  const register = async (values: typeof RegisterFormValidation.initialValues) => {
    try {
    } catch (error) {}
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView>
        <BackButtonHeader title='Create Account' />

        <AppForm
          initialValues={RegisterFormValidation.initialValues}
          validationSchema={RegisterFormValidation.validationSchema}
          onSubmit={register}
        >
          <AnimatedView style={styles.formComponent}>
            <AppFormTextField
              placeholder='First Name'
              title='first_name'
              containerStyles={{ marginBottom: 15 }}
            />

            <AppFormTextField
              placeholder='Last Name'
              title='last_name'
              containerStyles={{ marginBottom: 15 }}
            />

            <AppFormTextField
              placeholder='Username'
              title='username'
              containerStyles={{ marginBottom: 15 }}
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

            <AppFormSubmitButton title='Register' margins={{ top: 20 }} />
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
