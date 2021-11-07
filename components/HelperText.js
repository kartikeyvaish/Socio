import * as React from "react";
import { View } from "react-native";
import { HelperText as HT } from "react-native-paper";
import PropTypes from "prop-types";

import ColorPallete from "../config/ColorPallete";

import Icon from "./Icon";

function HelperText({
  text,
  visible,
  type,
  padding,
  size = 14,
  alignSelf,
  style,
  color,
  Name,
  IconName,
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Name ? (
        <Icon
          Name={Name}
          IconName={IconName}
          color={color ? color : type === "error" ? ColorPallete.red : "black"}
        />
      ) : null}
      <HT
        type={type}
        visible={visible}
        padding={padding}
        style={{
          alignSelf: alignSelf,
          fontSize: size,
          color: color ? color : type === "error" ? ColorPallete.red : "black",
          fontFamily: "Inter",
          ...style,
        }}
      >
        {text}
      </HT>
    </View>
  );
}

HelperText.propTypes = {
  text: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.string,
  padding: PropTypes.string,
  size: PropTypes.number,
  alignSelf: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string,
  Name: PropTypes.string,
  IconName: PropTypes.string,
};

HelperText.defaultProps = {
  type: "error",
  padding: "normal",
  size: 14,
  alignSelf: "flex-start",
  visible: true,
};

export default HelperText;
