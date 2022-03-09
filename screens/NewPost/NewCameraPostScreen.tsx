// Packages Imports
import { useEffect } from "react";
import { View, StyleSheet, StatusBar, Linking, Image } from "react-native";
import {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOutDown,
  FadeOutLeft,
  FadeOutRight,
  Layout as LT,
  SlideInRight,
  SlideOutRight,
} from "react-native-reanimated";
import { Camera } from "expo-camera";
import * as NavigationBar from "expo-navigation-bar";
import { useIsFocused, useTheme } from "@react-navigation/native";
import { Video } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";

// Local Imports
import AppIcon from "../../components/AppIcon";
import { AppScreenProps } from "../../navigation/NavigationProps";
import AppText from "../../components/AppText";
import CameraOptionsIcon from "../../components/CameraOptionsIcon";
import ColorPallete from "../../constants/ColorPallete";
import FontNames from "../../constants/FontNames";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import LoadingFlex from "../../components/LoadingFlex";
import PermissionsCard from "../../components/PermissionsCard";
import useBackHandler from "../../hooks/useBackHandler";
import VideoRecordButton from "./../../components/VideoRecordButton";
import useSocioCamera from "../../hooks/useSocioCamera";
import ScreenNames from "../../navigation/ScreenNames";

// Constants
const permissionsLabel =
  "You have to provide camera and microphone permissions to access Socio Cam.";
const cameraPermissionsLabel = `You will have to provide permission from settings as you have denied the permission before.\n\nPlease click on the button below to open the settings.\n\nSocio Settings > Permissions > Camera > Allow Camera`;
const microphonePermissionsLabel = `You will have to provide permission from settings as you have denied the permission before.\n\nPlease click on the button below to open the settings.\n\nSocio Settings > Permissions > Camera > Allow Microphone`;

