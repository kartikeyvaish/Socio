// Packages Imports (from node_modules)
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// Local Imports (components/types/utils)
import AnimatedView from "../components/Animated/AnimatedView";
import AppContainer from "../components/App/AppContainer";
import AppIcon from "../components/App/AppIcon";
import AppImage from "../components/App/AppImage";
import AppRow from "../components/App/AppRow";
import AppText from "../components/App/AppText";
import AppView from "../components/App/AppView";
import authActions from "../store/auth/actions";
import postsActions from "../store/posts/actions";
import PostListCard from "../components/Cards/PostListCard";
import StatsCard from "../components/Cards/StatsCard";

// Named Imports
import { abbreviate_number } from "../helpers/utils";
import { useAppDispatch, useAppSelector } from "../store/reduxHooks";
import { getUserProfile } from "../api/services/Profile";
import { PostProps } from "../types/AppTypes";

// interface for ProfileScreen component
export interface ProfileScreenProps {}

// functional component for ProfileScreen
function ProfileScreen(props: ProfileScreenProps) {
  // Destructuring props
  const {} = props;

  // Get current User from redux store
  const currentUser = useAppSelector(state => state.auth);
  const { usersPosts } = useAppSelector(state => state.posts);

  // States
  const [refresing, setRefresing] = useState<boolean>(false);

  const {
    id,
    username,
    last_name,
    first_name,
    profile_picture,
    bio,
    posts_count,
    followers_count = 0,
    following_count = 0,
  } = currentUser;

  const dispatch = useAppDispatch();

  useEffect(() => {
    getProfileAPI();
  }, []);

  const getProfileAPI = useCallback(async () => {
    try {
      const apiResponse = await getUserProfile(id);

      if (apiResponse.ok) {
        dispatch(
          authActions.updateUser({ ...currentUser, ...apiResponse.data.user })
        );

        dispatch(postsActions.setUsersPosts(apiResponse.data.posts));
      }
    } catch (error) {}
  }, []);

  const ProfileHeaderBar = useMemo(
    () => (
      <AppRow style={styles.profileHeaderBar}>
        <AppView style={{ flex: 2 }}>
          <AppText
            text={username}
            adjustsFontSizeToFit
            numberOfLines={1}
            size={22}
            fontWeight="700"
          />
        </AppView>

        <AppView style={{ alignItems: "flex-end" }}>
          <RectButton style={styles.settingsIcon}>
            <AppIcon family="Feather" name="settings" size={22} />
          </RectButton>
        </AppView>
      </AppRow>
    ),
    [username]
  );

  const ProfileStatsContainer = useMemo(
    () => (
      <AppRow style={{ alignItems: "center" }}>
        <AppImage
          source={{ uri: profile_picture }}
          containerStyles={styles.profilePictureContainer}
        />

        <AppRow style={{ flex: 1, paddingLeft: 30 }}>
          <StatsCard
            label="Posts"
            value={abbreviate_number(posts_count).toString()}
          />

          <StatsCard
            label="Followers"
            value={abbreviate_number(followers_count).toString()}
          />

          <StatsCard
            label="Following"
            value={abbreviate_number(following_count).toString()}
          />
        </AppRow>
      </AppRow>
    ),
    [profile_picture, posts_count, followers_count, following_count]
  );

  const ProfileDetailsContainer = useMemo(
    () => (
      <>
        <View style={styles.profileDetailsContainer}>
          {ProfileStatsContainer}

          <AppText
            text={`${first_name} ${last_name}`}
            fontWeight="600"
            size={14}
            margins={{ top: 15 }}
          />

          <AppText
            text={bio}
            fontWeight="400"
            numberOfLines={3}
            size={13}
            margins={{ top: 5 }}
          />
        </View>

        <AnimatedView style={styles.editBtnContainer}>
          <AppText text="Edit Profile" />
        </AnimatedView>
      </>
    ),
    [
      first_name,
      last_name,
      bio,
      ProfileStatsContainer,
      profile_picture,
      posts_count,
      followers_count,
      following_count,
    ]
  );

  const renderItem = useCallback(
    ({ item }: { item: PostProps }) => (
      <PostListCard
        coverImage={item.cover_thumbnail}
        blurhash={item.cover_blurhash}
        isGroupPost={item.files.length > 1}
        isSingleVideoPost={
          item.files.length === 1 && item.files[0].file_type === "video"
        }
      />
    ),
    []
  );

  const onRefresh = useCallback(async () => {
    setRefresing(true);

    await getProfileAPI();

    setRefresing(false);
  }, []);

  // render
  return (
    <AppContainer>
      <FlatList
        data={usersPosts}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        renderItem={renderItem}
        refreshing={refresing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <AnimatedView style={{ marginBottom: 30 }}>
            {ProfileHeaderBar}
            {ProfileDetailsContainer}
          </AnimatedView>
        }
      />
    </AppContainer>
  );
}

// exports
export default ProfileScreen;

// styles for ProfileScreen
const styles = StyleSheet.create({
  profileDetailsContainer: {
    padding: 16,
  },
  profileHeaderBar: {
    padding: 15,
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 0,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40 / 2,
  },
  profilePictureContainer: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    overflow: "hidden",
  },
  editBtnContainer: {
    height: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#3C3C43",
    borderWidth: 1 - StyleSheet.hairlineWidth,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "transparent",
    marginTop: 5,
  },
});
