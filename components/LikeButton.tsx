// Packages Imports
import { useEffect, useRef, useState } from "react";
import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import Animated, { BounceIn } from "react-native-reanimated";

// components/types imports
import AppIcon from "./AppIcon";
import ColorPallete from "../constants/ColorPallete";
import IconNames from "../constants/IconNames";
import { LikeButtonProps } from "../types/ComponentTypes";

// function component for LikeButton
function LikeButton(props: LikeButtonProps) {
  // Destructuring props
  const { isLiked, onLikePress, onUnLikePress, size = 30 } = props;
  const isFirstRender = useRef(true);

  // update that the component has rendered once
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Local States
  const [IsLiked, SetIsLiked] = useState(isLiked);

  // containerStyles
  const containerStyles: StyleProp<ViewStyle> = [
    { width: size + 10, height: size + 10 },
    styles.container,
  ];

  // API call to like the Post
  const LikePost = async () => {
    try {
      if (typeof onLikePress === "function") onLikePress();
      SetIsLiked(true);
    } catch (error) {}
  };

  // API call to unlike the Post
  const UnlikePost = async () => {
    try {
      if (typeof onUnLikePress === "function") onUnLikePress();
      SetIsLiked(false);
    } catch (error) {}
  };

  // render
  return (
    <>
      {IsLiked ? (
        <Animated.View style={containerStyles} entering={isFirstRender.current ? null : BounceIn}>
          <AppIcon
            family={IconNames.AntDesign}
            name="heart"
            size={size}
            color={ColorPallete.danger}
            onPress={UnlikePost}
          />
        </Animated.View>
      ) : null}

      {!IsLiked ? (
        <Animated.View style={containerStyles} entering={isFirstRender.current ? null : BounceIn}>
          <AppIcon family={IconNames.AntDesign} name="hearto" size={size} onPress={LikePost} />
        </Animated.View>
      ) : null}
    </>
  );
}

// exports
export default LikeButton;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