// function component for NewCameraPostScreen
function NewCameraPostScreen(props: AppScreenProps<"NewCameraPostScreen">) {
  // Destructuring props
  const { navigation } = props;

  // Hooks and Contexts
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  // Refs
  const {
    Loading,
    CameraReady,
    CameraType,
    Flash,
    Permissions,
    CameraRef,
    Mode,
    IsRecording,
    CapturedFile,
    ThumbLoading,
    ...functions
  } = useSocioCamera();

  const {
    GetPermission,
    SetCameraReady,
    captureImage,
    SetMode,
    captureVideo,
    stopRecording,
    toggleFlash,
    switchCamera,
    unselectFile,
    SetThumbLoading,
  } = functions;

  // Local States

  // initial call to get permissions
  useEffect(() => {
    GetPermission();
  }, []);

  // Change colors when screen focused
  useEffect(() => {
    if (isFocused) NavigationBar.setBackgroundColorAsync(ColorPallete.black);
    else NavigationBar.setBackgroundColorAsync(colors.background);
  }, [isFocused]);

  // BackPress Handler
  useBackHandler(() => {
    if (CapturedFile !== null) {
      unselectFile();
      return true;
    }

    return false;
  });

  // if video is selected then create thumbnail and then navigate to next screen
  // if image is selected then navigate to next screen
  const nextScreenNavigate = async () => {
    try {
      let payload = { ...CapturedFile };

      if (CapturedFile.mimeType.slice(0, 5) === "video") {
        SetThumbLoading(true);

        const { uri } = await VideoThumbnails.getThumbnailAsync(CapturedFile.uri, {
          time: 1000,
        });

        SetThumbLoading(false);

        payload = { ...payload, thumbnail_image: uri };
      }

      navigation.replace(ScreenNames.CreatePostScreen, payload);
    } catch (error) {
      SetThumbLoading(false);
      Helper.ShowToast("Some Error Occured while creating thumbnail");
    }
  };

  // render
  return Loading ? (
    <LoadingFlex loadingText="Loading Camera.." size={20} />
  ) : Permissions.camera === "DENIED" || Permissions.microphone === "DENIED" ? (
    <PermissionsCard
      buttonTitle={"Open Settings"}
      permissionLabel={
        Permissions.camera === "DENIED" ? cameraPermissionsLabel : microphonePermissionsLabel
      }
      onButtonPress={() => Linking.openSettings()}
    />
  ) : Permissions.camera === "UNAUTHORIZED" || Permissions.microphone === "UNAUTHORIZED" ? (
    <PermissionsCard
      buttonTitle={"Allow Camera & Microphone"}
      permissionLabel={permissionsLabel}
      onButtonPress={GetPermission}
    />
  ) : (
    <View style={{ flex: 1, backgroundColor: ColorPallete.black }}>
      <View style={styles.container}>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={ColorPallete.black}
          animated={false}
        />

        {CapturedFile === null ? (
          <Camera
            ref={CameraRef}
            style={{ flex: 1 }}
            type={CameraType}
            onCameraReady={() => SetCameraReady(true)}
            autoFocus={true}
            flashMode={Flash}
            ratio={"16:9"}
          />
        ) : CapturedFile.mimeType.slice(0, 5) === "image" ? (
          <Image source={{ uri: CapturedFile.uri }} style={{ width: "100%", height: "100%" }} />
        ) : (
          <Video
            source={{ uri: CapturedFile.uri }}
            style={{ flex: 1, width: "100%", height: "100%" }}
            shouldPlay
            resizeMode="cover"
            isLooping
            isMuted={false}
          />
        )}

        <AppIcon
          family={IconNames.Entypo}
          name="cross"
          size={40}
          onPress={CapturedFile !== null ? unselectFile : () => navigation.goBack()}
          color={ColorPallete.white}
          style={styles.backIcon}
        />

        <CameraOptionsIcon
          entering={SlideInRight}
          exiting={SlideOutRight}
          layout={LT}
          style={styles.doneIcon}
          onPress={nextScreenNavigate}
          loading={ThumbLoading}
          iconProps={{
            family: IconNames.AntDesign,
            name: "checkcircle",
            size: 35,
            color: ColorPallete.primary,
          }}
          backgroundColor={ColorPallete.white}
          visible={CapturedFile !== null}
        />

        <View style={styles.bottomContainer}>
          <View style={styles.flexOne}>
            <CameraOptionsIcon
              entering={FadeInLeft}
              exiting={FadeOutLeft}
              layout={LT}
              onPress={toggleFlash}
              iconProps={{
                family: Flash === "torch" ? IconNames.Ionicons : IconNames.MaterialIcons,
                name:
                  Flash === "off"
                    ? "flash-off"
                    : Flash === "on"
                    ? "flash-on"
                    : Flash === "torch"
                    ? "flashlight"
                    : "flash-auto",
                size: 30,
                marginTop: 20,
                color: ColorPallete.white,
              }}
              visible={CameraReady && CapturedFile === null && !IsRecording}
            />
          </View>

          <View style={[styles.flexTwo, { minHeight: 80 }]}>
            <VideoRecordButton
              IsRecording={IsRecording}
              onPress={IsRecording ? stopRecording : captureVideo}
              visible={Mode === "VIDEO" && CameraReady && CapturedFile === null}
            />

            <CameraOptionsIcon
              entering={FadeInDown}
              exiting={FadeOutDown}
              layout={LT}
              onPress={captureImage}
              iconProps={{
                family: IconNames.Entypo,
                name: "circle",
                size: 80,
                color: ColorPallete.white,
              }}
              visible={Mode === "IMAGE" && CameraReady && CapturedFile === null}
            />
          </View>

          <View style={styles.flexOne}>
            <CameraOptionsIcon
              entering={FadeInRight}
              exiting={FadeOutRight}
              layout={LT}
              onPress={switchCamera}
              iconProps={{
                family: IconNames.MaterialIcons,
                name: "flip-camera-ios",
                size: 30,
                marginTop: 20,
                color: ColorPallete.white,
              }}
              visible={CameraReady && CapturedFile === null && !IsRecording}
            />
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", width: "100%", padding: 5 }}>
        <View style={styles.flexOne}>
          <AppText
            text="IMAGE"
            color={ColorPallete.primary}
            family={Mode === "IMAGE" ? FontNames.PoppinsBold : FontNames.PoppinsLight}
            size={25}
            onPress={IsRecording || CapturedFile !== null ? null : () => SetMode("IMAGE")}
            style={{ opacity: Mode === "IMAGE" ? 1 : 0.5 }}
          />
        </View>

        <View style={styles.flexOne}>
          <AppText
            text="VIDEO"
            color={ColorPallete.primary}
            family={Mode === "VIDEO" ? FontNames.PoppinsBold : FontNames.PoppinsLight}
            size={25}
            onPress={IsRecording || CapturedFile !== null ? null : () => SetMode("VIDEO")}
            style={{ opacity: Mode === "VIDEO" ? 1 : 0.5 }}
          />
        </View>
      </View>
    </View>
  );
}

// exports
export default NewCameraPostScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPallete.black,
  },
  flexOne: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexTwo: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    width: "100%",
  },
  backIcon: { position: "absolute", left: 5, top: 5 },
  doneIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    borderRadius: 100,
  },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
});
