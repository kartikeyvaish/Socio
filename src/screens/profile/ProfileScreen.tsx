// Packages Imports (from node_modules)
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';

// Local Imports (components/types/utils)
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';
import profileApi from '../../api/profile';
import PostMiniCard from '../../components/Post/PostMiniCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

// Named Imports
import { DEFAULT_USER_IMAGE, fontFamilies } from '../../constants/ui';
import { Profile, Post as PostType } from '../../types/model';
import { useAppSelector } from '../../store/storeHooks';

// interface for ProfileScreen component
export interface ProfileScreenProps {}

interface ProfileDetailsProps {
  profileDetails: Profile;
}

async function getProfilePosts(limit: number, offset: number) {
  try {
    const apiResponse = await profileApi.getProfilePosts({ limit, offset });

    if (apiResponse.ok) {
      return { ok: true, data: apiResponse.data.posts, has_more: apiResponse.data.has_more };
    }
  } catch (error) {
    return { ok: false, data: [], has_more: false };
  }
}

// functional component for ProfileScreen
function ProfileScreen(props: ProfileScreenProps) {
  // Destructuring props
  const {} = props;

  const { user } = useAppSelector((state) => state.auth);

  const [profilePosts, setProfilePosts] = useState<Array<PostType>>(SAMPLE_PROFILE_POSTS);

  // const {
  //   data: profilePosts,
  //   getData: getMoreProfilePosts,
  //   isFetching
  // } = useInfiniteScroll<PostType>(getProfilePosts);

  // Local States
  const [profileDetails, setProfileDetails] = useState<Profile>(
    user ? { ...user, total_posts: 0 } : null
  );

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    try {
      if (!user.username) return;

      const response = await profileApi.getProfileDetails(user.username);

      if (response.ok) {
        setProfileDetails(response.data.profile);
      }
    } catch (error) {}
  };

  const renderItem = useCallback(
    ({ item: post, index }: { item: PostType; index: number }) => (
      <PostMiniCard
        {...post}
        position={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'center' : 'right'}
      />
    ),
    []
  );

  // render
  return (
    <Container flex={1}>
      <FlatList
        data={profilePosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={
          profileDetails ? <ProfileDetails profileDetails={profileDetails} /> : null
        }
        columnWrapperStyle={{ borderTopWidth: 1 - StyleSheet.hairlineWidth, borderColor: 'white' }}
      />
    </Container>
  );
}

function ProfileDetails(props: ProfileDetailsProps) {
  const { profileDetails } = props;

  return (
    <Flex margins={{ bottom: 16 }}>
      <Flex row align="center" justify="space-between" style={styles.contentContainer}>
        <AppText text={profileDetails.username} size={24} family={fontFamilies.Inter.bold} />
        <Icon family="Feather" name="settings" size={24} />
      </Flex>

      <Flex row style={styles.contentContainer} align="center">
        <Image
          source={{ uri: profileDetails?.profile_picture || DEFAULT_USER_IMAGE }}
          style={styles.userProfileImageContainer}
        />

        <Flex margins={{ left: 50 }}>
          <Flex gap={10} justify="center" align="center">
            <AppText text="Posts" size={16} family={fontFamilies.Inter.bold} />
            <AppText
              text={profileDetails.total_posts.toString()}
              size={14}
              family={fontFamilies.Inter.bold}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex style={styles.contentContainer} gap={8}>
        <AppText
          text={`${profileDetails.first_name} ${profileDetails.last_name}`}
          family={fontFamilies.Inter.bold}
        />
        <AppText text={profileDetails.bio} />
      </Flex>
    </Flex>
  );
}

// exports
export default ProfileScreen;

// styles for ProfileScreen
const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    padding: 8
  },
  userProfileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45
  }
});

const SAMPLE_PROFILE_POSTS: Array<PostType> = [
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
        id: 526,
        width: 4096,
        format: 'mp4',
        height: 2160,
        blurhash: 'LCDwINm+4TIt}{x_yZx].B.9H]oz',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_2160,w_4096/v1/socio_assets/mock/ebotqwjutpiyzczjldcg.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738134776/socio_assets/mock/ebotqwjutpiyzczjldcg.mp4',
        playback_url: null,
        resource_type: 'video'
      },
      {
        id: 527,
        width: 720,
        format: 'mp4',
        height: 1280,
        blurhash: 'L9B:57~V0KE1%2NGRjae004:~C%M',
        thumbnail:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/c_thumb,h_1280,w_720/v1/socio_assets/mock/mqubotqhevbnikepimmf.jpg?_a=BAMCkGUq0',
        secure_url:
          'https://res.cloudinary.com/kartikeyvaish/video/upload/v1738136724/socio_assets/mock/mqubotqhevbnikepimmf.mp4',
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
    total_comments: 7,
    is_saved: false
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
  },
  {
    id: 24113,
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
  },
  {
    id: 2243,
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
