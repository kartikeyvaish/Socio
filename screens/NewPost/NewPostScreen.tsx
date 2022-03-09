// Packages Imports
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut, Layout, ZoomIn, ZoomOut } from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import * as VideoThumbnails from "expo-video-thumbnails";

// Local Imports
import AnimatedText from "../../components/AnimatedText";
import AppButton from "../../components/AppButton";
import AppContainer from "../../components/AppContainer";
import AppImage from "../../components/AppImage";
import AppText from "./../../components/AppText";
import AppVideo from "../../components/AppVideo";
import ColorPallete from "../../constants/ColorPallete";
import ChooseFileCard from "../../components/ChooseFileCard";
import FontNames from "../../constants/FontNames";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import ScreenNames from "../../navigation/ScreenNames";
import { TabScreenProps } from "../../navigation/NavigationProps";
import useDocumentPicker from "../../hooks/useDocumentPicker";
import useLoading from "../../hooks/useLoading";

// function component for NewPostScreen
function NewPostScreen(props: TabScreenProps<"NewPostTabScreen">) {
  // Destructuring props
  const { navigation } = props;

  // refs and hooks
  const isFocused = useIsFocused();
  const { Loading, SetLoading } = useLoading();
  const { PickDocument, selectedFile, unselectFile } = useDocumentPicker({});

  // if user has left the screen, remove the selected file
  useEffect(() => {
    if (!isFocused) unselectFile();
  }, [isFocused]);

  // if video is selected then create thumbnail and then navigate to next screen
  // if image is selected then navigate to next screen
  const nextScreenNavigate = async () => {
    try {
      let payload = { ...selectedFile };

      if (selectedFile.mimeType.slice(0, 5) === "video") {
        SetLoading(true);

        const { uri } = await VideoThumbnails.getThumbnailAsync(selectedFile.uri, {
          time: 1000,
        });

        SetLoading(false);

        payload = { ...payload, thumbnail_image: uri };
      }

      navigation.navigate(ScreenNames.CreatePostScreen, payload);
    } catch (error) {
      SetLoading(false);
      Helper.ShowToast("Some Error Occured while creating thumbnail");
    }
  };

  // render
  return (
    <AppContainer>
      <AppText
        text="New Post"
        size={24}
        family={FontNames.PoppinsMedium}
        marginLeft={15}
        marginBottom={10}
      />

      <Animated.View layout={Layout} style={{ flex: 1 }}>
        {selectedFile !== null ? (
          <>
            {selectedFile.mimeType.slice(0, 5) === "image" ? (
              <AppImage uri={selectedFile.uri} resizeMode="contain" />
            ) : selectedFile.mimeType.slice(0, 5) === "video" ? (
              <AppVideo source={{ uri: selectedFile.uri }} />
            ) : null}
          </>
        ) : null}
      </Animated.View>

      <View style={{ flex: 1, marginBottom: 20 }}>
        <AnimatedText
          text={selectedFile !== null ? "" : "No File Selected"}
          size={24}
          margin={15}
          family={FontNames.PoppinsMedium}
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
        />

        {selectedFile === null ? (
          <Animated.View
            style={styles.pickContainer}
            entering={ZoomIn}
            exiting={ZoomOut}
            layout={Layout}
          >
            <View style={styles.flexRow}>
              <ChooseFileCard
                text="Camera"
                onPress={() => navigation.navigate(ScreenNames.NewCameraPostScreen)}
                iconProps={{
                  family: IconNames.AntDesign,
                  name: "camera",
                }}
              />
              <ChooseFileCard
                text="Story"
                onPress={() => navigation.navigate(ScreenNames.NewStoryScreen)}
                iconProps={{
                  family: IconNames.Entypo,
                  name: "slideshare",
                }}
              />
            </View>

            <View style={styles.flexRow}>
              <ChooseFileCard
                text="Image"
                onPress={() => PickDocument("image/*")}
                iconProps={{
                  family: IconNames.Entypo,
                  name: "image",
                }}
              />
              <ChooseFileCard
                text="Video"
                onPress={() => PickDocument("video/*")}
                iconProps={{
                  family: IconNames.Entypo,
                  name: "video",
                }}
              />
            </View>
          </Animated.View>
        ) : null}

        {selectedFile !== null ? (
          <Animated.View
            style={styles.btnsContainer}
            entering={FadeIn}
            exiting={FadeOut}
            layout={Layout}
          >
            <AppButton
              title="Discard"
              onPress={unselectFile}
              backgroundColor={ColorPallete.danger}
              roundness={100}
            />
            <AppButton
              title="Proceed"
              loading={Loading}
              roundness={100}
              onPress={nextScreenNavigate}
            />
          </Animated.View>
        ) : null}
      </View>
    </AppContainer>
  );
}

// exports
export default NewPostScreen;

// styles
const styles = StyleSheet.create({
  pickerContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  pickContainer: {
    flex: 1,
  },
  btnsContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  flexRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
