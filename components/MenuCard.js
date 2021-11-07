import { useTheme } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";
import ColorPallete from "../config/ColorPallete";

import Icon from "./Icon";
import Text from "./Text";

function MenuCard({
  text,
  onPress,
  prefixName,
  prefixIconName,
  prefixIconColor = "grey",
  prefixLoading = false,
  showSuffixIcon = true,
  suffixName = "AntDesign",
  suffixIcon = "right",
  suffixIconColor,
  suffixLoading = false,
  showBorder = true,
  style = {},
  size = 18,
  containerPaddingLeft = 15,
  innerPadding = 10,
  verticalPadding = 3,
  color,
}) {
  const { colors, dark } = useTheme();

  return (
    <TouchableRipple
      onPress={prefixLoading === true || suffixLoading == true ? null : onPress}
      rippleColor={dark ? "rgba(255, 255, 255, .1)" : "rgba(0, 0, 0, .1)"}
    >
      <View
        style={{
          ...styles.container,
          borderBottomColor: showBorder ? "lightgrey" : "transparent",
          paddingLeft: containerPaddingLeft,
          paddingTop: verticalPadding,
          paddingBottom: verticalPadding,
          borderBottomWidth: StyleSheet.hairlineWidth / 2,
          ...style,
        }}
      >
        {prefixName ? (
          <View style={styles.prefixBox}>
            {prefixLoading ? (
              <ActivityIndicator size="small" color={ColorPallete.primary} />
            ) : (
              <Icon
                Name={prefixName}
                IconName={prefixIconName}
                color={prefixIconColor ? prefixIconColor : colors.text}
              />
            )}
          </View>
        ) : null}

        <View
          style={{
            ...styles.innerContainer,
            padding: innerPadding,
            paddingLeft: 0,
            marginLeft: prefixName ? 10 : 0,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              text={text}
              family="Inter"
              size={size}
              color={color ? color : colors.text}
            />
          </View>

          {suffixLoading ? (
            <ActivityIndicator size="small" color={ColorPallete.primary} />
          ) : showSuffixIcon === true && suffixName ? (
            <Icon
              Name={suffixName}
              IconName={suffixIcon}
              size={15}
              color={suffixIconColor ? suffixIconColor : colors.text}
            />
          ) : null}
        </View>
      </View>
    </TouchableRipple>
  );
}

export default MenuCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  prefixBox: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
