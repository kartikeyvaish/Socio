// Packages Imports
import { View, StyleSheet } from "react-native";

// Local Imports
import AppButton from "./AppButton";
import AppText from "./AppText";
import ColorPallete from "../constants/ColorPallete";

// interface for Permission Card
export interface PermissionCardProps {
  permissionLabel?: string;
  buttonTitle?: string;
  onButtonPress?: () => void;
}

// function component for PermissionsCard
function PermissionsCard(props: PermissionCardProps) {
  // Destructuring props
  const { permissionLabel, buttonTitle, onButtonPress } = props;

  // render
  return (
    <View style={styles.emptyContainer}>
      <AppText
        text={permissionLabel}
        color={ColorPallete.white}
        size={16}
        onPress={() => {}}
        style={{ textAlign: "center" }}
        marginBottom={20}
      />

      <AppButton
        title={buttonTitle}
        mode="outlined"
        color={ColorPallete.white}
        onPress={onButtonPress}
        roundness={100}
        elevation={0}
        style={{ borderWidth: 1, borderColor: ColorPallete.primary }}
      />
    </View>
  );
}

// exports
export default PermissionsCard;

// styles
const styles = StyleSheet.create({
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
});
