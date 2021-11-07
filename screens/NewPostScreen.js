import React from "react";
import { View, StyleSheet, Dimensions, ToastAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

import Container from "./../components/Container";
import Helper from "../config/Helper";
import Icon from "../components/Icon";
import NewPostMenuCard from "./NewPostMenuCard";
import config from "../config/config";

const ScreenWidth = Dimensions.get("screen").width;

function NewPostScreen({ navigation }) {
  const SharePost = (data) => {
    try {
      navigation.navigate("CreatePost", { ...data });
    } catch (error) {
      ToastAndroid.show(config.messages.ServerError, ToastAndroid.SHORT);
    }
  };

  const CaptureFile = async (type = "photo") => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (permission.granted) {
        const response = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
          mediaTypes:
            type === "photo"
              ? ImagePicker.MediaTypeOptions.Images
              : ImagePicker.MediaTypeOptions.Videos,
          videoMaxDuration: 60,
        });
        if (response.cancelled === false) {
          const data = {
            duration: response.duration,
            height: response.height,
            id: Helper.GenerateUniqueID(),
            mediaType: response.type === "image" ? "photo" : "video",
            uri: response.uri,
            width: response.width,
          };
          SharePost(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PickImage = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });

      if (response.type !== "cancel") {
        const mimName = Helper.GiveMimeName(response.name);
        const data = {
          id: Helper.GenerateUniqueID(),
          mediaType: mimName === "image" ? "photo" : "video",
          uri: "file://" + response.uri,
        };

        SharePost(data);
      }
    } catch (error) {}
  };

  return (
    <Container>
      <View style={styles.HeaderBar}>
        <Icon
          Name="Entypo"
          IconName="cross"
          onPress={() => navigation.goBack()}
        />
      </View>

      <NewPostMenuCard
        Name="AntDesign"
        IconName="camerao"
        onPress={() => CaptureFile("photo")}
        text="Take a photo"
      />

      <NewPostMenuCard
        Name="AntDesign"
        IconName="videocamera"
        onPress={() => CaptureFile("video")}
        text="Record a Video"
      />

      <NewPostMenuCard
        Name="Entypo"
        IconName="attachment"
        onPress={PickImage}
        text="Choose from Gallery"
      />
    </Container>
  );
}

export default NewPostScreen;

const styles = StyleSheet.create({
  HeaderBar: {
    width: ScreenWidth,
    padding: 10,
  },
});
