// Imports
import apiClient from "./client";

// OTP Endpoints
const get_user_notifications = "/notifications/get-notifications-user";

// API functions

const GetNotifications = (Token) =>
  apiClient.get(
    get_user_notifications,
    {},
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
  );

// Exports
export default {
  GetNotifications,
};
