// Packages Imports (from node_modules)
import { memo } from "react";
import { View, StyleSheet } from "react-native";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppImage from "../App/AppImage";
import AppText from "../App/AppText";
import AppIcon from "../App/AppIcon";

// Named Imports
import { PostProps } from "../../types/AppTypes";

// interface for PostCardHeader component
export interface PostCardHeaderProps {
  user: PostProps["user"];
  location?: PostProps["location"];
}

// functional component for PostCardHeader
function PostCardHeader(props: PostCardHeaderProps) {
  // Destructuring props
  const { user, location } = props;

  return (
    <AnimatedView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <AppImage
          source={{ uri: user.profile_picture }}
          width={40}
          height={40}
        />

        <View style={{ marginLeft: 15, justifyContent: "center" }}>
          <AppText text={user.username} fontFamily="PoppinsMedium" size={16} />
          <AppText text={location} size={13} />
        </View>
      </View>

      <AppIcon family="Entypo" size={20} name="dots-three-vertical" />
    </AnimatedView>
  );
}

// exports
export default memo(PostCardHeader);

// styles for PostCardHeader
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
