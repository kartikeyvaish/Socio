import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

import Text from "../components/Text";
import ColorPallete from "../config/ColorPallete";

function LoadingScreen({
  loadingText = "Fetching Data",
  loading = true,
  color = ColorPallete.primary,
  size = 18,
}) {
  return (
    <View style={styles.LoadingScreen}>
      {loading ? <ActivityIndicator size="large" color={color} /> : null}
      <Text text={loadingText} size={size} marginTop={15} color={color} />
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  LoadingScreen: { flex: 1, justifyContent: "center", alignItems: "center" },
});
