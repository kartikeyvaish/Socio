import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";

import Avatar from "./Avatar";
import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";
import Text from "./Text";

// const InstaColours = ["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"];
const InstaColours = [ColorPallete.primary, ColorPallete.blue];

function StoryButton({
  onPress,
  ProfilePicture,
  Username,
  Owner,
  showBorder = true,
}) {
  const { colors } = useTheme();

  return (
    <View style={styles.EachStoryBox}>
      <Pressable onPress={onPress}>
        <View style={styles.EachCircleOuter}>
          {showBorder ? (
            <LinearGradient
              colors={InstaColours}
              style={styles.GradientStyle}
              start={[0, 1]}
              end={[1, 0]}
            >
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 100,
                }}
              >
                <Avatar uri={ProfilePicture} size={65} showBorder={false} />
              </View>
            </LinearGradient>
          ) : (
            <View
              style={{
                backgroundColor: colors.background,
                borderRadius: 100,
              }}
            >
              <Avatar uri={ProfilePicture} size={65} showBorder={false} />
            </View>
          )}
        </View>
        {Owner ? (
          <View style={styles.PLusBTNBox}>
            <Icon
              Name="AntDesign"
              IconName="pluscircle"
              size={20}
              color={ColorPallete.primary}
            />
          </View>
        ) : null}
      </Pressable>
      <Text text={Username} size={12} numberOfLines={1} marginTop={5} />
    </View>
  );
}

export default StoryButton;

const styles = StyleSheet.create({
  EachStoryBox: {
    width: 75,
    height: "auto",
    margin: 5,
    marginRight: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  EachCircleOuter: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  GradientStyle: {
    alignItems: "center",
    padding: 3,
    overflow: "hidden",
  },
  ImageStyle: {
    height: 65,
    width: 65,
    borderRadius: 50,
  },
  PLusBTNBox: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    right: 5,
    borderRadius: 100,
  },
});
