// Packages Imports
import { useContext } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, Image } from "react-native";
import { CommonActions, useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";

// Local Imports
import AppContainer from "../../components/AppContainer";
import AppForm from "../../components/AppForm";
import AppFormField from "../../components/AppFormField";
import AppIcon from "../../components/AppIcon";
import AppImage from "../../components/AppImage";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AppSubmitButton from "../../components/AppSubmitButton";
import ColorPallete from "../../constants/ColorPallete";
import FeedActions from "../../store/feed/actions";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import NewPostSchema from "../../schemas/NewPostSchema";
import IconNames from "../../constants/IconNames";
import ToastMessages from "../../constants/Messages";
import ScreenNames from "../../navigation/ScreenNames";

// Hooks
import useAppEndpoints from "../../api/useAppEndpoints";
import useLoading from "../../hooks/useLoading";
import ProfileActionCreators from "../../store/profile/actions";

// function component for CreatePostScreen
function CreatePostScreen(props: AppScreenProps<"CreatePostScreen">) {
  // Destructuring props
  const { route, navigation } = props;
  const { thumbnail_image, uri, mimeType, name } = route.params ?? {};

  // hooks
  const { colors } = useTheme();
  const { CreatePost } = useAppEndpoints();
  const dispatch = useDispatch();
  const { Loading, SetLoading } = useLoading();
  const { User, showSnack } = useContext(GlobalContext);
  const isFocused = useIsFocused();

  // call the API to create a new post
  const CreatePostAPI = async (values: any) => {
    try {
      Keyboard.dismiss();

      SetLoading(true);

      const formData: any = new FormData();

      // map the values to the formData
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });

      // append the image to the formData
      formData.append("file", {
        name: name,
        type: mimeType,
        uri: uri,
      });

      let widthPic = 0;
      let heightPic = 0;

      await Image.getSize(uri, (width, height) => {
        widthPic = width;
        heightPic = height;
      });

      // If mimeType is video then append the thumbnail image
      if (mimeType.slice(0, 5) === "video") {
        formData.append("thumbnail_image", {
          name: Helper.get_file_name(thumbnail_image),
          type: Helper.get_mime_type(thumbnail_image),
          uri: thumbnail_image,
        });
      }

      let temp_id = Helper.GenerateUniqueID();
      let newDateTime = new Date().toString();

      let payload = {
        ...values,
        _id: temp_id,
        likes_count: 0,
        comments_count: 0,
        post_datetime: newDateTime,
        post_owner_id: User._id,
        file: {
          _id: `${temp_id}_file`,
          uri: uri,
          mimeType: mimeType,
          width: widthPic,
          height: heightPic,
          public_id: "some-public-id",
          duration: 0,
        },
        post_owner_details: { ...User },
        is_liked: false,
      };

      if (mimeType.slice(0, 5) === "video") {
        payload.thumbnail_image = {
          _id: `${temp_id}_file_thumb`,
          uri: thumbnail_image,
          mimeType: Helper.get_mime_type(thumbnail_image),
          width: widthPic,
          height: heightPic,
          public_id: "some-public-id",
          duration: 0,
        };
      }

      // // Add the post to the feed
      dispatch(FeedActions.AddPosts([payload]));
      // // Add the post to your own posts
      dispatch(ProfileActionCreators.AddProfilePost(payload));

      SetLoading(false);

      // Reset the navigation State to HomeScreen
      const navigationState = navigation.getState();
      navigation.dispatch(
        CommonActions.reset({
          index: navigationState.index,
          routes: [{ name: ScreenNames.HomeScreen }],
        })
      );

      const apiResponse = await CreatePost(formData);

      if (apiResponse.ok && apiResponse !== null) {
      } else {
        // Delete the post to the feed
        dispatch(FeedActions.DeletePost(temp_id));
        // Delete the post to your own posts
        dispatch(ProfileActionCreators.DeleteProfilePost(temp_id));
        Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
      if (isFocused) SetLoading(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <AppForm
            initialValues={NewPostSchema.InitialValues}
            validationSchema={NewPostSchema.ValidationSchema}
            onSubmit={CreatePostAPI}
          >
            <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
              <View style={[styles.previewContainer, { borderColor: colors.text }]}>
                <AppImage uri={thumbnail_image ? thumbnail_image : uri} />

                {mimeType.slice(0, 5) === "video" ? (
                  <AppIcon
                    family={IconNames.AntDesign}
                    name="play"
                    size={30}
                    color={ColorPallete.primary}
                    style={styles.playIcon}
                  />
                ) : null}
              </View>

              <View style={styles.inputContainer}>
                <AppFormField
                  title="caption"
                  mode="flat"
                  showHelper={false}
                  placeholder="Write a Caption"
                />
              </View>
            </View>

            <AppFormField title="location" mode="flat" showHelper={false} placeholder="Location" />

            <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10, marginTop: 10 }}>
              <AppSubmitButton
                title="Create Post"
                roundness={100}
                marginTop={20}
                loading={Loading}
              />
            </View>
          </AppForm>
        </KeyboardAvoidingView>
      </ScrollView>
    </AppContainer>
  );
}

// exports
export default CreatePostScreen;

// styles
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  previewContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  playIcon: {
    position: "absolute",
    backgroundColor: ColorPallete.white,
    borderRadius: 100,
  },
});
