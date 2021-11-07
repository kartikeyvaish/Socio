import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import ColorPallete from "../config/ColorPallete";
import Text from "./Text";
import { ActivityIndicator } from "react-native";
import { TouchableRipple } from "react-native-paper";

function FollowRequestBTN({
  defaultBackground,
  backgroundColor = ColorPallete.primary,
  Loading = false,
  labelColor = "white",
  onPress,
  borderColor,
  text = "Follow",
}) {
  const { colors, dark } = useTheme();

  return (
    <TouchableRipple
      style={[
        styles.container,
        {
          backgroundColor: defaultBackground
            ? colors.background
            : backgroundColor,
          opacity: Loading ? 0.5 : 1,
          borderColor: defaultBackground ? colors.text : borderColor,
          borderWidth: defaultBackground
            ? StyleSheet.hairlineWidth
            : borderColor
            ? StyleSheet.hairlineWidth
            : 0,
        },
      ]}
      onPress={onPress}
    >
      <>
        {Loading ? (
          <ActivityIndicator
            size="small"
            color={defaultBackground ? colors.text : labelColor}
            style={{ marginRight: 10 }}
          />
        ) : null}
        <Text
          text={text}
          family="InterBold"
          size={16}
          color={defaultBackground ? colors.text : labelColor}
        />
      </>
    </TouchableRipple>
  );
}

export default FollowRequestBTN;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
  },
});
