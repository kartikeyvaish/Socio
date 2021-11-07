import React from "react";
import { View, Text as AppText } from "react-native";
import { useTheme } from "@react-navigation/native";

function Text({
  text = "",
  containerStyle = {},
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  family = "Inter",
  size,
  color,
  weight = "normal",
  style,
  letterSpacing,
  adjustsFontSizeToFit,
  numberOfLines,
  onPress,
  header,
  onHeaderPress,
  headerColor,
}) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        ...containerStyle,
        margin: margin,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
      }}
    >
      {header ? (
        <AppText
          style={{
            fontFamily: "InterBold",
            color: headerColor ? headerColor : colors.text,
            fontSize: size,
          }}
          numberOfLines={numberOfLines}
          onPress={onHeaderPress}
        >
          {header + " "}
          <AppText
            style={{
              fontFamily: family,
              fontSize: size,
              color: color ? color : colors.text,
              fontWeight: weight,
              ...style,
              letterSpacing: letterSpacing,
            }}
            adjustsFontSizeToFit={adjustsFontSizeToFit}
            numberOfLines={numberOfLines}
            onPress={onPress}
          >
            {text}
          </AppText>
        </AppText>
      ) : (
        <AppText
          style={{
            fontFamily: family,
            fontSize: size,
            color: color ? color : colors.text,
            fontWeight: weight,
            ...style,
            letterSpacing: letterSpacing,
          }}
          adjustsFontSizeToFit={adjustsFontSizeToFit}
          numberOfLines={numberOfLines}
          onPress={onPress}
        >
          {text}
        </AppText>
      )}
    </View>
  );
}

export default Text;
