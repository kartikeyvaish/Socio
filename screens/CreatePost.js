import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { FileSystem } from "react-native-unimodules";
import * as ImageManipulator from "expo-image-manipulator";
import * as VideoThumbnails from "expo-video-thumbnails";

import API from "../api/API";
import ColorPallete from "../config/ColorPallete";
import config from "../config/config";
import Helper from "../config/Helper";
import Text from "../components/Text";
import TextInput from "./../components/TextInput";
import PreviewFile from "../components/PreviewFile";
import ScrollContainer from "../components/ScrollContainer";
import Toast from "../components/Toast";
import { AddPost } from "../store/actions";

const ScreenWidth = Dimensions.get("screen").width;
const FILE_LIMIT = 10485760;

function CreatePost({ navigation, route, User, Add_Post }) {
  const [Loading, SetLoading] = useState(false);
  const [Caption, SetCaption] = useState("");
  const [Location, SetLocation] = useState("");

  useLayoutEffect(() => {
    if (Loading === true) {
      navigation.setOptions({
        headerRight: () => (
          <ActivityIndicator
            size="small"
            color={ColorPallete.primary}
            style={{ marginRight: 20 }}
          />
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Text
            text="Share"
            color={ColorPallete.primary}
            size={20}
            family="InterBold"
            marginRight={20}
            onPress={CreateNewPost}
          />
        ),
      });
    }
  }, [navigation, Loading, Location, Caption]);

  const CreateNewPost = async () => {
    try {
      let formData = new FormData();
      let MimeName = Helper.GiveMimeName(route.params.uri);
      let MimeType = Helper.GiveMimeType(route.params.uri);
      let Preview = "";
      let Width = 0;
      let Height = 0;
      SetLoading(true);

      if (MimeName === "video") {
        try {
          const response = await VideoThumbnails.getThumbnailAsync(
            route.params.uri,
            {
              quality: 0.3,
            }
          );
          Width = response.width;
          Height = response.height;
          Preview = response.uri;
        } catch (error) {}
      }

      if (MimeName === "image") {
        try {
          const response = await ImageManipulator.manipulateAsync(
            route.params.uri,
            [],
            {
              compress: 0.3,
              format: "jpeg",
            }
          );
          Width = response.width;
          Height = response.height;
          Preview = response.uri;
        } catch (error) {}
      }

      const sizeCheck = await FileSystem.getInfoAsync(route.params.uri, {
        size: true,
      });

      if (sizeCheck.exists === false || sizeCheck.size > FILE_LIMIT) {
        SetLoading(false);
        Toast.show({ text: "File Limit Exceeded" });
        return;
      }

      formData.append("location", Location);
      formData.append("caption", Caption);
      formData.append("height", Height);
      formData.append("width", Width);

      formData.append("file", {
        type: MimeType,
        name: Helper.GetFileName(route.params.uri),
        uri: route.params.uri,
      });

      formData.append("preview_file", {
        type: "image/jpeg",
        name: Helper.GetFileName("preview_" + Preview),
        uri: Preview,
      });

      const response = await API.CreateNewPost(formData, User.Token);
      if (response.ok) {
        SetLoading(false);
        Add_Post(response.data);
        navigation.navigate("HomeScreen");
      } else {
        SetLoading(false);
        Toast.show({ text: response.data });
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  return (
    <ScrollContainer style={styles.container}>
      <View style={styles.PReviewBox}>
        <PreviewFile {...route.params} />
      </View>

      <TextInput
        label="Write a Caption"
        multiline={true}
        onChangeText={SetCaption}
      />
      <TextInput label="Location" mode="flat" onChangeText={SetLocation} />
    </ScrollContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Add_Post: (post_id) => dispatch(AddPost(post_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  PReviewBox: {
    width: ScreenWidth,
    height: ScreenWidth - 50,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
