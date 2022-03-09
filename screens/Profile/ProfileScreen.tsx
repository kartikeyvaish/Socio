// Packages Imports
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import { connect, useDispatch } from "react-redux";

// Local imports
import AppContainer from "../../components/AppContainer";
import AppIcon from "../../components/AppIcon";
import AppImage from "../../components/AppImage";
import AppText from "../../components/AppText";
import AuthActionCreators from "../../store/auth/actions";
import ColorPallete from "../../constants/ColorPallete";
import FontNames from "../../constants/FontNames";
import GlobalContext from "../../context/GlobalContext";
import Helper from "../../utils/Helper";
import IconNames from "../../constants/IconNames";
import ProfileActionCreators from "../../store/profile/actions";
import ProfilePostCard from "../../components/ProfilePostCard";
import ScreenNames from "../../navigation/ScreenNames";
import StatsCard from "../../components/StatsCard";
import { StoreStateInterface } from "../../types/StoreTypes";
import { TabScreenProps } from "../../navigation/NavigationProps";
import TextButton from "../../components/TextButton";
import ToastMessages from "../../constants/Messages";
import useAppEndpoints from "../../api/useAppEndpoints";
import StoryViewAvatar from "../../components/StoryViewAvatar";
import { TouchableRipple } from "react-native-paper";
import Layout from "../../constants/Layout";
import AppScrollContainer from "../../components/AppScrollContainer";

const screenWidth = Layout.window.width;

// function component for ProfileScreen
function ProfileScreen(props: TabScreenProps<"ProfileTabScreen">) {
  // Destructuring props
  const { navigation, Profile }: any = props;

  // Local States
  const [Refreshing, SetRefreshing] = useState(false);

  // Get the user
  const { User, ProfileStories } = useContext(GlobalContext);
  const dispatch = useDispatch();
  const { GetProfile } = useAppEndpoints();

  // Initial call to get profile data
  useEffect(() => {
    GetProfileAPI();
  }, []);

  // Get profile data
  const GetProfileAPI = async () => {
    try {
      const apiResponse = await GetProfile(User._id);
      if (apiResponse.ok && apiResponse !== null) {
        dispatch(ProfileActionCreators.SetFollowingCount(apiResponse.data.following_count));
        dispatch(ProfileActionCreators.SetFollowersCount(apiResponse.data.followers_count));
        dispatch(ProfileActionCreators.SetProfilePosts(apiResponse.data.posts));
        dispatch(AuthActionCreators.UpdateUser(apiResponse.data.user_details));
      } else {
        Helper.ShowToast(apiResponse.data.message);
      }
    } catch (error) {
      Helper.ShowToast(ToastMessages.SERVER_ERROR_MESSAGE);
    }
  };

  // function to be called when user refreshes the screen
  const onRefresh = async () => {
    try {
      SetRefreshing(true);
      await GetProfileAPI();
      SetRefreshing(false);
    } catch (error) {
      SetRefreshing(false);
    }
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <AppText text={User.username} family={FontNames.PoppinsMedium} marginLeft={10} size={22} />
        <AppIcon
          family={IconNames.Feather}
          name="menu"
          size={24}
          marginTop={-5}
          marginRight={15}
          onPress={() => navigation.navigate(ScreenNames.SettingScreen)}
        />
      </View>

      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 80, height: 80, margin: 15, marginLeft: 30 }}>
          {ProfileStories.stories.length === 0 ? (
            <AppImage uri={User.profile_picture} borderRadius={40} />
          ) : (
            <StoryViewAvatar
              profile_picture={User.profile_picture}
              username="You"
              onAvatarPress={
                ProfileStories.stories.length > 0
                  ? () => navigation.navigate(ScreenNames.ViewOwnStoryScreen)
                  : null
              }
              imageSize={70}
              showLabel={false}
              showBorder={ProfileStories.stories.length === 0 ? false : true}
              borderColor={
                ProfileStories.viewed_by_you === true ? ColorPallete.grey : ColorPallete.primary
              }
              showIcon={ProfileStories.stories.length === 0 ? true : false}
            />
          )}
        </View>

        <View style={{ flex: 1, flexDirection: "row", marginLeft: 0, marginRight: 15 }}>
          <StatsCard title="Posts" subtitle={Profile?.ProfilePosts?.length.toString() ?? "0"} />
          <StatsCard
            title="Followers"
            subtitle={Profile?.FollowersCount?.toString() ?? "0"}
            onPress={() => navigation.navigate(ScreenNames.FollowersScreen, { user_id: User._id })}
          />
          <StatsCard
            title="Following"
            subtitle={Profile?.FollowingCount?.toString() ?? "0"}
            onPress={() => navigation.navigate(ScreenNames.FollowingScreen, { user_id: User._id })}
          />
        </View>
      </View>

      <AppText text={User.name} family={FontNames.PoppinsBold} marginLeft={15} />
      <AppText
        text={User.bio}
        family={FontNames.PoppinsLight}
        marginLeft={15}
        marginRight={15}
        numberOfLines={3}
      />

      <View style={{ flexDirection: "row", margin: 10 }}>
        <TextButton
          text="Edit Profile"
          onPress={() =>
            navigation.navigate(ScreenNames.EditProfileScreen, {
              name: User.name,
              bio: User.bio,
              username: User.username,
              profile_picture: User.profile_picture,
              email: User.email,
            })
          }
        />
      </View>

      <View style={styles.postsContainer}>
        <AppScrollContainer
          contentContainerStyle={{ flexWrap: "wrap", flexDirection: "row" }}
          onRefresh={onRefresh}
          refreshing={Refreshing}
        >
          {Profile?.ProfilePosts.map((item, index) => (
            <ProfilePostCard
              key={index}
              style={{ borderRightWidth: index % 3 == 0 || index % 3 == 1 ? 1 : 0 }}
              onCardPress={() =>
                navigation.navigate(ScreenNames.PostDetailsScreen, {
                  ...item,
                  post_owner_details: User,
                })
              }
              _id={item._id}
              uri={item.file.uri}
            />
          ))}
        </AppScrollContainer>
      </View>
    </AppContainer>
  );
}

// Mapping Redux state to props
const mapStateToProps = (state: StoreStateInterface) => ({
  Profile: state.ProfileState,
});

// Connect and Export
export default connect(mapStateToProps, null)(ProfileScreen);

// styles
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  postsContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: ColorPallete.white,
  },
});
