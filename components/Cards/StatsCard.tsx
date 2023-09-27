// Packages Imports (from node_modules)
import { StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppText from "../App/AppText";

// interface for StatsCard component
export interface StatsCardProps {
  label?: string;
  value?: string;
}

// functional component for StatsCard
function StatsCard(props: StatsCardProps) {
  // Destructuring props
  const { label, value } = props;

  // render
  return (
    <AnimatedView style={styles.container}>
      <AppText text={value} fontWeight="600" size={16} />
      <AppText text={label} fontWeight="400" size={13} />
    </AnimatedView>
  );
}

// exports
export default StatsCard;

// styles for StatsCard
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
