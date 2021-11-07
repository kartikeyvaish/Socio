import React from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";

import Avatar from "../components/Avatar";
import Text from "./../components/Text";
import Helper from "../config/Helper";

const ScreenWidth = Dimensions.get("screen").width;

function NotificationsCard({
  uri,
  size = 40,
  suffixUri,
  suffixSize = 40,
  created_at,
  notification_type,
  notified_by,
  comment_details,
  onPress,
}) {
  return (
    <Pressable style={styles.FollowRequestsBar} onPress={onPress}>
      {uri ? (
        <View>
          <Avatar
            size={size}
            uri={uri}
            borderColor="grey"
            style={{ marginRight: 20, marginLeft: 15 }}
          />
        </View>
      ) : null}

      <View style={{ flex: 1 }}>
        {notification_type === "like" ? (
          <Text
            header={notified_by.Username}
            text={` liked your post`}
            numberOfLines={2}
            size={16}
          />
        ) : (
          <Text
            header={notified_by.Username}
            text={` commented on your post: ${comment_details.comment_text}`}
            numberOfLines={2}
            size={16}
          />
        )}

        <Text
          text={Helper.MessageTimeAgo(created_at)}
          numberOfLines={2}
          size={16}
        />
      </View>

      {suffixUri ? (
        <View>
          <Avatar
            size={suffixSize}
            uri={suffixUri}
            borderColor="grey"
            style={{ marginRight: 20, marginLeft: 15 }}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

export default NotificationsCard;

const styles = StyleSheet.create({
  Header: {
    justifyContent: "flex-start",
  },
  FollowRequestsBar: {
    width: ScreenWidth,
    flexDirection: "row",
    paddingBottom: 15,
  },
});
