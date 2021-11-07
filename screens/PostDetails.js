import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import config from "../config/config";
import ScrollContainer from "./../components/ScrollContainer";
import Toast from "../components/Toast";
import PostCard from "../components/PostCard";

function PostDetails({ route, navigation, User }) {
  const [UniversalMute, SetUniversalMute] = useState(false);
  const [PostData, SetPostData] = useState(null);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    GetPostDetails();
  }, []);

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

  return PostData ? (
    <PostCard
      {...PostData}
      Token={User.Token}
      onNamePress={() => navigation.goBack()}
      ViewableItems={[PostData._id]}
      muted={UniversalMute}
      onMuteToggle={() => SetUniversalMute(!UniversalMute)}
      onLikesPress={() =>
        navigation.navigate("Likes", { PostID: PostData._id })
      }
      onCommentPress={() =>
        navigation.navigate("Comments", { PostID: PostData._id })
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
    User: state.User,
  };
};

export default connect(mapStateToProps)(PostDetails);

const styles = StyleSheet.create({
  container: {},
});
