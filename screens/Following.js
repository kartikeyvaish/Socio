import React, { useEffect, useState } from "react";
import { View, StyleSheet, ToastAndroid, FlatList } from "react-native";

import API from "../api/API";
import config from "../config/config";
import PeopleCard from "../components/PeopleCard";
import Dialog from "../components/Dialog";
import Text from "../components/Text";
import FollowRequestBTN from "../components/FollowRequestBTN";
import Toast from "../components/Toast";
import { connect } from "react-redux";

const BaseURL = config.URLs.BaseURL;

function Following({ navigation, route, User }) {
  const [Refreshing, SetRefreshing] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [FollowingList, SetFollowingList] = useState([]);
  const [UnfollowConfirmationDialog, SetUnfollowConfirmationDialog] =
    useState(false);
  const [Selected, SetSelected] = useState(null);

  useEffect(() => {
    GetFollowingList();
  }, []);

  const GetFollowingList = async () => {
    try {
      if (route?.params?.user_id) {
        const response = await API.GetFollowingList(
          route?.params?.user_id,
          User.Token
        );
        if (response.ok) {
          SetFollowingList(response.data.Following);
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

  const RenderItem = ({ item }) => (
    <PeopleCard
      ProfilePicture={item.user_details.ProfilePicture}
      Name={item.user_details.Name}
      Username={item.user_details.Username}
      showCross={false}
      btnTitle="Following"
      onPress={
        User._id === item.user_details._id
          ? () => navigation.goBack()
          : () =>
              navigation.navigate("PersonProfile", {
                title: item.user_details.Username,
                _id: item.user_details._id,
              })
      }
      showPress={route?.params?.user_id === User._id ? true : false}
      onBTNPress={() => {
        SetSelected(item);
        SetUnfollowConfirmationDialog(true);
      }}
    />
  );

  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetFollowingList();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  const UnfollowConfirmation = () => {
    return (
      <Dialog
        visible={UnfollowConfirmationDialog}
        hideDialog={() => SetUnfollowConfirmationDialog(false)}
        title={`Unfollow ${Selected.user_details.Name}?`}
      >
        <Text
          text={`Are you sure you want to unfollow ${Selected.user_details.Name}.  We will not notify them that you unfollowed them. You will have to send request again to follow them again.`}
        />
        <View style={styles.DialogBTNs}>
          <View style={{ flex: 1, padding: 10 }}>
            <FollowRequestBTN
              text="Cancel"
              defaultBackground={true}
              onPress={() => SetUnfollowConfirmationDialog(false)}
              Loading={Loading}
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <FollowRequestBTN text="Yes" onPress={Unfollow} Loading={Loading} />
          </View>
        </View>
      </Dialog>
    );
  };

  const Unfollow = async () => {
    try {
      SetUnfollowConfirmationDialog(false);
      SetLoading(true);
      const response = await API.UnFollow(
        {
          request_id: Selected.user_details._id,
        },
        User.Token
      );
      SetLoading(false);
      if (response.ok) {
        SetSelected(null);
        await GetFollowingList();
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={FollowingList}
        renderItem={RenderItem}
        keyExtractor={(item) => item._id.toString()}
        onRefresh={onRefresh}
        refreshing={Refreshing}
      />
      {Selected ? UnfollowConfirmation() : null}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

export default connect(mapStateToProps)(Following);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ProfileContainer: {
    width: "100%",
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 15,
  },
  RowFlex: { flex: 1, flexDirection: "row" },
  CenteredFlex: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  DialogBTNs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  Seperator: {
    borderBottomColor: "grey",
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
