// Imports
import apiClient from "./client";

// Posts Endpoints
const like_post = "/likes/like-a-post";
const unlike_post = "/likes/unlike-a-post";
const get_all_likes_on_post = "/likes/get-all-likes-on-post";

// API functions

const LikePost = (DATA, Token) =>
  apiClient.put(like_post, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

const UnLikePost = (DATA, Token) =>
  apiClient.delete(
    unlike_post,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: DATA,
    }
  );

const GetAllLikesOnPost = (post_id, Token) =>
  apiClient.get(
    get_all_likes_on_post,
    { post_id: post_id },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

// Exports
export default {
  LikePost,
  UnLikePost,
  GetAllLikesOnPost,
};
