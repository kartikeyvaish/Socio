import React from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

import Text from "./Text";

function StatsCard({ count, onPress, title }) {
  return (
    <TouchableRipple style={styles.CenteredFlex} onPress={onPress}>
      <>
        <Text text={count} family="InterBold" size={18} />
        <Text
          text={title}
          family="InterLight"
          size={16}
          adjustsFontSizeToFit={true}
        />
      </>
    </TouchableRipple>
  );
}

export default StatsCard;

const styles = StyleSheet.create({
  CenteredFlex: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
