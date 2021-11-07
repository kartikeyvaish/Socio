// Imports
import apiClient from "./client";

// OTP Endpoints
const get_comments_on_post = "/comments/get-all-comments-of-post";
const add_comments = "/comments/post-comment";
const delete_comment = "/comments/delete-comment";

// API functions
const GetComments = (post_id, Token) =>
  apiClient.get(
    get_comments_on_post,
    { post_id: post_id },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const AddComment = (DATA, Token) =>
  apiClient.post(add_comments, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

const DeleteComment = (DATA, Token) =>
  apiClient.delete(delete_comment, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
    data: DATA,
  });

// Exports
export default {
  GetComments,
  AddComment,
  DeleteComment,
};
