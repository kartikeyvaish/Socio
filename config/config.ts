import Config from "react-native-config";

const { appName, tagLine, __DEV__, DEV_BASE_URL, PROD_BASE_URL, googleApiClientID, apiVersion, default_profile_picture } = Config;


export default {
  appName: appName,
  __DEV__: __DEV__,
  default_profile_picture: default_profile_picture,
  messages: {
    ServerError: "Server Error. Please try again later",
    tokenExpMessage: "Your session has expired. Please login again.",
  },
  googleApiClientID: googleApiClientID,
  tagLine: tagLine,
  URLs: {
    BaseURL: __DEV__ === "development" ? DEV_BASE_URL : PROD_BASE_URL,
    apiVersion: apiVersion,
  },
};
