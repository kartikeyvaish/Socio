// Packages Imports
import { View, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

// Local Imports
import AppText from "./AppText";
import FontNames from "../constants/FontNames";
import { StatsCardProps } from "../types/ComponentTypes";

// function component for StatsCard component
function StatsCard({ title, subtitle, onPress }: StatsCardProps) {
  // render
  return (
    <TouchableRipple style={styles.container} onPress={onPress}>
      <View style={styles.innerContainer}>
        <AppText text={title} size={16} numberOfLines={1} />
        <AppText
          text={subtitle}
          size={15}
          family={FontNames.PoppinsBold}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        />
      </View>
    </TouchableRipple>
  );
}

// exports
export default StatsCard;

// styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
