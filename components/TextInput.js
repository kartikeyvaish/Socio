import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { HelperText, TextInput as Input } from "react-native-paper";

import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

function TextInput({
  onChangeText,
  style = {},
  label,
  keyboardType,
  mode = "outlined",
  maxLength,
  disabled,
  value,
  secureTextEntry,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom = 0,
  error,
  errorVisibilty = false,
  helperPadding = "none",
  onSubmit,
  normalText,
  onKeyPress,
  customTheme,
  onBlur,
  caretHidden = false,
  letterSpacing = 0,
  initalPasswordShow = false,
  editable = true,
  multiline = false,
  normalTextColor = null,
}) {
  const [ShowPassword, SetShowPassword] = useState(initalPasswordShow);

  const { colors } = useTheme();

  const HiddenRender = () => (
    <Icon
      Name="Ionicons"
      IconName={ShowPassword === false ? "md-eye" : "md-eye-off"}
      size={24}
      style={{ paddingTop: 0 }}
      color={error && errorVisibilty ? ColorPallete.red : colors.text}
    />
  );

  const Themes = {
    colors: {
      ...colors,
      underlineColor: colors.text,
      placeholder: colors.text,
      error: ColorPallete.red,
    },
  };

  return (
    <>
      <Input
        onChangeText={onChangeText}
        style={{
          marginLeft: marginLeft,
          marginRight: marginRight,
          marginTop: marginTop,
          marginBottom: error || normalText ? 6 : marginBottom,
          backgroundColor: colors.background,
          width: "100%",
          maxHeight: 150,
          ...style,
        }}
        label={label}
        placeholderTextColor={colors.text}
        mode={mode}
        caretHidden={caretHidden}
        keyboardType={keyboardType}
        maxLength={maxLength}
        disabled={disabled}
        onBlur={onBlur}
        underlineColor={colors.text}
        value={value}
        onKeyPress={onKeyPress}
        editable={editable}
        outlineColor={colors.text}
        multiline={multiline}
        onSubmitEditing={onSubmit}
        letterSpacing={letterSpacing}
        secureTextEntry={secureTextEntry ? !ShowPassword : secureTextEntry}
        right={
          secureTextEntry === true ? (
            <Input.Icon
              name={() => HiddenRender()}
              onPress={() => SetShowPassword(!ShowPassword)}
            />
          ) : null
        }
        theme={customTheme ? customTheme : Themes}
        error={errorVisibilty === true && error}
      />

      <HelperText
        type={normalText ? "info" : "error"}
        visible={normalText ? true : errorVisibilty}
        padding={helperPadding}
        style={{
          fontSize: 13,
          color: normalTextColor
            ? normalTextColor
            : normalText
            ? colors.text
            : ColorPallete.red,
          fontFamily: "Inter",
          ...style,
        }}
      >
        {error ? error : normalText}
      </HelperText>
    </>
  );
}

export default TextInput;
