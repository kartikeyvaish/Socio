// Packages Imports
import { useContext } from "react";
import { Keyboard, StyleSheet } from "react-native";
import useAppEndpoints from "../../api/useAppEndpoints";
import AppContainer from "../../components/AppContainer";
import AppForm from "../../components/AppForm";
import AppFormPasswordField from "../../components/AppFormPasswordField";
import AppSubmitButton from "../../components/AppSubmitButton";
import ColorPallete from "../../constants/ColorPallete";
import ToastMessages from "../../constants/Messages";
import GlobalContext from "../../context/GlobalContext";
import useLoading from "../../hooks/useLoading";
import { AppScreenProps } from "../../navigation/NavigationProps";
import ChangePasswordSchema from "../../schemas/ChangePasswordSchema";
import Helper from "../../utils/Helper";

// Local Imports

// function component for ChangePasswordScreen
function ChangePasswordScreen(props: AppScreenProps<"ChangePasswordScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Hooks
  const { SetLoading, Loading } = useLoading();
  const { ChangePassword } = useAppEndpoints();
  const { showSnack } = useContext(GlobalContext);

  const ChangePasswordAPI = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);
      const apiResponse = await ChangePassword(values);
      SetLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        showSnack({ message: apiResponse.data.message, color: ColorPallete.success });
        navigation.goBack();
      } else {
        showSnack({ message: apiResponse.data.message });
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <AppForm
        initialValues={ChangePasswordSchema.InitialValues}
        validationSchema={ChangePasswordSchema.ValidationSchema}
        onSubmit={ChangePasswordAPI}
      >
        <AppFormPasswordField title="current_password" label="Current Password" />
        <AppFormPasswordField title="new_password" label="New Password" />
        <AppFormPasswordField title="confirm_password" label="Confirm Password" />
        <AppSubmitButton title="Change Password" roundness={100} loading={Loading} />
      </AppForm>
    </AppContainer>
  );
}

// exports
export default ChangePasswordScreen;

// styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
});
