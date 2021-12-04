import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  ToastAndroid,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { useTheme } from "@react-navigation/native";
import { Video } from "expo-av";

import API from "../api/API";
import Avatar from "./Avatar";
import config from "../config/config";
import ColorPallete from "../config/ColorPallete";
import { DeletePost } from "./../store/posts/actions";
import { DeleteProfilePost } from "../store/profile/actions";
import { DeleteStorePost } from "../store/cache/actions";
import Dialog from "./Dialog";
import Helper from "../config/Helper";
import Icon from "./Icon";
import LikeButton from "./LikeButton";
import MenuCard from "./MenuCard";
import Text from "./Text";
import TruncateIt from "./TruncateText";
import { useBackHandler } from "./../hooks/useBackHandler";

const SideOffset = 5;
const ScreenWidth = Dimensions.get("screen").width - SideOffset * 2;

function PostCard({
  Token = "",
  onNamePress,
  Width,
  Height,
  onCommentPress,
  onLikesPress,
  viewable,
  muted,
  onMuteToggle,
  showOpenMenu = false,
  _id,
  user_id,
  location,
  caption,
  preview_file,
  mime_type,
  posted_on,
  file,
  Username,
  ProfilePicture,
  likes_count,
  is_liked,
  comments_count,
  User,
  DELETE_PROFILE_POST,
  DELETE_POST,
  DELETE_STORE_POST,
  onGoback = () => {},
}) {
  const { colors } = useTheme();
  const CalculateHeight = ((ScreenWidth - 2) * Height) / Width;
  const post_type = mime_type.split("/")[0];

  const VideoPlayer = useRef();
  const sheetRef = useRef(null);
  const Scale = useRef(new Animated.Value(1));

  const [DeleteLoading, SetDeleteLoading] = useState(false);
  const [DialogVisible, SetDialogVisible] = useState(false);
  const [LIKED, SetLIKED] = useState(is_liked);
  const [LIKE_COUNT, SetLIKE_COUNT] = useState(likes_count);
  const [SheetOpened, SetSheetOpened] = useState(false);

  // Play/Pause a video post according to viisibility
  useEffect(() => {
    if (viewable === _id) VideoPlayer?.current?.playAsync();
    else VideoPlayer?.current?.pauseAsync();
  }, [viewable]);

  // Back handler
  useBackHandler(() => {
    if (SheetOpened) {
      SetSheetOpened(false);
      sheetRef.current?.forceClose();
      return true;
    }

    return false;
  });

  // Function to like a post
  const LikeAPost = async () => {
    SetLIKED(true);
    try {
      const response = await API.LikePost(
        {
          post_id: _id,
        },
        Token
      );
      if (response.ok) SetLIKE_COUNT(response.data.likes_count);
    } catch (error) {
      SetLIKED(false);
    }
  };

  // Function to unlike a post
  const UnLikeAPost = async () => {
    SetLIKED(false);
    try {
      const response = await API.UnLikePost(
        {
          post_id: _id,
        },
        Token
      );
      if (response.ok) SetLIKE_COUNT(response.data.likes_count);
    } catch (error) {
      SetLIKED(false);
    }
  };

  // Function to delete a post
  const DeletePost = async () => {
    try {
      if (user_id === User._id) {
        SetDeleteLoading(true);
        const response = await API.DeletePost({ _id: _id }, User.Token);
        SetDeleteLoading(false);
        SetDialogVisible(false);
        if (response.ok) {
          DELETE_PROFILE_POST(_id);
          DELETE_POST(_id);
          DELETE_STORE_POST(_id);
          onGoback();
        } else ToastAndroid.show(response.data, ToastAndroid.LONG);
      } else {
        SetDialogVisible(false);
      }
    } catch (error) {
      SetDeleteLoading(false);
      SetDialogVisible(false);
      ToastAndroid.show(config.messages.ServerError, ToastAndroid.LONG);
    }
  };

  // useMemo for Action Sheet
  const ActionSheet = useMemo(
    () => (
      <Dialog
        visible={DialogVisible}
        hideDialog={() => SetDialogVisible(false)}
        title="Post"
      >
        <MenuCard
          text="Delete Post"
          showSuffixIcon={false}
          prefixName="MaterialIcons"
          prefixIconName="delete-outline"
          containerPaddingLeft={0}
          innerPadding={0}
          showBorder={false}
          color={ColorPallete.red}
          prefixIconColor={ColorPallete.red}
          onPress={DeletePost}
          prefixLoading={DeleteLoading}
        />
      </Dialog>
    ),
    [DeleteLoading, DialogVisible, DeletePost]
  );

  // useMemo for UserDetailsBar
  const UserDetailsBar = useMemo(() => {
    return (
      <View style={styles.UserDetailsHeader}>
        <Avatar
          uri={ProfilePicture}
          borderColor={"grey"}
          size={35}
          borderWidth={2}
          style={{
            marginLeft: 10,
            marginRight: 20,
            borderWidth: 1 - StyleSheet.hairlineWidth,
          }}
        />

        <Pressable style={{ flex: 1 }} onPress={onNamePress}>
          {Username ? (
            <Text text={Username} family="InterBold" size={15} />
          ) : null}
          {location ? <Text text={location} family="Mulish" size={13} /> : null}
        </Pressable>

        {showOpenMenu ? (
          user_id === User._id ? (
            <Pressable
              style={styles.MenuOpenButton}
              onPress={() => SetDialogVisible(true)}
            >
              <Icon Name="Entypo" IconName="dots-three-vertical" size={20} />
            </Pressable>
          ) : null
        ) : null}
      </View>
    );
  }, [ProfilePicture, Username, location, user_id]);

  // useMemo for Operation Buttons
  const OperationButtons = useMemo(() => {
    return (
      <View style={styles.OperationsBTN}>
        <View style={styles.ThreeBTNS}>
          <LikeButton
            style={{ marginRight: 10 }}
            liked={LIKED}
            onPress={LIKED ? UnLikeAPost : LikeAPost}
            likedColor={ColorPallete.red}
            unlikedColor={colors.text}
          />

          <Icon
            Name="FontAwesome"
            IconName={"comment-o"}
            marginTop={-5}
            onPress={onCommentPress}
          />
        </View>
      </View>
    );
  }, [LIKED, onCommentPress]);

  // useMemo for Captions Part
  const Captions = useMemo(() => {
    return (
      <View style={{ marginLeft: 15 }}>
        <Text
          text={Helper.LikesCountWords(LIKE_COUNT)}
          marginTop={1}
          marginBottom={1}
          family="InterBold"
          onPress={onLikesPress}
        />

        <View style={{ paddingRight: 15 }}>
          <TruncateIt
            longText={caption}
            header={Username}
            onHeaderPress={onNamePress}
          />
        </View>

        <Pressable onPress={onCommentPress}>
          <Text
            text={Helper.CommentCountWords(comments_count)}
            family="InterLight"
            marginTop={5}
          />
        </Pressable>

        <Text
          text={Helper.GiveTimeDifference(posted_on)}
          marginTop={5}
          color="grey"
          size={12}
        />
      </View>
    );
  }, [
    LIKE_COUNT,
    onLikesPress,
    onNamePress,
    Username,
    caption,
    comments_count,
    onCommentPress,
    posted_on,
  ]);

  // Styles that cannnot be defined outside the function
  const ImageContainerStyle = {
    zIndex: 100,
    height: CalculateHeight,
    width: ScreenWidth - 2,
    alignSelf: "center",
  };

  const ImageStyle = {
    height: "100%",
    width: "100%",
  };

  const containerStyle = {
    margin: SideOffset,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: colors.background,
    paddingBottom: 10,
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { scale: Scale.current } }],
    {
      useNativeDriver: true,
    }
  );

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(Scale.current, {
        toValue: 1,
        useNativeDriver: true,
        // bounciness: 2,
      }).start();
    }
  };

  // useMemo for Image Part
  const ImagePart = useMemo(() => {
    return (
      <PinchGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <Animated.View
          style={[
            ImageContainerStyle,
            {
              transform: [{ scale: Scale.current }],
            },
          ]}
        >
          <FastImage
            style={ImageStyle}
            source={{
              uri: `${file}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      </PinchGestureHandler>
    );
  }, [CalculateHeight, file, ScreenWidth]);

  // useMemo for Video Part
  const VideoPart = useMemo(() => {
    return (
      <Pressable onPress={viewable === _id ? onMuteToggle : null}>
        <Video
          ref={VideoPlayer}
          source={{ uri: file }}
          resizeMode="cover"
          isLooping
          isMuted={muted}
          style={{
            width: ScreenWidth - 2,
            height:
              CalculateHeight > ScreenWidth - 2
                ? ScreenWidth - 2
                : CalculateHeight,
          }}
          usePoster={preview_file ? true : false}
          posterSource={{ uri: preview_file }}
          posterStyle={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />

        {muted ? (
          <View style={styles.MuteButtonContainer}>
            <Icon
              Name="Ionicons"
              IconName="volume-mute"
              color={ColorPallete.white}
              size={18}
            />
          </View>
        ) : null}
      </Pressable>
    );
  }, [
    viewable,
    VideoPlayer,
    muted,
    preview_file,
    file,
    CalculateHeight,
    ScreenWidth,
  ]);

  return (
    <View style={containerStyle}>
      {UserDetailsBar}

      {post_type === "image" ? ImagePart : VideoPart}

      {OperationButtons}

      {Captions}

      {ActionSheet}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    User: state.AuthState.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DELETE_PROFILE_POST: (post_id) => dispatch(DeleteProfilePost(post_id)),
    DELETE_POST: (post_id) => dispatch(DeletePost(post_id)),
    DELETE_STORE_POST: (post_id) => dispatch(DeleteStorePost(post_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);

const styles = StyleSheet.create({
  MenuOpenButton: {
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  UserDetailsHeader: {
    width: ScreenWidth,
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  heartLottie: {
    width: 68,
    height: 68,
    marginLeft: -8,
  },
  OperationsBTN: {
    width: ScreenWidth,
    flexDirection: "row",
    height: 50,
  },
  ThreeBTNS: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    marginLeft: 15,
    marginRight: 15,
  },
  MuteButtonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "black",
    borderRadius: 50,
    padding: 5,
    zIndex: 100,
  },
});
