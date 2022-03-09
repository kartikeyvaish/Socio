// Packages Imports
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Animated, { FadeIn, FadeOut, Layout as LT } from "react-native-reanimated";
import Modal from "react-native-modal";
import { Video } from "expo-av";

// Local Imports
import AppImage from "./AppImage";
import ChatsKeyboard, { ChatKeyboardProps } from "./ChatKeyboard";
import ColorPallete from "../constants/ColorPallete";
import Layout from "../constants/Layout";
import { SelectedFileProps } from "../types/HooksTypes";
import { useKeyboard } from "../hooks/useKeyboard";

// interface for SelectFileModal
export interface SelectFileModalProps {
  visible?: boolean;
  backgroundColor?: string;
  onDismiss?: () => void;
  onBackButtonPress?: () => void;
  selectedFile?: SelectedFileProps;
  keyboardProps?: ChatKeyboardProps;
}

const screenWidth = Layout.window.width;
const screenHeight = Layout.window.height;

// function component for SelectFileModal
function SelectFileModal(props: SelectFileModalProps) {
  // Destructuring props
  const {
    visible,
    backgroundColor,
    onDismiss,
    onBackButtonPress,
    selectedFile = null,
    keyboardProps,
  } = props;

  const keyboardVisible = useKeyboard();

  // Calculate the width and height of file part
  const ratio = screenWidth / (selectedFile?.width ?? 1);
  const cardHeight = (selectedFile?.height ?? 1) * ratio;

  const modalStyles: StyleProp<ViewStyle> = [
    {
      backgroundColor: backgroundColor,
    },
    styles.modal,
  ];

  // render
  return (
    <Modal
      isVisible={visible}
      style={modalStyles}
      animationOut={"fadeOutDown"}
      backdropColor={ColorPallete.backdrop}
      backdropOpacity={1}
      coverScreen={true}
      hasBackdrop={true}
      onBackButtonPress={onBackButtonPress}
      onDismiss={onDismiss}
      useNativeDriver={true}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <View style={styles.container}>
        <View style={styles.fileContainer}>
          {selectedFile !== null ? (
            selectedFile.mimeType.slice(0, 5) === "image" ? (
              <AppImage uri={selectedFile.uri} style={styles.fileDimensions} />
            ) : (
              <Video
                source={{ uri: selectedFile.uri }}
                style={{ height: cardHeight, width: "100%" }}
                resizeMode="contain"
                shouldPlay
                isLooping
              />
            )
          ) : null}
        </View>

        {keyboardVisible ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LT}
            style={styles.backdrop}
          ></Animated.View>
        ) : null}

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
          <ChatsKeyboard
            {...keyboardProps}
            inputProps={{
              placeholderTextColor: ColorPallete.black,
            }}
            iconColor={ColorPallete.black}
            textInputColor={ColorPallete.black}
            keyboardBorderColor={ColorPallete.white}
            showIcons={false}
            showSendButton={false}
            keyboardBackgroundColor={ColorPallete.white}
          />
        </View>
      </View>
    </Modal>
  );
}

// exports
export default SelectFileModal;

// styles
const styles = StyleSheet.create({
  backdrop: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: ColorPallete.backdrop,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: ColorPallete.black,
  },
  modal: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  fileContainer: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: ColorPallete.black,
    justifyContent: "center",
    alignItems: "center",
  },
  fileDimensions: { width: screenWidth, height: screenWidth },
});
