import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

function Container({
  children,
  style,
  backgroundColor,
  statusBarBackgroundColor,
  statusBarStyle,
}) {
  const { colors, dark } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={
          statusBarStyle
            ? statusBarStyle
            : dark === false
            ? "dark-content"
            : "light-content"
        }
        backgroundColor={
          statusBarBackgroundColor
            ? statusBarBackgroundColor
            : colors.background
        }
        animated={true}
        showHideTransition="slide"
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
            ...style,
          },
        ]}
      >
        {children}
      </View>
    </>
  );
}

export default Container;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
