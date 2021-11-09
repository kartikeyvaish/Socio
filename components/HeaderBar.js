import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import config from "../config/config";

import { Badge } from "react-native-paper";
import Helper from "../config/Helper";
import Icon from "./Icon";
import Text from "./Text";

const ScreenWidth = Dimensions.get("screen").width;

function HeaderBar({
  text = config.appName,
  family = "BerkshireSwash",
  showSuffixIcon = true,
  showPrefixIcon = true,
  PrefixIconSize = 32,
  PrefixIconName = "telegram",
  PrefixIconCompany = "MaterialCommunityIcons",
  PrefixIconStyle = {},
  onPrefixPress,
  SuffixIconSize = 32,
  SuffixBadgeNumber = 0,
  SuffixIconName = "telegram",
  SuffixIconCompany = "MaterialCommunityIcons",
  SuffixIconStyle = {},
  onSuffixPress,
  size = 40,
  style = {},
}) {
  return (
    <View style={[styles.container, style]}>
      {showPrefixIcon ? (
        <Icon
          Name={PrefixIconCompany}
          IconName={PrefixIconName}
          size={PrefixIconSize}
          onPress={onPrefixPress}
          style={PrefixIconStyle}
        />
      ) : null}
      <Text text={text} family={family} size={size} />
      {showSuffixIcon ? (
        <View style={{ paddingRight: SuffixBadgeNumber ? 10 : 0 }}>
          <Icon
            Name={SuffixIconCompany}
            IconName={SuffixIconName}
            size={SuffixIconSize}
            onPress={onSuffixPress}
            style={SuffixIconStyle}
          />
          {SuffixBadgeNumber ? (
            <Badge style={styles.Badge} onPress={onSuffixPress}>
              {Helper.abbreviateNumber(SuffixBadgeNumber)}
            </Badge>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  Badge: {
    position: "absolute",
    right: 0,
    top: 0,
    fontFamily: "InterBold",
  },
});
