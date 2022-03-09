// Packages Imports
import { View, StyleSheet } from "react-native";

// Component Imports
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import { AuthScreenProps } from "../../navigation/NavigationProps";
import FontNames from "../../constants/FontNames";
import ResetPasswordSchema from "../../schemas/ResetPasswordSchema";
import useLoading from "../../hooks/useLoading";
import useAuthEndpoints from "../../api/useAuthEndpoints";
import JWT from "../../auth/JWT";
import SecureStore from "../../auth/SecureStore";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import ToastMessages from "../../constants/Messages";
import Helper from "../../utils/Helper";

// function component for ResetPasswordScreen
function ResetPasswordScreen(props: AuthScreenProps<"ResetPasswordScreen">) {
  // Destructuring props
  const { route } = props;

  const { SetUser } = useContext(GlobalContext);

  const { email, reset_request_id } = route.params ?? {};

  const { SetLoading, Loading } = useLoading();

  const { ResetPassword } = useAuthEndpoints();

  const ResetPasswordAPI = async (values: any) => {
    try {
      let payload: any = {
        email: email,
        new_password: values.new_password,
        reset_request_id: reset_request_id,
      };
      SetLoading(true);

      const apiResponse = await ResetPassword(payload);

      SetLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        const decodedData: any = JWT.decodeToken(apiResponse.data.user_token);

        SecureStore.SetItem("access_token", decodedData.access_token);
        SecureStore.SetItem("refresh_token", decodedData.refresh_token);

        if (decodedData.access_token) delete decodedData.access_token;
        if (decodedData.refresh_token) delete decodedData.refresh_token;

        if (decodedData) SetUser(decodedData);
        else Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      SetLoading(false);
    }
  };

  // render
  return (
    <View style={styles.container}>
      <AppText
        text="Reset your password."
        family={FontNames.PoppinsMedium}
        size={22}
        marginBottom={20}
      />

      <AppForm
        initialValues={ResetPasswordSchema.InitialValues}
        validationSchema={ResetPasswordSchema.ValidationSchema}
        onSubmit={ResetPasswordAPI}
      >
        <AppFormField title="new_password" label="New Password" />
        <AppFormField title="confirm_new_password" label="Confirm New Password" />

        <AppSubmitButton title="Reset Password" roundness={100} loading={Loading} />
      </AppForm>
    </View>
  );
}

// exports
export default ResetPasswordScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
