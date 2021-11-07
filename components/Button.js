import React from "react";
import { Button as BTN } from "react-native-paper";
import PropTypes from "prop-types";

import ColorPallete from "../config/ColorPallete";
import { useTheme } from "@react-navigation/native";

function Button({
  title,
  mode,
  onPress,
  style,
  loading,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  labelStyle,
  labelColor,
  disabled,
  icon,
  uppercase,
  backgroundColor = null,
  width,
  contentStyle = {},
}) {
  const { colors } = useTheme();

  const Themes = {
    colors: {
      ...colors,
      primary: ColorPallete.primary,
    },
  };

  return (
    <BTN
      mode={"contained"}
      onPress={loading === true ? null : onPress}
      icon={icon}
      theme={Themes}
      style={{
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
        marginBottom: marginBottom,
        backgroundColor: backgroundColor ? backgroundColor : colors.background,
        opacity: loading === true ? 0.5 : disabled ? 0.5 : 1,
        width: width,
        ...style,
      }}
      uppercase={uppercase}
      labelStyle={{ color: labelColor, ...labelStyle }}
      loading={loading}
      disabled={loading === true ? true : disabled}
      contentStyle={contentStyle}
    >
      {title}
    </BTN>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  mode: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  loading: PropTypes.bool,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginBottom: PropTypes.number,
  labelStyle: PropTypes.object,
  labelColor: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  uppercase: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  title: "Here",
  mode: "outlined",
  style: {},
  loading: false,
  labelColor: "white",
  icon: null,
  uppercase: false,
  backgroundColor: ColorPallete.primary,
};

export default Button;
