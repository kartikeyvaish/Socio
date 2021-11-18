import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid, FlatList } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import config from "../config/config";
import PeopleCard from "../components/PeopleCard";
import Toast from "../components/Toast";

const BaseURL = config.URLs.BaseURL;

function Followers({ navigation, route, User }) {
  const [FollowingList, SetFollowingList] = useState([]);
  const [Refreshing, SetRefreshing] = useState(false);

  useEffect(() => {
    GetFollowersList();
  }, []);

  const GetFollowersList = async () => {
    try {
      if (route?.params?.user_id) {
        const response = await API.GetFollowersList(
          route?.params?.user_id,
          User.Token
        );
        if (response.ok) {
          SetFollowingList(response.data.Followers);
        } else {
          ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
        }
        SetRefreshing(false);
      } else {
        ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
      }
    } catch (error) {
      ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
    }
  };

  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetFollowersList();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  const RemoveFromFollowers = async (Remove) => {
    try {
      const response = await API.RemoveFromFollowers(
        {
          request_id: Remove,
        },
        User.Token
      );
      if (response.ok) {
        await GetFollowersList();
      } else {
        Toast.show({ text: config.messages.ServerError });
      }
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
    }
  };

  const RenderItem = ({ item }) => (
    <PeopleCard
      ProfilePicture={item.user_details.ProfilePicture}
      Name={item.user_details.Name}
      Username={item.user_details.Username}
      BaseURL={BaseURL}
      showCross={false}
      btnTitle="Remove"
      onBTNPress={() => RemoveFromFollowers(item.user_details._id)}
      showPress={route?.params?.user_id === User._id ? true : false}
      onPress={
        User._id === item.user_details._id
          ? () => navigation.goBack()
          : () =>
              navigation.navigate("PersonProfile", {
                title: item.user_details.Username,
                _id: item.user_details._id,
              })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={FollowingList}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id.toString()}
        onRefresh={onRefresh}
        refreshing={Refreshing}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

export default connect(mapStateToProps)(Followers);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
