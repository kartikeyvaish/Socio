import Auth from "./Auth";
import Chats from "./Chats";
import Comments from "./Comments";
import Likes from "./Likes";
import Notifications from "./Notifications";
import OTP from "./OTP";
import Posts from "./Posts";
import Profile from "./Profile";
import Requests from "./People";

export default {
  ...Auth,
  ...Chats,
  ...OTP,
  ...Profile,
  ...Posts,
  ...Likes,
  ...Comments,
  ...Requests,
  ...Notifications,
};
