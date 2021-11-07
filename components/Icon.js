import React from "react";
import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";

import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function Icon({
  IconName,
  Name,
  style,
  color,
  size,
  onPress,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  disabled,
}) {
  const { colors } = useTheme();

  const Props = {
    name: IconName,
    size: size,
    color: color ? color : colors.text,
    style: {
      marginLeft: marginLeft,
      marginRight: marginRight,
      marginTop: marginTop,
      marginBottom: marginBottom,
      ...style,
    },
    onPress: disabled === true ? null : onPress,
  };

  switch (Name) {
    case "Ionicons":
      return <Ionicons {...Props} />;
    case "Entypo":
      return <Entypo {...Props} />;
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons {...Props} />;
    case "AntDesign":
      return <AntDesign {...Props} />;
    case "MaterialIcons":
      return <MaterialIcons {...Props} />;
    case "Feather":
      return <Feather {...Props} />;
    case "FontAwesome":
      return <FontAwesome {...Props} />;
    default:
      return null;
  }
}

Icon.propTypes = {
  IconName: PropTypes.string,
  Name: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  disabled: PropTypes.bool,
};

Icon.defaultProps = {
  size: 25,
  disabled: false,
};

export default Icon;
