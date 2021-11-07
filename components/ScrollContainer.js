import React from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTheme } from "@react-navigation/native";

function ScrollContainer({
  children,
  style = {},
  backgroundColor,
  refreshing,
  onRefresh,
  contentContainerStyle = {},
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
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ flexGrow: 1, ...contentContainerStyle }}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        style={[
          styles.container,
          {
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.background,
          },
          style,
        ]}
      >
        {children}
      </ScrollView>
    </>
  );
}

export default ScrollContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
