// Packages Imports (from node_modules)
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  Video as VideoView,
  VideoProps as VideoViewProps,
  ResizeMode,
  AVPlaybackStatus
} from 'expo-av';

// Local Imports
import reduxStorageEngine from '../../store/reduxStoreEngine';
import useVideoCache from '../../hooks/useVideoCache';

// Named Imports (components/types/utils)
import { FileAttachment } from '../../types/model';
import { PlaybackStates } from '../../types/components';

// interface for Video component
export interface VideoProps extends FileAttachment, Omit<VideoViewProps, 'id' | 'style'> {
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

  const { cachedUrls } = useVideoCache([{ id, secure_url }], canCache);

  const [videoSource, setVideoSource] = useState(null);

  useEffect(() => {
    setSource();
  }, []);

  const setSource = async () => {
    try {
      let mmkvStorageKey = `cachedUrls_${id}`;

      let mmkvCachedUrl = await reduxStorageEngine.getItem(mmkvStorageKey);

      if (mmkvCachedUrl) {
        setVideoSource(mmkvCachedUrl);
      } else {
        setVideoSource(secure_url);
      }
    } catch (error) {
      setVideoSource(secure_url);
    }
  };

  const playerRef = useRef<VideoView>(null);

  const [playbackInstanceInfo, setPlaybackInstanceInfo] = useState({
    position: 0,
    duration: 0,
    state: secure_url ? PlaybackStates.Loading : PlaybackStates.Error
  });

  useEffect(() => {
    if (cachedUrls[id]) {
      if (![PlaybackStates.Playing].includes(playbackInstanceInfo.state)) {
        if (cachedUrls[id] !== videoSource) {
          setVideoSource(cachedUrls[id]);
        }
      }
    }
  }, [cachedUrls[id]]);

  const updatePlaybackCallback = async (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setPlaybackInstanceInfo({
        ...playbackInstanceInfo,
        position: status.positionMillis,
        duration: status.durationMillis || 0,
        state:
          status.positionMillis === status.durationMillis
            ? PlaybackStates.Ended
            : status.isBuffering
            ? PlaybackStates.Buffering
            : status.shouldPlay
            ? PlaybackStates.Playing
            : PlaybackStates.Paused
      });

      if (status.didJustFinish) {
        if (cachedUrls[id]) {
          if (cachedUrls[id] !== videoSource) {
            setVideoSource(cachedUrls[id]);
          }
        }
      }
    } else {
      if (status.isLoaded === false && status.error) {
      }
    }
  };

  // render
  return (
    <Pressable onPress={onPress} style={style}>
      <Animated.View style={style}>
        <VideoView
          ref={playerRef}
          source={{ uri: videoSource }}
          useNativeControls={false}
          style={{ flex: 1, backgroundColor: 'transparent', zIndex: 2 }}
          posterSource={{ uri: thumbnail }}
          posterStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
          usePoster={true}
          isLooping
          shouldPlay={shouldPlay}
          isMuted={muted}
          resizeMode={ResizeMode.CONTAIN}
          rate={1.0}
          onPlaybackStatusUpdate={updatePlaybackCallback}
          {...restProps}
        />

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
