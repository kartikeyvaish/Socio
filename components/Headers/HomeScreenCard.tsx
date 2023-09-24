// Packages Imports (from node_modules)
import { View, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// Local Imports (components/types/utils)
import AppIcon from "../App/AppIcon";
import AppText from "../App/AppText";

// interface for HomeScreenCard component
export interface HomeScreenCardProps {
  onCameraPress?: () => void;
  onSendPress?: () => void;
  label?: string;
}

// functional component for HomeScreenCard
function HomeScreenCard(props: HomeScreenCardProps) {
  // Destructuring props
  const { onCameraPress, onSendPress, label = "Socio" } = props;

  // render
  return (
    <View style={styles.container}>
      <RectButton style={styles.iconContainer} onPress={onCameraPress}>
        <AppIcon family="Feather" name="camera" size={25} />
      </RectButton>

      <AppText
        text={label}
        adjustsFontSizeToFit
        numberOfLines={1}
        size={35}
        fontFamily="BerkshireSwash"
      />

      <RectButton style={styles.iconContainer} onPress={onSendPress}>
        <AppIcon family="Feather" name="send" size={25} />
      </RectButton>
    </View>
  );
}

// exports
export default HomeScreenCard;

// styles for HomeScreenCard
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  iconContainer: { padding: 10, borderRadius: 30 },
});
