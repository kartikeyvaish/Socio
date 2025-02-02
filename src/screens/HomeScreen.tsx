// Packages Imports (from node_modules)
import { useCallback, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

// Local Imports (components/types/utils)
import Container from '../components/Container';
import Post from '../components/Post';
import useFlatList from '../hooks/useFlatlist';

// Named Imports
import { Post as PostType } from '../types/model';

// interface for HomeScreen component
export interface HomeScreenProps {}

// functional component for HomeScreen
function HomeScreen(props: HomeScreenProps) {
  // Destructuring props
  const {} = props;

  const { flatListRef, onViewRef, viewConfigRef, viewableItem } = useFlatList(FEED[0].id);

  const [isMuted, setIsMuted] = useState(true);

  const isFocused = useIsFocused();

  const keyExtractor = useCallback((item: PostType) => item.id.toString(), []);

  const renderItem = useCallback(
    ({ item: post }: { item: PostType }) => (
      <Post
        {...post}
        inView={isFocused && post.id === viewableItem}
        isMuted={isMuted}
        onMediaPress={() => setIsMuted(!isMuted)}
      />
    ),
    [viewableItem, isFocused, isMuted]
  );

  // render
  return (
    <Container style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={FEED}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={5}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={5}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

// exports
export default HomeScreen;

// styles for HomeScreen
const styles = StyleSheet.create({
  container: {}
});

const FEED = [
  {
    id: 143,
    location: 'East Joannie',
    caption: 'Defleo tricesimus solio subseco supra alias volva abstergo allatus.',
    is_edited: false,
    is_archieved: false,
    comments_enabled: true,
    created_at: '2025-01-30T14:38:50.316906+00:00',
    user: {
      bio: 'Some Bio',
      username: 'kartikey',
      last_name: 'Vaish',
      first_name: 'Kartikey',
      profile_picture:
        'https://res.cloudinary.com/kartikeyvaish/image/upload/v1738392973/socio_assets/users_1/profile_picture/ujmlfrhjvy20leclpqn1.jpg'
    },
    files: [
      {
        id: 525,
        width: 720,
        format: 'mp4',
        height: 1280,
        blurhash: 'LtMa08jDxsbI?vW.adof~pn~R:jX',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_1280,w_720/v1/socio_assets/mock/mr9az1aqfybamzsrxuy2.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738136650/socio_assets/mock/mr9az1aqfybamzsrxuy2.mp4',
        playback_url: null,
        resource_type: 'video'
      },
      {
        id: 528,
        width: 720,
        format: 'mp4',
        height: 1280,
        blurhash: 'LD9[I|a08}oz?@oIRQWE00o}.PV@',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_1280,w_720/v1/socio_assets/mock/nsgn2edvocztsd1z5etc.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738136630/socio_assets/mock/nsgn2edvocztsd1z5etc.mp4',
        playback_url: null,
        resource_type: 'video'
      },
      {
        id: 529,
        width: 720,
        format: 'mp4',
        height: 1280,
        blurhash: 'L+NJ@1oJs:xa~qoMayae%fWXWVWC',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_1280,w_720/v1/socio_assets/mock/zpnlki1xesydn43ekkcw.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738135225/socio_assets/mock/zpnlki1xesydn43ekkcw.mp4',
        playback_url: null,
        resource_type: 'video'
      }
    ],
    total_likes: 106,
    is_liked: true,
    total_comments: 1,
    is_saved: true
  },
  {
    id: 243,
    location: ' London',
    caption: ' WOW! What a day',
    is_edited: false,
    is_archieved: false,
    comments_enabled: true,
    created_at: '2025-02-01T11:35:20.593035+00:00',
    user: {
      bio: 'Some Bio',
      username: 'kartikey',
      last_name: 'Vaish',
      first_name: 'Kartikey',
      profile_picture:
        'https://res.cloudinary.com/kartikeyvaish/image/upload/v1738392973/socio_assets/users_1/profile_picture/ujmlfrhjvy20leclpqn1.jpg'
    },
    files: [
      {
        id: 746,
        width: 1080,
        format: 'jpg',
        height: 1350,
        blurhash: 'LBKSz[-U0MV?~Vxa9bIo01-;E1bE',
        thumbnail: null,
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/image/upload/v1738409722/socio_assets/users_1/posts_243/gmcyf2zflbvcrezz92cq.jpg',
        playback_url: '',
        resource_type: 'image'
      },
      {
        id: 747,
        width: 2736,
        format: 'jpg',
        height: 1539,
        blurhash: 'LAE,pgD,[n$z.T11]Os,7f1fJ+sA',
        thumbnail: null,
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/image/upload/v1738409722/socio_assets/users_1/posts_243/ynwfu7ywgahbc27kgr53.jpg',
        playback_url: '',
        resource_type: 'image'
      },
      {
        id: 748,
        width: 720,
        format: 'mp4',
        height: 900,
        blurhash: 'L26[jeFxL#%1={W;ODo200v#HWIp',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_900,w_720/v1/socio_assets/users_1/posts_243/cxifezhzerehukm5br3r.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738409723/socio_assets/users_1/posts_243/cxifezhzerehukm5br3r.mp4',
        playback_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/sp_auto/v1738409723/socio_assets/users_1/posts_243/cxifezhzerehukm5br3r.m3u8',
        resource_type: 'video'
      },
      {
        id: 749,
        width: 1080,
        format: 'jpg',
        height: 1349,
        blurhash: 'LBHKwl4.00?uHX%1%#9a=v~B%LE1',
        thumbnail: null,
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/image/upload/v1738409722/socio_assets/users_1/posts_243/fqew4lvol9igrbq3ae2k.jpg',
        playback_url: '',
        resource_type: 'image'
      },
      {
        id: 750,
        width: 720,
        format: 'mp4',
        height: 1280,
        blurhash: 'LMQc6q_N%zs+4-?vtRjF57%MI9WB',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_1280,w_720/v1/socio_assets/users_1/posts_243/gnyuthwicmv3g00gnzty.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738409724/socio_assets/users_1/posts_243/gnyuthwicmv3g00gnzty.mp4',
        playback_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/sp_auto/v1738409724/socio_assets/users_1/posts_243/gnyuthwicmv3g00gnzty.m3u8',
        resource_type: 'video'
      }
    ],
    total_likes: 0,
    is_liked: false,
    total_comments: 0,
    is_saved: false
  }
];
