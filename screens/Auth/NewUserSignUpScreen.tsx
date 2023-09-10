// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AppContainer from "../../components/App/AppContainer";
import AppText from "../../components/App/AppText";
import AppForm from "../../components/Forms/AppForm";
import BackButtonHeader from "../../components/Headers/BackButtonHeader";
import NewUserFormValidation from "../../validations/NewUserFormValidation";
import AppFormTextField from "../../components/Forms/AppFormTextField";
import AppView from "../../components/App/AppView";
import AppFormSubmitButton from "../../components/Forms/AppFormSubmitButton";

// interface for NewUserSignUpScreen component
export interface NewUserSignUpScreenProps {}

// functional component for NewUserSignUpScreen
function NewUserSignUpScreen(props: NewUserSignUpScreenProps) {
  // Destructuring props
  const {} = props;

  const newUserSignUp = async (values: typeof NewUserFormValidation.initialValues) => {
    try {
    } catch (error) {}
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <BackButtonHeader title='Create Account' />

      <AppText
        text='Enter your email to create an account.'
        margins={{ top: 20, bottom: 20 }}
        size={16}
        style={{ textAlign: "center" }}
      />

      <AppForm
        initialValues={NewUserFormValidation.initialValues}
        validationSchema={NewUserFormValidation.validationSchema}
        onSubmit={newUserSignUp}
      >
        <AppFormTextField
          title='email'
          placeholder='Email'
          autoFocus={true}
          keyboardType='email-address'
        />

        <AppView style={{ justifyContent: "flex-end" }}>
          <AppFormSubmitButton title='Create Account' animatedViewProps={{ layout: undefined }} />
        </AppView>
      </AppForm>
    </AppContainer>
  );
}

// exports
export default NewUserSignUpScreen;

// styles for NewUserSignUpScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
});
