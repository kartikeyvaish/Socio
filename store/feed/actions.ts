// Types and Actions Imports
import { PostProps } from "../../types/PostTypes";
import * as actionTypes from "./actionTypes";
import { FeedActionProps } from "./types";

// Feed Action Creators 

// Action to set the feed
const SetFeed = (posts: Array<PostProps>): FeedActionProps => ({
    type: actionTypes.SET_FEED_POSTS,
    payload: { posts },
});

// Action to update the local uri of a post
const UpdateLocalUri = (_id: string, local_uri: string): FeedActionProps => ({
    type: actionTypes.UPDATE_LOCAL_URI,
    payload: { _id, local_uri },
});

// action to update the feed and add posts to the starting of array
const AddPosts = (posts: Array<PostProps>): FeedActionProps => ({
    type: actionTypes.ADD_FEED_POSTS,
    payload: { posts },
});

// action to delete a post from Feed
const DeletePost = (_id: string): FeedActionProps => ({
    type: actionTypes.DELETE_POST_FROM_FEED,
    payload: { _id }
})

// action to like a post in feed array
const LikeAPost = (_id: string): FeedActionProps => ({
    type: actionTypes.LIKE_A_POST_FROM_FEED,
    payload: { _id }
})

// action to unlike a post in feed array
const UnLikeAPost = (_id: string): FeedActionProps => ({
    type: actionTypes.UNLIKE_A_POST_FROM_FEED,
    payload: { _id }
})

// action to update likes_count in feed array
const UpdateLikesCount = (_id: string, likes_count: number): FeedActionProps => ({
    type: actionTypes.UPDATE_LIKES_COUNT,
    payload: { _id, likes_count }
})

// action to update comments_count in feed array
const UpdateCommentsCount = (_id: string, comments_count: number): FeedActionProps => ({
    type: actionTypes.UPDATE_COMMENTS_COUNT,
    payload: { _id, comments_count }
})


// Assemble Feed Action Actions
const FeedActions = {
    SetFeed,
    AddPosts,
    DeletePost,
    LikeAPost,
    UnLikeAPost,
    UpdateLikesCount,
    UpdateLocalUri,
    UpdateCommentsCount
};

// Exports
export default FeedActions;