import React from "react";
import { View } from "react-native";

import Avatar from "./Avatar";
import ColorPallete from "../config/ColorPallete";
import Helper from "../config/Helper";
import Text from "./Text";

function CommentCard({
  _id,
  Comment,
  ProfilePicture,
  Username,
  DateTime,
  showDelete,
  LikeLoading,
  DeletePress,
  DeleteLoading,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        opacity: DeleteLoading ? 0.5 : 1,
        marginBottom: 10,
      }}
    >
      <View>
        <Avatar uri={ProfilePicture} size={40} showBorder={false} />
      </View>
      <View style={{ marginLeft: 15, flex: 1 }}>
        <Text text={Comment} header={Username} size={15} />
        <View style={{ flexDirection: "row" }}>
          <Text text={Helper.MessageTimeAgo(DateTime)} size={15} margin={10} />
          {showDelete ? (
            <Text
              text={"Delete"}
              size={15}
              margin={10}
              marginLeft={15}
              color={ColorPallete.red}
              onPress={
                LikeLoading === _id || DeleteLoading ? null : DeletePress
              }
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

export default CommentCard;
