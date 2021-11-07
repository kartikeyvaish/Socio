import React from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";

import Avatar from "./Avatar";
import Button from "./Button";
import Text from "./Text";
import { useTheme } from "@react-navigation/native";

const ScreenWidth = Dimensions.get("screen").width;

function RequestCard(props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onProfilePress}>
        <Avatar size={35} uri={props.user_details.ProfilePicture} />
      </Pressable>

      <Pressable style={styles.Names} onPress={props.onProfilePress}>
        <Text text={props.user_details.Name} family="InterBold" />
        <Text text={props.user_details.Username} />
      </Pressable>

      <View style={styles.BTNSContainer}>
        <Button
          title="Accept"
          onPress={props.onAccept}
          loading={props.loading}
        />
        <Button
          title="Decline"
          backgroundColor={colors.background}
          labelColor={colors.text}
          onPress={props.onDecline}
          loading={props.loading}
        />
      </View>
    </View>
  );
}

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    padding: 20,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  Names: { marginLeft: 10, flex: 1 },
  BTNSContainer: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
