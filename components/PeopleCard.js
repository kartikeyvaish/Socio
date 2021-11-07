import React from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";

import Avatar from "./Avatar";
import Icon from "./Icon";
import Text from "./Text";
import Button from "./Button";

const ScreenWidth = Dimensions.get("screen").width;

function PeopleCard({
  ProfilePicture,
  Name,
  Username,
  onPress,
  btnTitle,
  onBTNPress,
  showPress = false,
}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={{ marginLeft: 5 }}>
        <Avatar uri={ProfilePicture} size={50} showBorder={false} />
      </View>
      <View style={{ flex: 1, marginLeft: 20, marginTop: 5 }}>
        <Text text={Name} family="InterBold" />
        <Text text={Username} />
      </View>
      {showPress ? (
        <View style={{ justifyContent: "center", marginRight: 15 }}>
          <Button title={btnTitle} onPress={onBTNPress} />
        </View>
      ) : null}
    </Pressable>
  );
}

export default PeopleCard;

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
