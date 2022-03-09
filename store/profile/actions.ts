// Imports 
import { PostProps } from "../../types/PostTypes";
import * as actionTypes from "./actionTypes";
import { ProfileActionProps } from "./types";

// Action Creators for the Profile 

// function to set posts
const SetProfilePosts = (posts: Array<PostProps>): ProfileActionProps => {
    return {
        type: actionTypes.SET_PROFILE_POSTS,
        payload: {
            posts: posts
        }
    }
}

// Action to update the local uri of a post
const UpdateLocalUri = (post_id: string, local_uri: string): ProfileActionProps => ({
    type: actionTypes.UPDATE_LOCAL_URI,
    payload: { post_id, local_uri },
});

// function to add a new post
const AddProfilePost = (post: PostProps): ProfileActionProps => {
    return {
        type: actionTypes.ADD_PROFILE_POST,
        payload: {
            post: post
        }
    }
}

// function to delete a post
const DeleteProfilePost = (post_id: string): ProfileActionProps => {
    return {
        type: actionTypes.DELETE_PROFILE_POST,
        payload: {
            post_id: post_id
        }
    }
}

// function to set followers count
const SetFollowersCount = (followersCount: number): ProfileActionProps => {
    return {
        type: actionTypes.SET_FOLLOWERS_COUNT,
        payload: {
            followersCount: followersCount
        }
    }
}

// function to set following count
const SetFollowingCount = (followingCount: number): ProfileActionProps => {
    return {
        type: actionTypes.SET_FOLLOWING_COUNT,
        payload: {
            followingCount: followingCount
        }
    }
}

// action to like a post in feed array
const LikeAPost = (post_id: string): ProfileActionProps => ({
    type: actionTypes.LIKE_A_POST,
    payload: { post_id }
})

// action to unlike a post in feed array
const UnLikeAPost = (post_id: string): ProfileActionProps => ({
    type: actionTypes.UNLIKE_A_POST,
    payload: { post_id }
})

// action to update likes_count in feed array
const UpdateLikesCount = (post_id: string, likes_count: number): ProfileActionProps => ({
    type: actionTypes.UPDATE_POST_LIKE_COUNT,
    payload: { post_id, likes_count }
})

// action to update comments_count in feed array
const UpdateCommentsCount = (post_id: string, comments_count: number): ProfileActionProps => ({
    type: actionTypes.UPDATE_POST_COMMENT_COUNT,
    payload: { post_id, comments_count }
})

// Assemble ProfileActionCreators
const ProfileActionCreators = {
    SetProfilePosts,
    AddProfilePost,
    DeleteProfilePost,
    SetFollowersCount,
    SetFollowingCount,
    UpdateLikesCount,
    LikeAPost,
    UnLikeAPost,
    UpdateLocalUri,
    UpdateCommentsCount,
}

// export the ProfileActionCreators
export default ProfileActionCreators;
