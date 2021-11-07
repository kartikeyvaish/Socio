import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, StatusBar, KeyboardAvoidingView } from "react-native";

function KeyboardView({
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
      <KeyboardAvoidingView
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
      </KeyboardAvoidingView>
    </>
  );
}

export default KeyboardView;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
