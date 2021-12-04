import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { connect } from "react-redux";

import API from "../api/API";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Container from "../components/Container";
import config from "../config/config";
import Dialog from "./../components/Dialog";
import FollowRequestBTN from "../components/FollowRequestBTN";
import ProfilePostCard from "../components/ProfilePostCard";
import Text from "../components/Text";
import Toast from "../components/Toast";
import ScreenNames from "../navigation/ScreenNames";

function PersonProfile({ navigation, route, User }) {
  const [DetailsLoading, SetDetailsLoading] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [Refreshing, SetRefreshing] = useState(false);
  const [CancelConfirmationDialog, SetCancelConfirmationDialog] =
    useState(false);
  const [UnfollowConfirmationDialog, SetUnfollowConfirmationDialog] =
    useState(false);
  const [ProfileData, SetProfileData] = useState(null);

  useEffect(() => {
    GetProfileDetails();
  }, []);

  // Get Profile Details
  const GetProfileDetails = async () => {
    try {
      SetDetailsLoading(true);
      const response = await API.GetProfile(route.params._id, User.Token);
      SetDetailsLoading(false);
      if (response.ok) {
        SetProfileData(response.data);
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      SetDetailsLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  // Stats and Button with Profile Picture
  const GetProfileContainer = () => {
    return (
      <View style={styles.ProfileContainer}>
        <Avatar
          uri={ProfileData.ProfilePicture}
          size={100}
          style={{ marginTop: 15 }}
        />
        <View style={styles.RowFlex}>
          <View style={styles.CenteredFlex}>
            <Text text={ProfileData.PostsCount} family="InterBold" size={18} />
            <Text
              text="Posts"
              family="InterLight"
              size={16}
              adjustsFontSizeToFit={true}
            />
          </View>
          <Pressable
            style={styles.CenteredFlex}
            onPress={
              ProfileData.allowed_to_see_posts === true
                ? () =>
                    navigation.navigate(ScreenNames.ListPeople, {
                      initialRoute: "Followers",
                      user_id: route.params._id,
                    })
                : null
            }
          >
            <Text
              text={ProfileData.FollowersCount}
              family="InterBold"
              size={18}
            />
            <Text
              text="Followers"
              family="InterLight"
              size={16}
              adjustsFontSizeToFit={true}
            />
          </Pressable>
          <Pressable
            style={styles.CenteredFlex}
            onPress={
              ProfileData.allowed_to_see_posts === true
                ? () =>
                    navigation.navigate(ScreenNames.ListPeople, {
                      initialRoute: "Following",
                      user_id: route.params._id,
                    })
                : null
            }
          >
            <Text
              text={ProfileData.FollowingCount}
              family="InterBold"
              size={18}
            />
            <Text
              text="Following"
              family="InterLight"
              size={16}
              adjustsFontSizeToFit={true}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  // Depeding upon the conditions, the button is displayed
  const GetFollowButton = () => {
    return (
      <View style={[styles.container, styles.Seperator]}>
        <Text
          text={ProfileData.Name}
          family="InterBold"
          size={18}
          marginTop={10}
          marginBottom={10}
        />

        {ProfileData.target_recieve_request ? (
          <FollowRequestBTN
            text="Pending"
            defaultBackground={true}
            onPress={() => SetCancelConfirmationDialog(true)}
            Loading={Loading}
          />
        ) : ProfileData.target_sent_request ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
              <FollowRequestBTN
                text="Accept"
                onPress={AcceptRequest}
                Loading={Loading}
              />
            </View>
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
              <FollowRequestBTN
                text="Delete"
                defaultBackground={true}
                onPress={DeleteFollowRequest}
                Loading={Loading}
              />
            </View>
          </View>
        ) : !ProfileData.requested_follows_target &&
          ProfileData.target_follows_requested ? (
          <FollowRequestBTN
            text="Follow Back"
            onPress={SendFollowRequest}
            Loading={Loading}
          />
        ) : ProfileData.requested_follows_target ? (
          <FollowRequestBTN
            text="Following"
            defaultBackground={true}
            onPress={() => SetUnfollowConfirmationDialog(true)}
            Loading={Loading}
          />
        ) : !ProfileData.requested_follows_target &&
          !ProfileData.target_follows_requested ? (
          <FollowRequestBTN
            text="Follow"
            onPress={SendFollowRequest}
            Loading={Loading}
          />
        ) : null}
      </View>
    );
  };

  // Unsend or Delete Follow Request Confirmation Dialog
  const CancelRequestConfirmation = () => {
    return (
      <Dialog
        visible={CancelConfirmationDialog}
        hideDialog={() => SetCancelConfirmationDialog(false)}
        title="Unsend Follow Request?"
      >
        <Text
          text={`Are you sure you want to unsend follow request sent to ${ProfileData.Name}.`}
        />
        <View style={styles.DialogBTNs}>
          <View style={{ flex: 1, padding: 10 }}>
            <FollowRequestBTN
              text="Cancel"
              defaultBackground={true}
              onPress={() => SetCancelConfirmationDialog(false)}
              Loading={Loading}
            />
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            <FollowRequestBTN
              text="Yes"
              onPress={DeleteFollowRequest}
              Loading={Loading}
            />
          </View>
        </View>
      </Dialog>
    );
  };

  // Function to send a follow request
  const SendFollowRequest = async () => {
    try {
      SetLoading(true);
      const response = await API.SendFollowRequest(
        {
          request_sent_to: route.params._id,
        },
        User.Token
      );
      SetLoading(false);
      if (response.ok) {
        await GetProfileDetails();
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  // Unfollow a user Confirmation Dialog
  const UnfollowConfirmation = () => {
    return (
      <Dialog
        visible={UnfollowConfirmationDialog}
        hideDialog={() => SetUnfollowConfirmationDialog(false)}
        title={`Unfollow ${ProfileData.Name}?`}
      >
        <Text
          text={`Are you sure you want to unfollow ${ProfileData.Name}.  We will not notify them that you unfollowed them. You will have to send request again to follow them again.`}
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

  // Function to unfollow a user
  const Unfollow = async () => {
    try {
      SetUnfollowConfirmationDialog(false);
      SetLoading(true);
      const response = await API.UnFollow(
        {
          request_id: route.params._id,
        },
        User.Token
      );
      SetLoading(false);
      if (response.ok) {
        await GetProfileDetails();
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  // Function to accept a follow request
  const AcceptRequest = async () => {
    try {
      SetCancelConfirmationDialog(false);
      if (ProfileData?.request_id) {
        SetLoading(true);
        const response = await API.AcceptFollowRequest(
          {
            request_id: ProfileData.request_id,
          },
          User.Token
        );

        SetLoading(false);
        if (response.ok) {
          await GetProfileDetails();
        } else {
          Toast.show({ text: response.data });
        }
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  // Function to unsend or reject a follow request
  const DeleteFollowRequest = async () => {
    try {
      SetCancelConfirmationDialog(false);
      if (ProfileData?.request_id) {
        SetLoading(true);
        const response = await API.DeleteFollowRequest(
          {
            request_id: ProfileData.request_id,
          },
          User.Token
        );
        SetLoading(false);
        if (response.ok) {
          await GetProfileDetails();
        }
      }
    } catch (error) {
      SetLoading(false);
      Toast.show({ text: config.messages.ServerError });
    }
  };

  // Function to get the profile details
  const RefreshData = async () => {
    try {
      SetRefreshing(true);
      await GetProfileDetails();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Function to render each post card
  const RenderPostCard = ({ item }) => (
    <ProfilePostCard
      {...item}
      onPress={() =>
        navigation.navigate(ScreenNames.PostDetails, {
          _id: item._id,
          title: "Posts",
        })
      }
    />
  );

  return (
    <Container>
      {ProfileData ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={ProfileData.Posts}
            keyExtractor={(item) => item._id.toString()}
            renderItem={RenderPostCard}
            numColumns={3}
            onRefresh={RefreshData}
            ListHeaderComponent={
              <>
                {GetProfileContainer()}

                {GetFollowButton()}

                {CancelRequestConfirmation()}

                {UnfollowConfirmation()}
              </>
            }
            refreshing={Refreshing}
            contentContainerStyle={{ flex: 1 }}
            ListEmptyComponent={
              <View style={styles.CenteredFlex}>
                {ProfileData.allowed_to_see_posts ? (
                  <Text text="No Posts" family="InterBold" size={18} />
                ) : (
                  <Text
                    text="Profile is Private"
                    family="InterBold"
                    size={18}
                  />
                )}
              </View>
            }
          />
        </View>
      ) : DetailsLoading === true ? (
        <View style={styles.CenteredFlex}>
          <Text text="Fetching Data..." family="InterBold" size={18} />
        </View>
      ) : (
        <View style={styles.CenteredFlex}>
          <Text text="Error in getting Profile" family="InterBold" size={18} />
          <Button title="Retry" onPress={GetProfileDetails} marginTop={10} />
        </View>
      )}
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

export default connect(mapStateToProps)(PersonProfile);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
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
