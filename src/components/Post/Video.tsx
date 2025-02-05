// Packages Imports (from node_modules)
import { Image } from 'expo-image';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pressable, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
import VideoView, { SelectedTrackType, VideoRef } from 'react-native-video';

// Named Imports (components/types/utils)
import { FileAttachment } from '../../types/model';
import { FileCacheManagerContext } from '../../contexts/FileCacheManagerContext';
import { useAppSelector } from '../../store/storeHooks';

// interface for Video component
export interface VideoProps extends FileAttachment {
  shouldPlay?: boolean;
  muted?: boolean;
  onPress?: () => void;
  canCache?: boolean;
  style?: StyleProp<any>;
}

// functional component for Video
function Video(props: VideoProps) {
  // Destructuring props
  const {
    id,
    blurhash,
    secure_url,
    thumbnail,
    shouldPlay = false,
    muted = true,
    onPress,
    style,
    width,
    height,
    canCache,
    ...restProps
  } = props;

  const [videoSource, setVideoSource] = useState(null);
  const playerRef = useRef<VideoRef>(null);

  const { cacheFile } = useContext(FileCacheManagerContext);
  const { cachedUrls, cachingState } = useAppSelector((state) => state.fileCache);

  useEffect(() => {
    if (canCache && !cachingState?.[id] && !cachedUrls?.[id]) cacheFile({ id, secure_url });
  }, [canCache]);

  useEffect(() => {
    setSource();
  }, []);

  const setSource = async () => {
    try {
      if (cachedUrls?.[id]) {
        setVideoSource(cachedUrls[id]);

        return;
      }

      setVideoSource(secure_url);
    } catch (error) {
      setVideoSource(secure_url);
    }
  };

  const onPlaybackEnd = () => {
    if (cachedUrls[id]) {
      if (cachedUrls[id] !== videoSource) {
        setVideoSource(cachedUrls[id]);
      }
    }
  };

  return (
    <Pressable onPress={onPress} style={style}>
      <Animated.View style={style}>
        {videoSource ? (
          <VideoView
            source={{ uri: videoSource }}
            ref={playerRef}
            style={{ flex: 1, backgroundColor: 'transparent', zIndex: 2 }}
            resizeMode="contain"
            paused={!shouldPlay}
            repeat={true}
            onEnd={onPlaybackEnd}
            muted={muted}
            selectedAudioTrack={{ type: SelectedTrackType.SYSTEM }}
            volume={1}
            ignoreSilentSwitch="ignore"
            {...restProps}
          />
        ) : null}

        <Image
          placeholder={{ blurhash }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
      </Animated.View>
    </Pressable>
  );
}

// exports
export default Video;
