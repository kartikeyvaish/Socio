// Imports
import apiClient from "./client";

// Posts Endpoints
const create_post = "/posts/create-a-post";
const get_post_detail = "/posts/get-post-detail";
const get_user_feed = "/posts/get-feed-for-user";
const delete_post = "/posts/delete-post";

// API functions
const CreateNewPost = (DATA, Token) =>
  apiClient.post(create_post, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    timeout: 30000,
  });

const GetPostDetails = (_id, Token) =>
  apiClient.get(
    get_post_detail,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      params: {
        _id: _id,
      },
    }
  );

const GetUserFeed = (Token, last_post_id = null) =>
  apiClient.get(
    get_user_feed,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
      params: {
        last_post_id: last_post_id,
      },
    }
  );

const DeletePost = (DATA, Token) =>
  apiClient.delete(
    delete_post,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: DATA,
    }
  );

// Exports
export default {
  CreateNewPost,
  GetPostDetails,
  GetUserFeed,
  DeletePost,
};
