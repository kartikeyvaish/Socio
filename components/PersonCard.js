import React from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";

import Avatar from "./Avatar";
import Icon from "./Icon";
import Text from "./Text";

const ScreenWidth = Dimensions.get("screen").width;

function PersonCard({ ProfilePicture, Name, Username, showCross, onPress }) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ marginLeft: 5 }}>
        <Avatar uri={ProfilePicture} size={50} showBorder={false} />
      </View>
      <View style={{ flex: 1, marginLeft: 20, marginTop: 5 }}>
        <Text text={Name} family="InterBold" />
        <Text text={Username} />
      </View>
      {showCross ? (
        <View style={{ justifyContent: "center" }}>
          <Icon Name="Entypo" IconName="cross" />
        </View>
      ) : null}
    </Pressable>
  );
}

export default PersonCard;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    padding: 10,
    flexDirection: "row",
    paddingLeft: 15,
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
