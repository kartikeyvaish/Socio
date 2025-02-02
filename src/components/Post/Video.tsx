// Packages Imports (from node_modules)
import { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Image } from 'expo-image';
import { Video as VideoView, ResizeMode, AVPlaybackStatus } from 'expo-av';

// Local Imports
import reduxStorageEngine from '../../store/reduxStoreEngine';
import useVideoCache from '../../hooks/useVideoCache';

// Named Imports (components/types/utils)
import { FileAttachment } from '../../types/model';
import { PlaybackStates } from '../../types/components';

// interface for Video component
export interface VideoProps extends FileAttachment {
  shouldPlay?: boolean;
  muted?: boolean;
  onPress?: () => void;
}

// functional component for Video
function Video(props: VideoProps) {
  // Destructuring props
  const { id, blurhash, secure_url, thumbnail, shouldPlay = false, muted = true, onPress } = props;

  const { cachedUrls } = useVideoCache([props]);

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
    <Animated.View style={styles.container}>
      {!shouldPlay ? (
        <Image
          source={{ uri: thumbnail }}
          style={styles.videoView}
          placeholder={{ blurhash }}
          transition={{ duration: 200, effect: 'cross-dissolve', timing: 'ease-in-out' }}
          onTouchEnd={onPress}
        />
      ) : (
        <VideoView
          ref={playerRef}
          source={{ uri: videoSource }}
          useNativeControls={false}
          style={styles.videoView}
          posterSource={{ uri: thumbnail }}
          posterStyle={styles.videoView}
          usePoster={true}
          isLooping
          shouldPlay
          isMuted={muted}
          onTouchEnd={onPress}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={updatePlaybackCallback}
        />
      )}
    </Animated.View>
  );
}

// exports
export default Video;

// styles for Video
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black'
  },
  videoView: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});
