// Packages Imports
import { Fragment, useEffect, useRef, useState } from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Animated, { BounceIn } from 'react-native-reanimated';

// Local Imports
import colorPallete from '../../constants/colorPallete';
import Icon from '../Icon';

// components/types imports
interface LikeButtonProps {
  isLiked: boolean;
  onLikePress?: () => void;
  onUnLikePress?: () => void;
  size?: number;
}

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
  const [isLocalLiked, setIsLocalLiked] = useState(isLiked);

  // containerStyles
  const containerStyles: StyleProp<ViewStyle> = [{ width: size, height: size }, styles.container];

  // API call to like the Post
  const LikePost = async () => {
    try {
      if (typeof onLikePress === 'function') onLikePress();
      setIsLocalLiked(true);
    } catch (error) {}
  };

  // API call to unlike the Post
  const UnlikePost = async () => {
    try {
      if (typeof onUnLikePress === 'function') onUnLikePress();
      setIsLocalLiked(false);
    } catch (error) {}
  };

  // render
  return (
    <Fragment>
      {isLocalLiked ? (
        <Animated.View style={containerStyles} entering={isFirstRender.current ? null : BounceIn}>
          <Icon
            family={'AntDesign'}
            name="heart"
            size={size}
            color={colorPallete.danger}
            onPress={UnlikePost}
          />
        </Animated.View>
      ) : null}

      {!isLocalLiked ? (
        <Animated.View style={containerStyles}>
          <Icon family={'AntDesign'} name="hearto" size={size} onPress={LikePost} />
        </Animated.View>
      ) : null}
    </Fragment>
  );
}

// exports
export default LikeButton;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
