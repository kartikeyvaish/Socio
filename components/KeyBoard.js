import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { TouchableRipple } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";
import { ActivityIndicator } from "react-native";

const ScreenWidth = Dimensions.get("screen").width;

function KeyBoard({
  onChangeText = () => {},
  onSubmit = () => {},
  onPickPress = () => {},
  value = "",
  placeholder = "Type a Message",
  showFilePicker = true,
  color,
  Loading,
  backgroundColor,
  containerStyle = {},
  onKeyPress = () => {},
}) {
  const { colors, dark } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.KeybaordAndFileIconBox,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
          },
        ]}
      >
        <TextInput
          style={[styles.TextInput, { color: color ? color : colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={color ? color : colors.text}
          multiline={true}
          onChangeText={onChangeText}
          value={value}
          onKeyPress={onKeyPress}
        />
        {showFilePicker ? (
          <TouchableRipple
            style={{
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 120,
              marginLeft: 5,
              marginRight: 10,
              backgroundColor: dark
                ? "rgba(255,255,255,0.1)"
                : "rgba(0,0,0,0.1)",
            }}
            borderless
            onPress={onPickPress}
          >
            <View
              style={{
                overflow: "hidden",
                padding: 10,
                borderRadius: 120,
                backgroundColor: dark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.1)",
              }}
            >
              <Icon Name="Entypo" IconName="attachment" size={20} />
            </View>
          </TouchableRipple>
        ) : null}
      </View>
      <Pressable style={[styles.SubmitIcon]} onPress={onSubmit}>
        {Loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Icon Name="Ionicons" IconName="send" size={20} color="white" />
        )}
      </Pressable>
    </View>
  );
}

export default KeyBoard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  KeybaordAndFileIconBox: {
    flex: 1,
    height: "auto",
    maxHeight: 120,
    flexDirection: "row",
    paddingLeft: 5,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  TextInput: {
    flex: 1,
    height: "auto",
    maxHeight: 120,
    paddingLeft: 10,
    paddingRight: 15,
  },
  SubmitIcon: {
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 120,
    backgroundColor: ColorPallete.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
});
