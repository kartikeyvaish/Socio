import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MODAL from "react-native-modal";

function Modal({ onBackButtonPress, isVisible, children, propagateSwipe }) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MODAL
        isVisible={isVisible}
        onBackButtonPress={onBackButtonPress}
        animationInTiming={1}
        animationOutTiming={1}
        avoidKeyboard={false}
        backdropColor={"rgba(0, 0, 0, 0.5)"}
        backdropOpacity={1}
        style={{
          padding: 0,
          margin: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        propagateSwipe={propagateSwipe}
        onBackdropPress={onBackButtonPress}
      >
        <View style={{ backgroundColor: colors.background }}>{children}</View>
      </MODAL>
    </View>
  );
}

export default Modal;

const styles = StyleSheet.create({
  container: {},
});
