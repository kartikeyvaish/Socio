import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

import ColorPallete from "../config/ColorPallete";
import Icon from "../components/Icon";
import Text from "../components/Text";

function NewPostMenuCard({ Name, IconName, onPress, text }) {
  return (
    <TouchableRipple
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorPallete.primary,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
      }}
      onPress={onPress}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          Name={Name}
          IconName={IconName}
          size={60}
          onPress={onPress}
          color={"white"}
        />
        <Text
          text={text}
          color={"white"}
          size={20}
          marginTop={15}
          family="InterBold"
        />
      </View>
    </TouchableRipple>
  );
}

export default NewPostMenuCard;

const styles = StyleSheet.create({
  container: {},
});
