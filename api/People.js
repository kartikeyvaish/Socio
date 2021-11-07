// Imports
import apiClient from "./client";

// OTP Endpoints
const send_follow_request = "/people/send-follow-request";
const delete_request = "/people/reject-follow-request";
const accept_follow_request = "/people/accept-follow-request";
const unfollow_a_user = "/people/unfollow-a-user";
const remove_from_followers = "/people/remove-from-followers";
const get_all_requests = "/people/get-all-requests-user";
const get_followers_list = "/people/get-followers-list";
const get_following_list = "/people/get-following-list";

// API functions
const SendFollowRequest = (DATA, Token) =>
  apiClient.post(send_follow_request, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

const AcceptFollowRequest = (DATA, Token) =>
  apiClient.post(accept_follow_request, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

const DeleteFollowRequest = (DATA, Token) =>
  apiClient.delete(
    delete_request,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: DATA,
    }
  );

const UnFollow = (DATA, Token) =>
  apiClient.delete(
    unfollow_a_user,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: DATA,
    }
  );

const RemoveFromFollowers = (DATA, Token) =>
  apiClient.delete(
    remove_from_followers,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      data: DATA,
    }
  );

const GetAllRequests = (Token) =>
  apiClient.get(
    get_all_requests,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const GetFollowersList = (user_id, Token) =>
  apiClient.get(
    get_followers_list,
    { user_id: user_id },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const GetFollowingList = (user_id, Token) =>
  apiClient.get(
    get_following_list,
    { user_id: user_id },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

// Exports
export default {
  SendFollowRequest,
  DeleteFollowRequest,
  AcceptFollowRequest,
  UnFollow,
  RemoveFromFollowers,
  GetAllRequests,
  GetFollowersList,
  GetFollowingList,
};
