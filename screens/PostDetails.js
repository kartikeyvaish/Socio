import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import config from "../config/config";
import Toast from "../components/Toast";
import PostCard from "../components/PostCard";
import ScreenNames from "../navigation/ScreenNames";
import LoadingScreen from "../components/LoadingScreen";

function PostDetails({ route, navigation, User }) {
  const [UniversalMute, SetUniversalMute] = useState(false);
  const [PostData, SetPostData] = useState(null);
  const [ViewableItem, SetViewableItem] = useState(route.params._id);
  const [Loading, SetLoading] = useState(true);

  // Get Post Data
  useEffect(() => {
    GetPostDetails();
  }, []);

  // To stop playing the video when the user navigates away from the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      SetViewableItem(null);
    });

    return unsubscribe;
  }, [navigation]);

  // To resume playing video on returing to the screen
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      SetViewableItem(route.params._id);
    });

    return unsubscribe;
  }, [navigation]);

  // API Call to get the post details
  const GetPostDetails = async () => {
    try {
      if (route.params._id) {
        SetLoading(true);
        const response = await API.GetPostDetails(route.params._id, User.Token);

        SetLoading(false);
        if (response.ok) {
          SetPostData(response.data);
        } else {
          Toast.show({ text: response.data });
        }
      } else {
        Toast.show({ text: "Post ID is required" });
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  return Loading ? (
    <LoadingScreen />
  ) : PostData ? (
    <PostCard
      {...PostData}
      Token={User.Token}
      onNamePress={() => navigation.goBack()}
      viewable={ViewableItem}
      muted={UniversalMute}
      onMuteToggle={() => SetUniversalMute(!UniversalMute)}
      onLikesPress={() =>
        navigation.navigate(ScreenNames.Likes, { PostID: PostData._id })
      }
      onCommentPress={() =>
        navigation.navigate(ScreenNames.Comments, { PostID: PostData._id })
      }
      showOpenMenu={true}
      onGoback={() => navigation.goBack()}
      Width={PostData.dimensions.width}
      Height={PostData.dimensions.height}
    />
  ) : null;
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

export default connect(mapStateToProps)(PostDetails);

const styles = StyleSheet.create({
  container: {},
});
