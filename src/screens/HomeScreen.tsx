// Packages Imports (from node_modules)
import { View, StyleSheet } from 'react-native';

// Local Imports (components/types/utils)
import Container from '../components/Container';
import Post from '../components/Post';
import { Post as PostType } from '../types/model';

// interface for HomeScreen component
export interface HomeScreenProps {}

// functional component for HomeScreen
function HomeScreen(props: HomeScreenProps) {
  // Destructuring props
  const {} = props;

  // render
  return (
    <Container style={styles.container}>
      <Post {...SAMPLE_POST} />
    </Container>
  );
}

// exports
export default HomeScreen;

// styles for HomeScreen
const styles = StyleSheet.create({
  container: {}
});

const SAMPLE_POST: PostType = {
  id: 14,
  location: 'London',
  caption: 'WOW! What a day',
  is_edited: false,
  comments_enabled: true,
  created_at: '2025-01-26T16:16:34.878694+00:00',
  files: [
    {
      width: 1080,
      height: 1350,
      format: 'jpg',
      resource_type: 'image',
      secure_url:
        'https://res.cloudinary.com/kartikeyvaish/image/upload/v1737908197/socio_assets/users_1/posts_14/csqg0lg16wsfbhrggaii.jpg',
      thumbhash: 'LEHLk~WB2yk8pyo0adR*.7kCMdnj',
      playback_url: null,
      thumbnail_url: null
    },
    {
      width: 1080,
      height: 1920,
      format: 'mp4',
      resource_type: 'video',
      secure_url:
        'https://res.cloudinary.com/kartikeyvaish/video/upload/v1737908207/socio_assets/users_1/posts_14/rtqdz0qnwstfo2nnr8cv.mp4',
      thumbhash: 'LEHLk~WB2yk8pyo0adR*.7kCMdnj',
      playback_url:
        'https://res.cloudinary.com/kartikeyvaish/video/upload/sp_auto/v1737908207/socio_assets/users_1/posts_14/rtqdz0qnwstfo2nnr8cv.m3u8',
      thumbnail_url: null
    }
  ],
  user: {
    email: 'kartikeyvaish99@gmail.com',
    first_name: 'Kartikey',
    last_name: 'Vaish',
    username: 'kartikey'
  }
};
