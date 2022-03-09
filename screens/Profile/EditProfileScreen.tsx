// Packages Imports
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppIcon from "../../components/AppIcon";
import AppLoading from "../../components/AppLoading";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AppSubmitButton from "../../components/AppSubmitButton";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import ColorPallete from "../../constants/ColorPallete";
import EditProfileSchema from "../../schemas/EditProfileSchema";
import FontNames from "../../constants/FontNames";
import { HelperTextProps } from "../../types/ComponentTypes";
import IconNames from "../../constants/IconNames";
import useDocumentPicker from "../../hooks/useDocumentPicker";
import useAppEndpoints from "../../api/useAppEndpoints";
import JWT from "../../auth/JWT";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import ToastMessages from "../../constants/Messages";
import useLoading from "../../hooks/useLoading";

// function component for EditProfileScreen
function EditProfileScreen(props: AppScreenProps<"EditProfileScreen">) {
  // Destructuring props
  const { route, navigation } = props;

  // get default pic
  const defaultFile = { uri: route.params.profile_picture };

  // Hooks
  const { SetUser, showSnack } = useContext(GlobalContext);
  const { EditProfile } = useAppEndpoints();
  const { PickDocument, selectedFile, unselectFile, sameAsInitial } = useDocumentPicker({
    defaultFile,
  });
  const { Loading, SetLoading } = useLoading();

  // Initial values for the form
  const formInitials = { ...(route.params ?? {}) };

  // Helper Text props
  const emailHelperText: HelperTextProps = {
    text: "Email is Verified.",
    style: { color: ColorPallete.success },
    visible: true,
    padding: "none",
  };

  // API call to edit profile
  const EditProfileAPI = async (values: any) => {
    try {
      // Contruct a new formData object
      const formData: any = new FormData();

      // Append if the values have been changed from the initial values
      if (values.name !== formInitials.name) formData.append("name", values.name);
      if (values.username !== formInitials.username) formData.append("username", values.username);
      if (values.bio !== formInitials.bio) formData.append("bio", values.bio);

      if (!sameAsInitial)
        formData.append("profile_picture", {
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: selectedFile.mimeType,
        });

      if (formData?._parts?.length === 0) {
        navigation.goBack();
        return;
      }

      SetLoading(true);

      const apiResponse = await EditProfile(formData);

      SetLoading(false);

      if (apiResponse.ok && apiResponse !== null) {
        const decodedData: any = JWT.decodeToken(apiResponse.data.user_data);

        if (decodedData) {
          SetUser(decodedData);
          showSnack({ message: apiResponse.data?.message, color: ColorPallete.success });
          navigation.goBack();
        }
      } else {
        showSnack({ message: apiResponse.data?.message });
      }
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 20 }}>
          <Image
            source={{ uri: selectedFile.uri }}
            style={{ width: 100, height: 100, borderRadius: 160 }}
          />

          {!sameAsInitial ? (
            <Animated.View style={styles.crossIcon} entering={ZoomIn} exiting={ZoomOut}>
              <AppIcon
                family={IconNames.Entypo}
                name="circle-with-cross"
                size={30}
                color={ColorPallete.primary}
                onPress={unselectFile}
              />
            </Animated.View>
          ) : null}
        </View>

        <AppText
          text="Change Profile Picture"
          marginTop={20}
          color={ColorPallete.primary}
          size={18}
          family={FontNames.PoppinsMedium}
          onPress={PickDocument}
        />

        <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}>
          <AppForm
            initialValues={formInitials}
            validationSchema={EditProfileSchema.ValidationSchema}
            onSubmit={EditProfileAPI}
          >
            <AppFormField title="name" label="Name" controlled mode="flat" />
            <AppTextInput
              value={route.params.email}
              controlled
              editable={false}
              label={"Email"}
              mode="flat"
              helperTextProps={emailHelperText}
            />
            <AppFormField title="username" label="Username" controlled mode="flat" />
            <AppFormField title="bio" label="Bio" multiline controlled mode="flat" />

            <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
              <AppSubmitButton title="Save Profile" roundness={100} loading={Loading} />
            </View>
          </AppForm>
        </KeyboardAvoidingView>
      </ScrollView>

      <AppLoading visible={false} loadingText="Saving Profile.." />
    </AppContainer>
  );
}

// exports
export default EditProfileScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  crossIcon: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: ColorPallete.white,
    borderRadius: 100,
  },
});
