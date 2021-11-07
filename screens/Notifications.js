import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
} from "react-native";
import { Badge } from "react-native-paper";
import { connect } from "react-redux";

import API from "../api/API";
import Avatar from "../components/Avatar";
import ColorPallete from "../config/ColorPallete";
import Container from "./../components/Container";
import Helper from "../config/Helper";
import HeaderBar from "./../components/HeaderBar";
import NotificationsCard from "../components/NotificationsCard";
import Text from "./../components/Text";

const ScreenWidth = Dimensions.get("screen").width;

function Notifications({ navigation, User }) {
  const [Notifications, SetNotifications] = useState([]);
  const [PreviewRequestPicture, SetPreviewRequestPicture] = useState(null);
  const [RequestsCount, SetRequestsCount] = useState(0);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    InitialLoad();
  }, []);

  const InitialLoad = async () => {
    try {
      await GetAllNotification();
    } catch (error) {}
  };

  const Refresh = async () => {
    try {
      SetLoading(true);
      await GetAllNotification();
      SetLoading(false);
    } catch (error) {}
  };

  const GetAllNotification = async () => {
    try {
      const response = await API.GetNotifications(User.Token);
      if (response.ok) {
        SetNotifications(response.data.Notifications);

        SetPreviewRequestPicture(response.data.PreviewRequestPicture);
        SetRequestsCount(response.data.FollowRequestsCount);
      }
    } catch (error) {
      SetLoading(false);
    }
  };

  const EmptyRender = () => (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        text="No Activity as of now"
        marginTop={20}
        size={20}
        family="InterBold"
      />
    </View>
  );

  return (
    <Container style={styles.container}>
      <HeaderBar
        showSuffixIcon={false}
        PrefixIconCompany="AntDesign"
        PrefixIconName="arrowleft"
        PrefixIconSize={25}
        PrefixIconStyle={{ marginLeft: 10, marginRight: 20 }}
        onPrefixPress={() => navigation.goBack()}
        style={styles.Header}
        size={25}
        family="Inter"
        text="Activity"
      />

      {RequestsCount ? (
        <Pressable style={styles.FollowRequestsBar}>
          <View style={{ marginRight: 20, marginLeft: 20 }}>
            <Avatar size={50} uri={PreviewRequestPicture} borderColor="grey" />

            {RequestsCount ? (
              <Badge
                style={{
                  position: "absolute",
                  backgroundColor: ColorPallete.primary,
                  fontFamily: "InterBold",
                }}
              >
                {Helper.abbreviateNumber(RequestsCount)}
              </Badge>
            ) : null}
          </View>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => navigation.navigate("FollowRequests")}
          >
            <Text text="Follow Requests" size={20} family="InterBold" />
            <Text text="Accept or decline follow requests" />
          </Pressable>
        </Pressable>
      ) : null}

      <View style={{ marginTop: 10, flex: 1 }}>
        <FlatList
          data={Notifications}
          contentContainerStyle={{ flex: 1 }}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={EmptyRender}
          renderItem={({ item }) => (
            <NotificationsCard
              {...item}
              uri={item.notified_by.ProfilePicture}
              suffixUri={item.post_details.preview_file}
              created_at={item.created_at}
              notification_type={item.notification_type}
              onPress={() =>
                navigation.navigate("PostDetails", {
                  _id: item.post_details._id,
                  title: "Post",
                })
              }
            />
          )}
          onRefresh={Refresh}
          refreshing={Loading}
        />
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.User,
  };
};

export default connect(mapStateToProps)(Notifications);

const styles = StyleSheet.create({
  Header: {
    justifyContent: "flex-start",
  },
  FollowRequestsBar: {
    width: ScreenWidth,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 15,
  },
});
