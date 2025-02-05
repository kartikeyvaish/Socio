// Packages Imports (from node_modules)
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Local Imports (components/types/utils)
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import Flex from '../../components/Flex';
import Icon from '../../components/Icon';
import profileApi from '../../api/profile';
import PostMiniCard from '../../components/Post/PostMiniCard';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

// Named Imports
import { AppStackParamsList } from '../../navigation/types';
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

  const navigation = useNavigation<NavigationProp<AppStackParamsList>>();

  const { data: profilePosts, getData: getMoreProfilePosts } =
    useInfiniteScroll<PostType>(getProfilePosts);

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
        onPress={() =>
          navigation.navigate('PostListScreen', { posts: profilePosts, startIndex: index })
        }
      />
    ),
    [profilePosts]
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
        onEndReached={getMoreProfilePosts}
        onEndReachedThreshold={0.5}
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
  contentContainer: {
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12
  },
  userProfileImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 45
  }
});
