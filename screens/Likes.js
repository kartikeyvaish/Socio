import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import config from "../config/config";
import LoadingScreen from "./../components/LoadingScreen";
import NewChatCard from "../components/NewChatCard";
import Toast from "../components/Toast";

function Likes({ route, navigation, User }) {
  const [UsersLiked, SetUsersLiked] = useState();
  const [Loading, SetLoading] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    InitialLoad();
  }, []);

  const InitialLoad = async () => {
    try {
      SetLoading(true);
      await GetAllLikes();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  const GetAllLikes = async () => {
    try {
      if (route?.params?.PostID) {
        const response = await API.GetAllLikesOnPost(
          route?.params?.PostID,
          User.Token
        );
        if (response.ok) {
          SetUsersLiked(response.data.Likes);
        } else {
          Toast.show({ text: response.data });
        }
      } else {
        Toast.show({ text: "Post Not Found" });
      }
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
    }
  };

  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetAllLikes();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  const RenderItem = ({ item }) => (
    <>
      <NewChatCard
        Name={item.Name}
        ProfilePicture={item.ProfilePicture}
        Username={item.Username}
        _id={item._id}
        showCirlce={false}
        onPress={
          User._id === item.user_id
            ? () => navigation.navigate("ProfileScreen")
            : () =>
                navigation.navigate("PersonProfile", {
                  title: item.Username,
                  _id: item.user_id,
                })
        }
      />
    </>
  );

  return (
    <View style={styles.container}>
      {Loading ? (
        <LoadingScreen loadingText="Getting users..." />
      ) : (
        <FlatList
          data={UsersLiked}
          keyExtractor={(item) => item._id.toString()}
          renderItem={RenderItem}
          onRefresh={onRefresh}
          refreshing={Refreshing}
        />
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps)(Likes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
