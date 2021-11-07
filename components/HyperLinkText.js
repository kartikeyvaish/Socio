import React from "react";
import { Text } from "react-native";

function HyperLinkText({
  Title,
  onPress,
  size = 15,
  color = "dodgerblue",
  family = "Inter",
}) {
  return (
    <>
      <Text
        style={{
          color: color,
          fontSize: size,
          fontFamily: family,
          textDecorationLine: "underline",
        }}
        onPress={onPress}
      >
        {Title}
      </Text>
    </>
  );
}

export default HyperLinkText;
