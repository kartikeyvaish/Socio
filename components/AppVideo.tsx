// Packages Imports
import { forwardRef, MutableRefObject } from "react";
import { Video } from "expo-av";

// Local Imports
import { AppVideoProps } from "../types/ComponentTypes";

// function component for AppVideo
const AppVideo = forwardRef((props: AppVideoProps, ref: MutableRefObject<Video>) => {
  // Destructuring props
  const { source, ...otherProps } = props;

  // render
  return (
    <Video
      source={source}
      ref={ref}
      shouldPlay
      isLooping
      resizeMode="contain"
      style={{ width: "100%", height: "100%" }}
      {...otherProps}
    />
  );
});

// exports
export default AppVideo;
