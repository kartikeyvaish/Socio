// Packages Imports
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Switch } from "react-native-paper";

// Local components/Types imports
import AppText from "./AppText";
import { AppTextProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// interface for MenuSwitch
export interface MenuSwitchProps {
  title?: string;
  textProps?: AppTextProps;
  onPress?: () => void;
  value?: boolean;
  loading?: boolean;
}

// function components for MenuSwitch
function MenuSwitch(props: MenuSwitchProps) {
  // Destructuring props
  const { title, textProps, onPress, value, loading } = props;

  // Render
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppText text={title} size={22} {...textProps} />
      </View>

      <View style={{ width: 50 }}>
        {loading ? (
          <ActivityIndicator color={ColorPallete.primary} size={"small"} />
        ) : (
          <Switch
            onValueChange={onPress}
            value={value}
            thumbColor={value ? ColorPallete.primary : ColorPallete.white}
            trackColor={{ true: ColorPallete.dodgerBlueLight, false: ColorPallete.grey }}
          />
        )}
      </View>
    </View>
  );
}

// Exports
export default MenuSwitch;

// Styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
});
