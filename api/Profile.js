// Imports
import apiClient from "./client";

// OTP Endpoints
const edit_profile = "/profile/edit-profile";
const get_profile = "/profile/get-profile";
const toggle_profile_privacy = "/profile/toggle-profile-private";

// API functions
const ToggleProfilePrivacy = (Token) =>
  apiClient.patch(
    toggle_profile_privacy,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

const GetProfile = (user_id, Token) =>
  apiClient.get(
    get_profile,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      params: {
        user_id: user_id,
      },
    }
  );

const EditProfile = (DATA, Token) =>
  apiClient.patch(edit_profile, DATA, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

// Exports
export default {
  ToggleProfilePrivacy,
  GetProfile,
  EditProfile,
};
