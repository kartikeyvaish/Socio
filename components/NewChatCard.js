import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

import Avatar from "./Avatar";
import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";
import Text from "./Text";

function NewChatCard({
  _id,
  ProfilePicture,
  Username,
  Name,
  onPress,
  Selected = null,
  showCirlce = true,
}) {
  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Avatar uri={ProfilePicture} size={50} />
        <View style={styles.NameUsername}>
          <Text text={Name} numberOfLines={1} family={"InterBold"} />
          <Text text={Username} size={16} />
        </View>
        {showCirlce ? (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            {Selected?._id === _id ? (
              <Icon
                Name="AntDesign"
                IconName="checkcircle"
                color={ColorPallete.primary}
              />
            ) : (
              <Icon Name="Entypo" IconName="circle" />
            )}
          </View>
        ) : null}
      </View>
    </TouchableRipple>
  );
}

export default NewChatCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  NameUsername: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 50,
  },
  Username: {
    fontSize: 16,
    marginLeft: 15,
  },
  Name: {
    marginLeft: 15,
    width: "50%",
  },
  Time: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
