import * as React from "react";
import { Dialog as DG, Portal } from "react-native-paper";
import { useTheme } from "@react-navigation/native";
import ColorPallete from "../config/ColorPallete";

function Dialog({
  visible,
  hideDialog,
  title,
  children,
  contentStyle = {},
  style = {},
}) {
  const { colors } = useTheme();

  return (
    <Portal>
      <DG
        visible={visible}
        onDismiss={hideDialog}
        style={{ backgroundColor: colors.background, ...style }}
        theme={{
          colors: {
            ...colors,
            underlineColor: colors.text,
            placeholder: colors.text,
            error: ColorPallete.red,
          },
        }}
      >
        {title ? <DG.Title>{title}</DG.Title> : null}
        <DG.Content style={contentStyle}>{children}</DG.Content>
      </DG>
    </Portal>
  );
}

export default Dialog;
