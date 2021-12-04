import React, { useEffect, useState, useLayoutEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { connect, useSelector } from "react-redux";

import API from "../api/API";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import Container from "../components/Container";
import config from "../config/config";
import FollowRequestBTN from "../components/FollowRequestBTN";
import Icon from "../components/Icon";
import ProfilePostCard from "../components/ProfilePostCard";
import Text from "../components/Text";
import Toast from "../components/Toast";
import StatsCard from "../components/StatsCard";
import { SetProfile } from "./../store/profile/actions";
import ScreenNames from "../navigation/ScreenNames";

function ProfileScreen({ navigation, User, SetProfile, Profile }) {
  const [Refreshing, SetRefreshing] = useState(false);
  const [Loading, SetLoading] = useState(false);

  const ProfilePosts = useSelector(
    (state) => state.ProfileState?.Profile?.Posts
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          Name="Feather"
          IconName="settings"
          marginRight={15}
          onPress={() => navigation.navigate(ScreenNames.Settings)}
        />
      ),
      headerLeft: () => (
        <Icon
          Name="AntDesign"
          IconName="arrowleft"
          marginLeft={15}
          marginRight={5}
          onPress={() => navigation.goBack()}
        />
      ),
      headerTitle: Profile?.Username || User?.Username || "Profile",
    });
  }, [navigation, Profile, User]);

  useEffect(() => {
    InitialLoad();
  }, []);

  // Initial Load of Profile
  const InitialLoad = async () => {
    try {
      SetLoading(true);
      await GetProfileDetails();
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // API call to get Profile details
  const GetProfileDetails = async () => {
    try {
      const response = await API.GetProfile(User._id, User.Token);
      if (response.ok) {
        SetProfile(response.data);
      } else {
        Toast.show({ text: response.data });
      }
    } catch (error) {
      Toast.show({ text: config.messages.ServerError });
    }
  };

  // Render Profile Stats Container
  const GetProfileContainer = () => {
    return (
      <View style={styles.Seperator}>
        <View style={styles.ProfileContainer}>
          <Avatar
            uri={User.ProfilePicture}
            size={100}
            style={{ marginTop: 15 }}
            showBorder={false}
          />
          <View style={styles.RowFlex}>
            <StatsCard title="Posts" count={Profile?.PostsCount || 0} />
            <StatsCard
              title="Followers"
              count={Profile?.FollowersCount || 0}
              onPress={() =>
                navigation.navigate(ScreenNames.ListPeople, {
                  initialRoute: "Followers",
                  user_id: User._id,
                })
              }
            />
            <StatsCard
              title="Following"
              count={Profile?.FollowingCount || 0}
              onPress={() =>
                navigation.navigate(ScreenNames.ListPeople, {
                  initialRoute: "Following",
                  user_id: User._id,
                })
              }
            />
          </View>
        </View>
        <Text
          text={User.Name}
          family="InterBold"
          size={18}
          marginTop={10}
          marginBottom={User.Bio ? 0 : 10}
          marginLeft={15}
        />

        {User.Bio ? (
          <Text
            text={User.Bio}
            size={15}
            marginTop={5}
            marginBottom={15}
            marginLeft={15}
          />
        ) : null}

        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <FollowRequestBTN
            text="Edit Profile"
            defaultBackground={true}
            onPress={() =>
              navigation.navigate(ScreenNames.EditProfile, {
                ...User,
              })
            }
          />
        </View>
      </View>
    );
  };

  // API call for refresh
  const RefreshData = async () => {
    try {
      SetRefreshing(true);
      await GetProfileDetails();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // Render Profile Posts card
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
      {GetProfileContainer()}

      <View style={{ flex: 1 }}>
        {Profile ? (
          <FlatList
            data={ProfilePosts || []}
            keyExtractor={(item) => item._id.toString()}
            renderItem={RenderPostCard}
            numColumns={3}
            onRefresh={RefreshData}
            refreshing={Refreshing}
            ListEmptyComponent={
              <View style={styles.CenteredFlex}>
                <Text text="No Posts" family="InterBold" size={18} />
              </View>
            }
          />
        ) : Loading ? (
          <View style={styles.CenteredFlex}>
            <Text text="Loading Profile" family="InterBold" size={18} />
          </View>
        ) : (
          <View style={styles.CenteredFlex}>
            <Text
              text="Error in getting profile"
              family="InterBold"
              size={18}
            />
            <Button title="Retry" onPress={GetProfileDetails} marginTop={10} />
          </View>
        )}
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
    Profile: state.ProfileState.Profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetProfile: (profile) => dispatch(SetProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

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
  HeaderBar: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
});
