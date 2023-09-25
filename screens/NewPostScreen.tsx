// Packages Imports (from node_modules)
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

// Local Imports (components/types/utils)
import AppButton from "../components/App/AppButton";
import AppContainer from "../components/App/AppContainer";
import AppIcon from "../components/App/AppIcon";
import AppLoading from "../components/App/AppLoading";
import ColorPallete from "../constants/ColorPallete";
import Messages from "../constants/Messages";
import NewPostInitialButton from "../components/Buttons/NewPostInitialButton";
import PickedFileItem from "../components/Cards/PickedFileItem";
import TextFieldInput from "../components/Inputs/TextFieldInput";

// Named Imports
import { createPostAPI } from "../api/services/Post";
import {
  generateUniqueId,
  getBlurhash,
  getFileNameFromURL,
  getFileType,
  getMimeTypeFromURL,
  getThumbnail,
  uploadFile,
} from "../helpers/utils";
import { PickedFileProps } from "../types/AppTypes";
import { showErrorToast, showToast } from "../helpers/toastHelpers";
import { TabScreenProps } from "../navigation/NavigationTypes";
import { useAppSelector } from "../store/reduxHooks";

// interface for NewPostScreen component
export interface NewPostScreenProps {}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// functional component for NewPostScreen
function NewPostScreen(props: TabScreenProps<"NewPostTabScreen">) {
  // Destructuring props
  const { navigation } = props;

  const { id: userId } = useAppSelector(state => state.auth);

  const [caption, setCaption] = useState<string>("");
  const [files, setFiles] = useState<Array<PickedFileProps>>([]);
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Function to pick a file
  const pickFile = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        const fileUri = result.assets[0].uri;
        let thumbnail = null;

        const mimeType = getMimeTypeFromURL(fileUri);

        if (mimeType === null) {
          showErrorToast("Invalid file type");
          return;
        }

        const fileType = getFileType(fileUri);

        if (fileType === "video") {
          const videoThumbnail = await getThumbnail(fileUri);

          thumbnail = {
            uri: videoThumbnail,
            type: getMimeTypeFromURL(videoThumbnail) || "image/jpeg",
            name: getFileNameFromURL(videoThumbnail) || "thumbnail.jpg",
          };
        }

        const file: PickedFileProps = {
          uri: fileUri,
          name: result.assets[0].fileName || getFileNameFromURL(fileUri),
          type: mimeType,
          id: generateUniqueId(),
          fileType: fileType,
          thumbnail,
        };

        setFiles([...files, file]);
      }
    } catch (error) {}
  };

  const onRemovePress = (id: string) => {
    const newFiles = files.filter(file => file.id !== id);

    setFiles(newFiles);
  };

  const createPost = async () => {
    try {
      setLoading(true);
      let fileUploads = [];

      for (let i = 0; i < files.length; i++) {
        let fileItem = {};

        const timeStamp = new Date().getTime();
        const folderName = `users/${userId}/posts/${timeStamp}${i}`;
        const thumbNailFolderName = `users/${userId}/posts/thumbnails/${timeStamp}${i}`;

        let fileUploadResponse = await uploadFile({ ...files[i], folderName });

        if (!fileUploadResponse.ok) {
          showErrorToast("Error uploading file");
          return;
        }

        let blurhash = null;

        if (files[i].fileType === "image")
          blurhash = await getBlurhash(files[i].uri);

        fileItem = {
          ...fileItem,
          ...fileUploadResponse.file_details,
          blurhash,
        };

        if (files[i].fileType === "video") {
          if (!files[i].thumbnail) {
            showErrorToast("Error uploading video 1 file");
            return;
          }

          blurhash = await getBlurhash(files[i].thumbnail.uri);

          let thumbnailUploadResponse = await uploadFile({
            ...files[i].thumbnail,
            folderName: thumbNailFolderName,
          });

          if (!thumbnailUploadResponse.ok) {
            showErrorToast("Error uploading video file");
            return;
          }

          fileItem = {
            ...fileItem,
            thumbnail_url: thumbnailUploadResponse.file_details.url,
            blurhash,
          };
        }

        fileUploads.push(fileItem);
      }
      
      let payload: any = { files: fileUploads };

      if (location) payload = { ...payload, location };
      if (caption) payload = { ...payload, caption };

      const postApiResponse = await createPostAPI(payload);
      setLoading(false);

      if (postApiResponse.ok) {
        showToast({ preset: "done", title: "Post created successfully" });
        resetForm();
      } else {
        showErrorToast("Error while creating post");
      }
    } catch (error) {
      showErrorToast(Messages.serverErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFiles([]);
    setCaption("");
    setLocation("");
  };

  // render
  return (
    <AppContainer style={styles.container}>
      {files.length ? (
        <ScrollView>
          <View style={styles.topContainer}>
            <AppIcon
              family="Entypo"
              name="cross"
              size={40}
              onPress={loading ? undefined : resetForm}
            />

            <AppIcon
              family="Ionicons"
              name="send"
              size={24}
              onPress={files.length ? createPost : undefined}
            />
          </View>

          <AnimatedFlatList
            data={files}
            renderItem={({ item }: any) => (
              <PickedFileItem
                file={item}
                onRemovePress={() => onRemovePress(item.id)}
              />
            )}
            keyExtractor={(item: PickedFileProps) => item.id}
            horizontal
            ItemSeparatorComponent={PickedFileItem.ItemGapper}
            showsHorizontalScrollIndicator={false}
          />

          <AppButton
            title="Add More Files"
            margins={{ top: 20 }}
            onPress={pickFile}
            backgroundColor={ColorPallete.inputBackgroundColorDark}
          />

          <TextFieldInput
            onChangeText={setLocation}
            placeholder="Location"
            margins={{ top: 20 }}
          />

          <TextFieldInput
            placeholder="Caption"
            onChangeText={setCaption}
            multiline={true}
            margins={{ top: 20 }}
            style={{ height: 120, paddingTop: 15, paddingBottom: 15 }}
          />
        </ScrollView>
      ) : (
        <NewPostInitialButton onPress={pickFile} />
      )}

      <AppLoading loading={loading} loadingText="Creating Post..." />
    </AppContainer>
  );
}

// exports
export default NewPostScreen;

// styles for NewPostScreen
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  topContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 10,
    marginBottom: 20,
  },
});
