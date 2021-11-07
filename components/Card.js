import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

function Card({
  children,
  elevation = 10,
  paddingLeft,
  paddingRight,
  paddingBottom,
  paddingTop,
  padding,
  style = {},
  borderWidth = StyleSheet.hairlineWidth,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: "100%",
        padding,
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
      }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          elevation: elevation,
          borderRadius: 12,
          borderColor: colors.primary,
          borderWidth: borderWidth,
          ...style,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({
  container: {},
});
