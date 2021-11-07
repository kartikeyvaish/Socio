import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, Keyboard as KB } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import Container from "./../components/Container";
import config from "../config/config";
import CommentCard from "../components/CommentsCard";
import KeyBoard from "./../components/KeyBoard";
import LoadingScreen from "./../components/LoadingScreen";
import { ToastAndroid } from "react-native";

function Comments({ navigation, route, User }) {
  const [Comments, SetComments] = useState([]);
  const [LikeLoading, SetLikeLoading] = useState(null);
  const [CommentLoading, SetCommentLoading] = useState(false);
  const [Comment, SetComment] = useState("");
  const [Loading, SetLoading] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);
  const [DeleteLoading, SetDeleteLoading] = useState(false);

  useEffect(() => {
    InitialLoad();
  }, []);

  const InitialLoad = async () => {
    try {
      SetLoading(true);
      await GetAllComments();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetAllComments();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  const GetAllComments = async () => {
    try {
      const response = await API.GetComments(route.params.PostID, User.Token);
      if (response.ok) {
        SetComments(response.data.Comments);
      } else {
      }
    } catch (error) {}
  };

  const AddComment = async () => {
    try {
      if (route?.params?.PostID && Comment.length) {
        KB.dismiss();
        SetCommentLoading(true);
        const data = {
          comment_text: Comment,
          post_id: route.params.PostID,
        };
        const response = await API.AddComment(data, User.Token);
        if (response.ok) {
          await GetAllComments();
          SetComment("");
        }
        SetCommentLoading(false);
      }
    } catch (error) {
      SetCommentLoading(false);
    }
  };

  const DeleteComment = async (_id) => {
    try {
      SetDeleteLoading(_id);
      const response = await API.DeleteComment(
        {
          comment_id: _id,
        },
        User.Token
      );

      if (response.ok) {
        await GetAllComments();
      } else {
        ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
      }

      SetDeleteLoading(null);
    } catch (error) {
      SetDeleteLoading(null);
    }
  };

  const RenderItem = ({ item }) => (
    <CommentCard
      Comment={item.comment_text}
      DeletePress={() => DeleteComment(item._id)}
      LikeLoading={LikeLoading}
      DeleteLoading={DeleteLoading}
      ProfilePicture={item.ProfilePicture}
      DateTime={item.commented_on}
      showDelete={
        item.user_id === User._id || route.params.PostOwnerID === User._id
      }
      {...item}
    />
  );

  return (
    <Container style={styles.container}>
      {Loading ? (
        <LoadingScreen loading={true} loadingText="Getting Comments" />
      ) : (
        <>
          <FlatList
            data={Comments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={RenderItem}
            onRefresh={onRefresh}
            refreshing={Refreshing}
            ListEmptyComponent={
              <LoadingScreen loadingText="No Comments yet." loading={false} />
            }
          />
          <KeyBoard
            showFilePicker={false}
            containerStyle={{ paddingTop: 0, paddingBottom: 0 }}
            placeholder="Write a comment"
            onChangeText={SetComment}
            Loading={CommentLoading}
            value={Comment}
            onSubmit={AddComment}
          />
        </>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps)(Comments);

const styles = StyleSheet.create({
  container: { padding: 15 },
});
