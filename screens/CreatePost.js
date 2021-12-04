import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { connect } from "react-redux";
import * as ImageManipulator from "expo-image-manipulator";
import * as VideoThumbnails from "expo-video-thumbnails";

import API from "../api/API";
import { AddPost } from "./../store/posts/actions";
import { AddToStorePosts } from "../store/cache/actions";
import { AddPostToProfile } from "../store/profile/actions";
import ColorPallete from "../config/ColorPallete";
import config from "../config/config";
import Helper from "../config/Helper";
import Text from "../components/Text";
import TextInput from "./../components/TextInput";
import ScrollContainer from "../components/ScrollContainer";
import Toast from "../components/Toast";
import ScreenNames from "../navigation/ScreenNames";

const ScreenWidth = Dimensions.get("screen").width;

function CreatePost({
  navigation,
  route,
  User,
  Add_Post,
  Add_to_Store_Posts,
  Add_Post_To_Profile,
}) {
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
        Add_to_Store_Posts(response.data);
        Add_Post_To_Profile(response.data);
        navigation.navigate(ScreenNames.HomeScreen);
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
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: route.params.uri }}
          style={{ width: 70, height: 70, borderRadius: 10 }}
        />
        <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
          <TextInput
            label="Write a Caption"
            multiline={true}
            onChangeText={SetCaption}
            mode="flat"
          />
        </View>
      </View>
      <TextInput label="Location" mode="flat" onChangeText={SetLocation} />
    </ScrollContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Add_Post: (post_id) => dispatch(AddPost(post_id)),
    Add_to_Store_Posts: (post) => dispatch(AddToStorePosts(post)),
    Add_Post_To_Profile: (post) => dispatch(AddPostToProfile(post)),
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
